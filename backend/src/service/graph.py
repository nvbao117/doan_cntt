from typing import TypedDict,Annotated, Sequence
from langchain_core.messages import BaseMessage, HumanMessage
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode
from backend.src.core.llm import llm 
from backend.src.service.tools import tools

class AgentState(TypedDict):
    messages: Sequence[BaseMessage] 
    
llm_with_tools = llm.bind_tools(tools)

def call_model(state: AgentState) :
    message = state['messages']
    response = llm_with_tools.invoke(message)
    return {"messages":[response]}

tool_node = ToolNode(tools) 

def should_continue(state: AgentState):
    last_message = state['messages'][-1]
    if last_message.tool_calls:
        return "tools"
    
    return END

workflow = StateGraph(AgentState)
workflow.add_node("agent",call_model)
workflow.add_node("tools",tool_node) 

workflow.set_entry_point("agent")

workflow.add_conditional_edges(
    "agent",
    should_continue,
    {
        "tools":"tools",
        END:END
    },
)
workflow.add_edge("tools","agent")
app_graph = workflow.compile()
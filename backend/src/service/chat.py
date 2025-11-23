from src.service.graph import app_graph
from langchain_core.messages import HumanMessage

async def process_chat(user_input:str, thread_id:str="1"):
    config = {"configurable":{"thread_id":thread_id}}
    inputs = {"messages":[HumanMessage(content=user_input)]}
    
    result = await app_graph.ainvoke(input=inputs,config=config)
    last_message = result["messages"][-1]
    return last_message.content
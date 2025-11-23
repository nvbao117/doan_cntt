import { useState, useEffect, useRef } from 'react';
import { useChat } from '../contexts/ChatContext';
import ChatSidebar from '../components/chat/ChatSidebar';
import ChatHeader from '../components/chat/ChatHeader';
import MessageBubble from '../components/chat/MessageBubble';
import ChatInput from '../components/chat/ChatInput';
import TypingIndicator from '../components/chat/TypingIndicator';
import { MessageSquare } from 'lucide-react';
const Chatbot = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const messagesEndRef = useRef(null);
    const { getCurrentChat, sendMessage, isLoading, createNewChat } = useChat();

    const currentChat = getCurrentChat();

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [currentChat?.messages, isLoading]);

    const handleSendMessage = (content) => {
        sendMessage(content);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div className="flex h-[calc(100vh-2rem)] gap-4">
            {/* Chat Sidebar */}
            <ChatSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col overflow-hidden glass-premium rounded-2xl border border-white/20 dark:border-gray-700/30 shadow-2xl relative">
                {/* Chat Header */}
                <ChatHeader onMenuClick={toggleSidebar} isSidebarOpen={isSidebarOpen} />

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto px-4 py-6 custom-scrollbar scroll-smooth">
                    {!currentChat || currentChat.messages.length === 0 ? (
                        // Empty State
                        <div className="flex flex-col items-center justify-center h-full text-center px-4 animate-slide-up">
                            <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-ocean-500 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-primary-500/30 mb-8 animate-float">
                                <MessageSquare className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                                Hello, Learner! 👋
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 max-w-md mb-10 text-lg leading-relaxed">
                                I'm your AI language companion. Ready to practice conversation or learn something new?
                            </p>

                            {/* Suggested Prompts */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full">
                                {[
                                    { icon: '🗣️', text: 'Practice English conversation' },
                                    { icon: '📝', text: 'Correct my grammar' },
                                    { icon: '💡', text: 'Explain a complex idiom' },
                                    { icon: '🎯', text: 'Give me a vocabulary quiz' },
                                ].map((prompt, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSendMessage(prompt.text)}
                                        className="group p-4 bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 rounded-2xl text-left transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/10 active:scale-[0.98]"
                                    >
                                        <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform duration-300">{prompt.icon}</span>
                                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                            {prompt.text}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        // Messages
                        <div className="max-w-4xl mx-auto w-full space-y-6 pb-4">
                            {currentChat.messages.map((message) => (
                                <MessageBubble key={message.id} message={message} />
                            ))}

                            {/* Typing Indicator */}
                            {isLoading && (
                                <div className="flex gap-3 animate-slide-up">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-ocean-500 flex items-center justify-center shadow-md">
                                        <span className="text-white text-xs font-bold">AI</span>
                                    </div>
                                    <TypingIndicator />
                                </div>
                            )}

                            {/* Scroll Anchor */}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                {/* Chat Input */}
                <ChatInput onSend={handleSendMessage} disabled={isLoading} />
            </div>
        </div>
    );
};

export default Chatbot;

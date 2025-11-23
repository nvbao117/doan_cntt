import { PlusCircle, MessageSquare, Trash2, X } from 'lucide-react';
import { useChat } from '../../contexts/ChatContext';

const ChatSidebar = ({ isOpen, onClose }) => {
    const { chats, activeChat, setActiveChat, createNewChat, deleteChat } = useChat();

    const handleNewChat = () => {
        createNewChat();
        if (window.innerWidth < 1024) {
            onClose();
        }
    };

    const handleSelectChat = (chatId) => {
        setActiveChat(chatId);
        if (window.innerWidth < 1024) {
            onClose();
        }
    };

    const handleDeleteChat = (e, chatId) => {
        e.stopPropagation();
        if (confirm('Are you sure you want to delete this chat?')) {
            deleteChat(chatId);
        }
    };

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Chat Sidebar */}
            <aside
                className={`
          fixed lg:static top-0 left-0 z-50
          h-full w-72
          bg-white dark:bg-gray-900 
          border-r border-gray-200 dark:border-gray-800
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
            >
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Chat History
                            </h3>
                            <button
                                onClick={onClose}
                                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </button>
                        </div>

                        {/* New Chat Button */}
                        <button
                            onClick={handleNewChat}
                            className="w-full btn-primary flex items-center justify-center gap-2"
                        >
                            <PlusCircle className="w-5 h-5" />
                            New Chat
                        </button>
                    </div>

                    {/* Chat List */}
                    <div className="flex-1 overflow-y-auto py-2 px-3 custom-scrollbar">
                        {chats.length === 0 ? (
                            <div className="text-center py-8 px-4">
                                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    No chats yet. Start a new conversation!
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {chats.map((chat) => (
                                    <div
                                        key={chat.id}
                                        onClick={() => handleSelectChat(chat.id)}
                                        className={`
                      group relative p-3 rounded-lg cursor-pointer transition-all duration-200
                      ${activeChat === chat.id
                                                ? 'bg-primary-100 dark:bg-primary-900/30 border-2 border-primary-500'
                                                : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-transparent'
                                            }
                    `}
                                    >
                                        <div className="flex items-start gap-2">
                                            <MessageSquare className={`w-4 h-4 mt-0.5 flex-shrink-0 ${activeChat === chat.id
                                                    ? 'text-primary-600 dark:text-primary-400'
                                                    : 'text-gray-500 dark:text-gray-400'
                                                }`} />
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-sm font-medium truncate ${activeChat === chat.id
                                                        ? 'text-primary-700 dark:text-primary-300'
                                                        : 'text-gray-900 dark:text-gray-100'
                                                    }`}>
                                                    {chat.title}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                                                    {chat.messages.length} messages
                                                </p>
                                            </div>

                                            {/* Delete Button */}
                                            <button
                                                onClick={(e) => handleDeleteChat(e, chat.id)}
                                                className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/30 transition-opacity"
                                                title="Delete chat"
                                            >
                                                <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
};

export default ChatSidebar;

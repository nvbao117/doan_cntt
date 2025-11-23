import { createContext, useContext, useState, useEffect } from 'react';
import { chatAPI } from '../utils/api';

const ChatContext = createContext();

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};

export const ChatProvider = ({ children }) => {
    const [chats, setChats] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Load chats from localStorage first for immediate UI
        const savedChats = localStorage.getItem('chats');
        if (savedChats) {
            const parsedChats = JSON.parse(savedChats);
            setChats(parsedChats);
            if (parsedChats.length > 0) {
                setActiveChat(parsedChats[0].id);
            }
        }

        // Then try to fetch from API
        fetchChatHistory();
    }, []);

    useEffect(() => {
        // Save chats to localStorage whenever they change
        if (chats.length > 0) {
            localStorage.setItem('chats', JSON.stringify(chats));
        }
    }, [chats]);

    const fetchChatHistory = async () => {
        try {
            const response = await chatAPI.getChatHistory();
            if (response.data && response.data.length > 0) {
                setChats(response.data);
                // Only set active chat if not already set
                setActiveChat(prev => prev || response.data[0].id);
            }
        } catch (error) {
            console.error('Failed to fetch chat history:', error);
            // Keep using localStorage data if API fails
        }
    };

    const createNewChat = () => {
        const newChat = {
            id: Date.now(),
            title: 'New Chat',
            messages: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        setChats((prev) => [newChat, ...prev]);
        setActiveChat(newChat.id);
        return newChat;
    };

    const deleteChat = async (chatId) => {
        // Optimistic update
        setChats((prev) => prev.filter((chat) => chat.id !== chatId));
        if (activeChat === chatId) {
            const remainingChats = chats.filter((chat) => chat.id !== chatId);
            setActiveChat(remainingChats.length > 0 ? remainingChats[0].id : null);
        }

        try {
            await chatAPI.deleteChat(chatId);
        } catch (error) {
            console.error('Failed to delete chat:', error);
            // Ideally revert state here if critical
        }
    };

    const sendMessage = async (content) => {
        if (!activeChat) {
            const newChat = createNewChat();
            return sendMessageToChat(newChat.id, content);
        }
        return sendMessageToChat(activeChat, content);
    };

    const sendMessageToChat = async (chatId, content) => {
        // Add user message immediately (Optimistic UI)
        const userMessage = {
            id: Date.now(),
            role: 'user',
            content: content,
            timestamp: new Date().toISOString(),
        };

        setChats((prev) =>
            prev.map((chat) =>
                chat.id === chatId
                    ? {
                        ...chat,
                        messages: [...chat.messages, userMessage],
                        updatedAt: new Date().toISOString(),
                        title: chat.messages.length === 0
                            ? content.slice(0, 30) + (content.length > 30 ? '...' : '')
                            : chat.title,
                    }
                    : chat
            )
        );

        setIsLoading(true);

        try {
            // Call API
            const response = await chatAPI.sendLangChainMessage(content, String(chatId));
            const botMessage = {
                id: Date.now() + 1,
                role: 'bot',
                content: response.data.reply, // Lấy text từ field 'reply'
                timestamp: new Date().toISOString(),
            };
            setChats((prev) =>
                prev.map((chat) =>
                    chat.id === chatId
                        ? {
                            ...chat,
                            messages: [...chat.messages, botMessage],
                            updatedAt: new Date().toISOString(),
                        }
                        : chat
                )
            );
        } catch (error) {
            console.error('Failed to send message:', error);

            // Fallback for demo/development
            if (process.env.NODE_ENV === 'development') {
                setTimeout(() => {
                    const botMessage = {
                        id: Date.now() + 1,
                        role: 'bot',
                        content: `[DEMO MODE] Backend not connected. You said: "${content}"`,
                        timestamp: new Date().toISOString(),
                    };

                    setChats((prev) =>
                        prev.map((chat) =>
                            chat.id === chatId
                                ? {
                                    ...chat,
                                    messages: [...chat.messages, botMessage],
                                    updatedAt: new Date().toISOString(),
                                }
                                : chat
                        )
                    );
                }, 1000);
            } else {
                // Show error message in chat
                const errorMessage = {
                    id: Date.now() + 1,
                    role: 'bot',
                    content: "Sorry, I'm having trouble connecting to the server. Please try again later.",
                    timestamp: new Date().toISOString(),
                    isError: true
                };

                setChats((prev) =>
                    prev.map((chat) =>
                        chat.id === chatId
                            ? {
                                ...chat,
                                messages: [...chat.messages, errorMessage],
                                updatedAt: new Date().toISOString(),
                            }
                            : chat
                    )
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    const getCurrentChat = () => {
        return chats.find((chat) => chat.id === activeChat);
    };

    const updateChatTitle = (chatId, newTitle) => {
        setChats((prev) =>
            prev.map((chat) =>
                chat.id === chatId ? { ...chat, title: newTitle } : chat
            )
        );
    };

    const value = {
        chats,
        activeChat,
        isLoading,
        setActiveChat,
        createNewChat,
        deleteChat,
        sendMessage,
        getCurrentChat,
        updateChatTitle,
    };

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

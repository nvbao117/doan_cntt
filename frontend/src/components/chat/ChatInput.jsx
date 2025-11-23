import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';

const ChatInput = ({ onSend, disabled = false }) => {
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);

    // Auto-resize textarea
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px';
        }
    }, [message]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() && !disabled) {
            onSend(message.trim());
            setMessage('');
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    const handleKeyDown = (e) => {
        // Send on Enter, new line on Shift+Enter
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="p-4 bg-gradient-to-t from-white via-white to-transparent dark:from-gray-900 dark:via-gray-900 dark:to-transparent pt-10">
            <div className="max-w-4xl mx-auto relative">
                <form onSubmit={handleSubmit} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-ocean-500/20 rounded-[2rem] blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative flex items-end gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-[2rem] p-2 shadow-lg shadow-gray-200/50 dark:shadow-black/20 transition-all duration-300 focus-within:shadow-primary-500/20 focus-within:border-primary-500/50">
                        <div className="pl-4 py-3 text-gray-400">
                            <Sparkles className="w-5 h-5" />
                        </div>

                        <textarea
                            ref={textareaRef}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask anything..."
                            disabled={disabled}
                            className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-[150px] py-3 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 leading-relaxed custom-scrollbar"
                            rows="1"
                        />

                        <button
                            type="submit"
                            disabled={!message.trim() || disabled}
                            className="p-3 bg-gradient-to-r from-primary-500 to-ocean-500 text-white rounded-full shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transition-all duration-200 m-1"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </form>

                <div className="mt-2 text-center">
                    <p className="text-[10px] text-gray-400 dark:text-gray-500">
                        AI can make mistakes. Please verify important information.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ChatInput;

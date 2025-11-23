import { Copy, Check, User, Bot } from 'lucide-react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const MessageBubble = ({ message }) => {
    const [copied, setCopied] = useState(false);
    const isUser = message.role === 'user';

    const handleCopy = () => {
        navigator.clipboard.writeText(message.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    if (isUser) {
        return (
            <div className="flex flex-col items-end mb-6 animate-slide-up">
                <div className="flex items-end gap-3 max-w-[80%]">
                    <div className="order-1">
                        <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 px-5 py-3.5 rounded-2xl rounded-tr-sm shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className="text-sm leading-relaxed whitespace-pre-wrap">
                                {message.content}
                            </div>
                        </div>
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 block text-right mr-1">
                            {formatTime(message.timestamp)}
                        </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0 order-2">
                        <User className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-start mb-6 animate-slide-up">
            <div className="flex items-end gap-3 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-ocean-500 flex items-center justify-center flex-shrink-0 shadow-md">
                    <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                    <div className="bg-gradient-to-br from-primary-50 to-ocean-50 dark:from-gray-800 dark:to-gray-800/80 text-gray-800 dark:text-gray-100 px-5 py-4 rounded-2xl rounded-tl-sm shadow-sm border border-primary-100 dark:border-gray-700 relative group">
                        <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-gray-800/50 dark:prose-pre:bg-gray-900/50 prose-pre:rounded-xl prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700">
                            <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>

                        {/* Copy Button */}
                        <button
                            onClick={handleCopy}
                            className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/50 dark:bg-gray-700/50 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white dark:hover:bg-gray-600 text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400"
                            title="Copy message"
                        >
                            {copied ? (
                                <Check className="w-3.5 h-3.5 text-green-500" />
                            ) : (
                                <Copy className="w-3.5 h-3.5" />
                            )}
                        </button>
                    </div>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 block ml-1">
                        {formatTime(message.timestamp)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;

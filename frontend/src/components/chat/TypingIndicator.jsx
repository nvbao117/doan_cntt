import React from 'react';

const TypingIndicator = () => {
    return (
        <div className="flex items-center gap-2 p-4 mr-auto max-w-[70%]">
            <div className="w-10 h-10 flex-shrink-0 bg-gradient-to-br from-primary-500 to-ocean-500 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-semibold text-sm">AI</span>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-sm px-6 py-3 shadow-md">
                <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full typing-dot"></div>
                    <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full typing-dot"></div>
                    <div className="w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full typing-dot"></div>
                </div>
            </div>
        </div>
    );
};

export default TypingIndicator;

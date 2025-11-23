import { Menu } from 'lucide-react';

const ChatHeader = ({ onMenuClick, isSidebarOpen }) => {
    return (
        <div className="glass-card border-b border-gray-200 dark:border-gray-700 px-4 py-3">
            <div className="flex items-center gap-3">
                {/* Mobile Menu Toggle */}
                <button
                    onClick={onMenuClick}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors lg:hidden"
                    aria-label="Toggle chat sidebar"
                >
                    <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </button>

                {/* Bot Avatar */}
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-ocean-500 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-white font-semibold text-sm">AI</span>
                </div>

                {/* Bot Info */}
                <div className="flex-1">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        LearnLang AI Assistant
                    </h2>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">Online</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatHeader;

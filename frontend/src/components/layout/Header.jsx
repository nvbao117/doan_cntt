import { Menu, X, Sun, Moon, User, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

const Header = ({ onMenuClick, isSidebarOpen }) => {
    const { theme, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const [showUserMenu, setShowUserMenu] = useState(false);

    return (
        <header className="sticky top-4 z-40 w-full px-4 md:px-6 mb-8">
            <div className="glass-premium rounded-2xl border border-white/20 dark:border-gray-700/30 shadow-lg shadow-gray-200/50 dark:shadow-black/20">
                <div className="flex items-center justify-between h-16 px-4">
                    {/* Left Section: Menu Toggle + Logo */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onMenuClick}
                            className="p-2 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors lg:hidden"
                            aria-label="Toggle menu"
                        >
                            {isSidebarOpen ? (
                                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                            ) : (
                                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                            )}
                        </button>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-ocean-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20 animate-pulse-glow">
                                <span className="text-white font-bold text-xl">L</span>
                            </div>
                            <div className="hidden sm:block">
                                <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-ocean-600 bg-clip-text text-transparent">
                                    LearnLang AI
                                </h1>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Your Language Companion</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Section: Theme Toggle + User Menu */}
                    <div className="flex items-center gap-3">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl bg-gray-100/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-700 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 active:scale-95 shadow-sm"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? (
                                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                            ) : (
                                <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                            )}
                        </button>

                        {/* User Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                className="flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-gray-100/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-700 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300 shadow-sm"
                            >
                                {user?.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt={user.name}
                                        className="w-9 h-9 rounded-lg object-cover ring-2 ring-white dark:ring-gray-800"
                                    />
                                ) : (
                                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-ocean-500 flex items-center justify-center ring-2 ring-white dark:ring-gray-800">
                                        <User className="w-5 h-5 text-white" />
                                    </div>
                                )}
                                <span className="hidden md:block text-sm font-semibold text-gray-700 dark:text-gray-200">
                                    {user?.name || 'User'}
                                </span>
                            </button>

                            {/* Dropdown Menu */}
                            {showUserMenu && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setShowUserMenu(false)}
                                    />
                                    <div className="absolute right-0 mt-3 w-64 glass-premium rounded-2xl shadow-2xl z-50 py-2 animate-slide-up overflow-hidden ring-1 ring-black/5">
                                        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/50 bg-gray-50/50 dark:bg-gray-800/50">
                                            <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                                                {user?.name || 'User'}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">
                                                {user?.email || 'user@example.com'}
                                            </p>
                                        </div>

                                        <div className="p-2">
                                            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400 rounded-xl transition-all duration-200">
                                                <Settings className="w-4 h-4" />
                                                Settings
                                            </button>

                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setShowUserMenu(false);
                                                }}
                                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

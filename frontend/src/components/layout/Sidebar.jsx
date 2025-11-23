import {
    Home,
    MessageSquare,
    FileText,
    CheckCircle,
    Mic,
    BookOpen,
    Headphones,
    X
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
    const menuItems = [
        { icon: Home, label: 'Home', path: '/home' },
        { icon: MessageSquare, label: 'Chatbot', path: '/chatbot' },
        { icon: FileText, label: 'Quiz Generator', path: '/quiz-generator' },
        { icon: CheckCircle, label: 'Grammar Checker', path: '/grammar-checker' },
        { icon: Mic, label: 'Pronunciation', path: '/pronunciation' },
        { icon: BookOpen, label: 'Reading', path: '/reading' },
        { icon: Headphones, label: 'Listening', path: '/listening' },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed lg:sticky top-4 left-4 z-50
          h-[calc(100vh-2rem)] w-64
          glass-premium rounded-2xl
          transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1)
          ${isOpen ? 'translate-x-0' : '-translate-x-[110%] lg:translate-x-0'}
        `}
            >
                <div className="flex flex-col h-full relative overflow-hidden">
                    {/* Decorative Glow */}
                    <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary-500/10 to-transparent pointer-events-none" />

                    {/* Sidebar Header - Mobile Only */}
                    <div className="lg:hidden flex items-center justify-between p-4 border-b border-white/10 dark:border-gray-700/30">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-ocean-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                                <span className="text-white font-bold text-xl">L</span>
                            </div>
                            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                LearnLang AI
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-white/20 dark:hover:bg-gray-800/50 transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                        </button>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar relative z-10">
                        <div className="space-y-2">
                            {menuItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => window.innerWidth < 1024 && onClose()}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${isActive
                                            ? 'bg-gradient-to-r from-primary-500/10 to-ocean-500/10 text-primary-600 dark:text-primary-400 font-semibold shadow-sm'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800/50 hover:text-primary-600 dark:hover:text-primary-400'
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            {isActive && (
                                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-primary-500 to-ocean-500 rounded-r-full" />
                                            )}
                                            <item.icon className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                                            <span className="relative z-10">{item.label}</span>
                                        </>
                                    )}
                                </NavLink>
                            ))}
                        </div>
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-4 mt-auto relative z-10">
                        <div className="glass-panel p-4 rounded-xl border border-white/20 dark:border-gray-700/30 bg-gradient-to-br from-primary-500/5 to-ocean-500/5">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-1 flex items-center gap-2">
                                <span className="animate-pulse">🚀</span> Upgrade to Pro
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">
                                Unlock unlimited AI features & advanced tools
                            </p>
                            <button className="w-full py-2.5 rounded-lg bg-gradient-to-r from-primary-600 to-ocean-600 text-white text-sm font-medium shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
                                Upgrade Now
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;

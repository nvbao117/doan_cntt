import { TrendingUp, Target, Calendar, BookOpen, Award, Zap, ArrowRight, CheckCircle2, Flame, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Home = () => {
    const { user } = useAuth();

    const stats = [
        { label: 'Learning Streak', value: '7', unit: 'days', icon: Flame, color: 'from-orange-500 to-red-500', bg: 'bg-orange-500/10 text-orange-500' },
        { label: 'Words Learned', value: '234', unit: 'words', icon: BookOpen, color: 'from-blue-500 to-cyan-500', bg: 'bg-blue-500/10 text-blue-500' },
        { label: 'Lessons Done', value: '18', unit: 'lessons', icon: Target, color: 'from-green-500 to-emerald-500', bg: 'bg-green-500/10 text-green-500' },
        { label: 'Total Points', value: '1.4k', unit: 'pts', icon: Award, color: 'from-purple-500 to-pink-500', bg: 'bg-purple-500/10 text-purple-500' },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8 pb-8">
            {/* Welcome Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-600 to-ocean-600 p-8 md:p-12 shadow-2xl animate-slide-up">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                        Welcome back, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80">
                            {user?.name || 'Learner'}! 👋
                        </span>
                    </h1>
                    <p className="text-primary-100 text-lg md:text-xl max-w-2xl mb-8">
                        You're on a roll! Continue your daily lessons to keep your 7-day streak alive.
                    </p>
                    <Link
                        to="/chatbot"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-600 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                        Continue Learning <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Stats Cards - Row 1 */}
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="glass-premium p-6 rounded-2xl hover:translate-y-[-4px] transition-all duration-300 group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg} group-hover:scale-110 transition-transform duration-300`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500">
                                +12%
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                            {stat.value}
                        </h3>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {stat.label}
                        </p>
                    </div>
                ))}

                {/* Main Activity Chart - Spans 2 cols, 2 rows */}
                <div className="md:col-span-2 lg:col-span-2 row-span-2 glass-premium p-6 rounded-2xl flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-primary-500" />
                            Activity Progress
                        </h3>
                        <select className="bg-gray-50 dark:bg-gray-800 border-none rounded-lg text-sm font-medium px-3 py-1 outline-none">
                            <option>This Week</option>
                            <option>Last Week</option>
                        </select>
                    </div>
                    <div className="flex-1 flex items-end justify-between gap-2 px-2">
                        {[40, 70, 45, 90, 65, 85, 55].map((h, i) => (
                            <div key={i} className="w-full flex flex-col items-center gap-2 group">
                                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-t-xl h-48 relative overflow-hidden">
                                    <div
                                        className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-primary-600 to-ocean-400 rounded-t-xl transition-all duration-500 group-hover:opacity-90"
                                        style={{ height: `${h}%` }}
                                    />
                                </div>
                                <span className="text-xs font-medium text-gray-400">
                                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Daily Goals - Spans 1 col, 2 rows */}
                <div className="md:col-span-1 lg:col-span-2 glass-premium p-6 rounded-2xl">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <Target className="w-5 h-5 text-red-500" />
                        Daily Goals
                    </h3>
                    <div className="space-y-4">
                        {[
                            { title: 'Complete 2 lessons', progress: 100, done: true },
                            { title: 'Practice pronunciation', progress: 60, done: false },
                            { title: 'Learn 10 new words', progress: 30, done: false },
                            { title: 'Read 1 article', progress: 0, done: false },
                        ].map((goal, i) => (
                            <div key={i} className="group">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${goal.done
                                                ? 'bg-green-500 border-green-500'
                                                : 'border-gray-300 dark:border-gray-600'
                                            }`}>
                                            {goal.done && <CheckCircle2 className="w-3 h-3 text-white" />}
                                        </div>
                                        <span className={`font-medium ${goal.done ? 'text-gray-400 line-through' : 'text-gray-700 dark:text-gray-200'}`}>
                                            {goal.title}
                                        </span>
                                    </div>
                                    <span className="text-xs font-bold text-gray-400">{goal.progress}%</span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-500 ${goal.done ? 'bg-green-500' : 'bg-primary-500'
                                            }`}
                                        style={{ width: `${goal.progress}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions Row */}
                <div className="md:col-span-3 lg:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Link to="/quiz-generator" className="group glass-premium p-6 rounded-2xl hover:bg-gradient-to-br hover:from-purple-500/5 hover:to-pink-500/5 transition-all duration-300 border-l-4 border-l-purple-500">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500 group-hover:scale-110 transition-transform">
                                <Zap className="w-6 h-6" />
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Quick Quiz</h3>
                        <p className="text-sm text-gray-500">Challenge yourself with a 5-min quiz</p>
                    </Link>

                    <Link to="/pronunciation" className="group glass-premium p-6 rounded-2xl hover:bg-gradient-to-br hover:from-blue-500/5 hover:to-cyan-500/5 transition-all duration-300 border-l-4 border-l-blue-500">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform">
                                <Star className="w-6 h-6" />
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Pronunciation</h3>
                        <p className="text-sm text-gray-500">Perfect your accent with AI feedback</p>
                    </Link>

                    <Link to="/reading" className="group glass-premium p-6 rounded-2xl hover:bg-gradient-to-br hover:from-green-500/5 hover:to-emerald-500/5 transition-all duration-300 border-l-4 border-l-green-500">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 rounded-xl bg-green-500/10 text-green-500 group-hover:scale-110 transition-transform">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Reading</h3>
                        <p className="text-sm text-gray-500">Explore new stories and articles</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;

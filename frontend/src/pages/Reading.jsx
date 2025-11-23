import { BookOpen } from 'lucide-react';

const Reading = () => {
    const passages = [
        { title: 'The Ocean Adventure', level: 'Beginner', words: 150 },
        { title: 'Climate Change', level: 'Intermediate', words: 350 },
        { title: 'Technology Revolution', level: 'Advanced', words: 500 },
    ];

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-8 animate-slide-up">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    Reading Practice 📖
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Improve your reading comprehension with curated passages
                </p>
            </div>

            <div className="grid gap-6">
                {passages.map((passage, index) => (
                    <div
                        key={index}
                        className="glass-card p-6 hover:border-primary-500 border-2 border-transparent transition-all duration-200 cursor-pointer animate-slide-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-ocean-500 rounded-xl flex items-center justify-center">
                                    <BookOpen className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        {passage.title}
                                    </h3>
                                    <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                                        <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full font-medium">
                                            {passage.level}
                                        </span>
                                        <span>{passage.words} words</span>
                                    </div>
                                </div>
                            </div>
                            <button className="btn-primary">
                                Start Reading
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reading;

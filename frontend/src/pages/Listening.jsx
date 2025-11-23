import { Headphones, Play, Pause } from 'lucide-react';
import { useState } from 'react';

const Listening = () => {
    const [playing, setPlaying] = useState(null);

    const exercises = [
        { title: 'Morning Conversation', level: 'Beginner', duration: '2:30' },
        { title: 'News Report', level: 'Intermediate', duration: '4:15' },
        { title: 'Podcast Discussion', level: 'Advanced', duration: '6:45' },
    ];

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-8 animate-slide-up">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    Listening Practice 🎧
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Enhance your listening skills with audio exercises
                </p>
            </div>

            <div className="grid gap-6">
                {exercises.map((exercise, index) => (
                    <div
                        key={index}
                        className="glass-card p-6 animate-slide-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex gap-4 items-center flex-1">
                                <button
                                    onClick={() => setPlaying(playing === index ? null : index)}
                                    className="w-14 h-14 bg-gradient-to-br from-primary-500 to-ocean-500 rounded-full flex items-center justify-center hover:shadow-lg transition-shadow"
                                >
                                    {playing === index ? (
                                        <Pause className="w-7 h-7 text-white" />
                                    ) : (
                                        <Play className="w-7 h-7 text-white ml-1" />
                                    )}
                                </button>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        {exercise.title}
                                    </h3>
                                    <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                                        <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full font-medium">
                                            {exercise.level}
                                        </span>
                                        <span>{exercise.duration}</span>
                                    </div>
                                </div>
                            </div>
                            <Headphones className="w-6 h-6 text-gray-400" />
                        </div>

                        {playing === index && (
                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div className="bg-primary-600 h-2 rounded-full animate-pulse" style={{ width: '45%' }}></div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Listening;

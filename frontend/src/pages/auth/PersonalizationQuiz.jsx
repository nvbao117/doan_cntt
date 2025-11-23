import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const PersonalizationQuiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const { completePersonalization } = useAuth();
    const navigate = useNavigate();

    const questions = [
        {
            id: 1,
            question: 'What is your current language learning level?',
            options: ['Beginner', 'Intermediate', 'Advanced', 'Native'],
            type: 'single',
        },
        {
            id: 2,
            question: 'Which language are you primarily learning?',
            options: ['English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Other'],
            type: 'single',
        },
        {
            id: 3,
            question: 'What is your main goal for learning this language?',
            options: [
                'Travel and tourism',
                'Career advancement',
                'Academic purposes',
                'Personal interest',
                'Connect with family/friends',
            ],
            type: 'single',
        },
        {
            id: 4,
            question: 'How much time can you dedicate to learning daily?',
            options: ['10-15 minutes', '15-30 minutes', '30-60 minutes', 'More than 1 hour'],
            type: 'single',
        },
        {
            id: 5,
            question: 'Which skills do you want to focus on? (Select all that apply)',
            options: ['Speaking', 'Listening', 'Reading', 'Writing', 'Grammar', 'Vocabulary'],
            type: 'multiple',
        },
        {
            id: 6,
            question: 'What is your preferred learning style?',
            options: [
                'Visual (images, videos)',
                'Auditory (listening, speaking)',
                'Reading/Writing',
                'Kinesthetic (interactive activities)',
            ],
            type: 'single',
        },
        {
            id: 7,
            question: 'Do you have any previous language learning experience?',
            options: ['Yes, multiple languages', 'Yes, one language', 'No, this is my first time'],
            type: 'single',
        },
        {
            id: 8,
            question: 'What motivates you to continue learning?',
            options: [
                'Gamification and rewards',
                'Progress tracking',
                'Social interaction',
                'Personal achievement',
            ],
            type: 'single',
        },
        {
            id: 9,
            question: 'When do you prefer to study?',
            options: ['Morning', 'Afternoon', 'Evening', 'Night', 'Flexible/Any time'],
            type: 'single',
        },
        {
            id: 10,
            question: 'What additional features would you find most helpful?',
            options: [
                'AI chatbot practice',
                'Grammar correction',
                'Pronunciation feedback',
                'Reading materials',
                'Listening exercises',
            ],
            type: 'multiple',
        },
    ];

    const currentQ = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    const handleAnswer = (option) => {
        if (currentQ.type === 'single') {
            setAnswers({ ...answers, [currentQ.id]: option });
        } else {
            const currentAnswers = answers[currentQ.id] || [];
            const newAnswers = currentAnswers.includes(option)
                ? currentAnswers.filter((a) => a !== option)
                : [...currentAnswers, option];
            setAnswers({ ...answers, [currentQ.id]: newAnswers });
        }
    };

    const isAnswered = () => {
        const answer = answers[currentQ.id];
        if (currentQ.type === 'multiple') {
            return answer && answer.length > 0;
        }
        return answer !== undefined;
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Quiz completed
            completePersonalization(answers);
            navigate('/home');
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-ocean-50 to-primary-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 p-4">
            <div className="w-full max-w-3xl">
                {/* Header */}
                <div className="text-center mb-8 animate-slide-up">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Personalize Your Experience
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Help us tailor your learning journey (Question {currentQuestion + 1} of {questions.length})
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-primary-500 to-ocean-500 transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
                        <span>{currentQuestion + 1}/{questions.length}</span>
                        <span>{Math.round(progress)}% Complete</span>
                    </div>
                </div>

                {/* Question Card */}
                <div className="glass-card p-8 mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                        {currentQ.question}
                    </h2>

                    <div className="space-y-3">
                        {currentQ.options.map((option, index) => {
                            const isSelected = currentQ.type === 'single'
                                ? answers[currentQ.id] === option
                                : (answers[currentQ.id] || []).includes(option);

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(option)}
                                    className={`
                    w-full p-4 rounded-xl border-2 text-left transition-all duration-200
                    ${isSelected
                                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-md'
                                            : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                                        }
                  `}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                      ${isSelected
                                                ? 'border-primary-500 bg-primary-500'
                                                : 'border-gray-300 dark:border-gray-600'
                                            }
                    `}>
                                            {isSelected && (
                                                <div className="w-2 h-2 bg-white rounded-full" />
                                            )}
                                        </div>
                                        <span className={`font-medium ${isSelected ? 'text-primary-700 dark:text-primary-300' : 'text-gray-700 dark:text-gray-300'}`}>
                                            {option}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {currentQ.type === 'multiple' && (
                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">
                            * You can select multiple options
                        </p>
                    )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                    <button
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                        className="btn-secondary flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={!isAnswered()}
                        className="btn-primary flex-1 flex items-center justify-center gap-2"
                    >
                        {currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PersonalizationQuiz;

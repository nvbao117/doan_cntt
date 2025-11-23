import { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

const GrammarChecker = () => {
    const [text, setText] = useState('');
    const [checking, setChecking] = useState(false);
    const [results, setResults] = useState([]);

    const handleCheck = () => {
        setChecking(true);
        // TODO: Call API for grammar checking
        setTimeout(() => {
            setResults([
                { type: 'error', text: 'their', correction: 'there', position: 15, explanation: 'Use "there" for location' },
                { type: 'warning', text: 'very good', correction: 'excellent', position: 45, explanation: 'Consider using a stronger word' },
            ]);
            setChecking(false);
        }, 1500);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-8 animate-slide-up">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    Grammar Checker ✍️
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                    AI-powered grammar and spelling corrections
                </p>
            </div>

            <div className="glass-card p-6 mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or paste your text here..."
                    className="w-full h-64 input-field resize-none"
                />
                <button
                    onClick={handleCheck}
                    disabled={!text.trim() || checking}
                    className="w-full btn-primary mt-4"
                >
                    {checking ? 'Checking...' : 'Check Grammar'}
                </button>
            </div>

            {results.length > 0 && (
                <div className="glass-card p-6 animate-slide-up">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                        Suggestions ({results.length})
                    </h2>
                    <div className="space-y-4">
                        {results.map((result, index) => (
                            <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <div className="flex items-start gap-3">
                                    <AlertCircle className={`w-5 h-5 mt-1 ${result.type === 'error' ? 'text-red-500' : 'text-yellow-500'}`} />
                                    <div className="flex-1">
                                        <p className="text-gray-900 dark:text-white font-medium">
                                            <span className="line-through text-red-600">{result.text}</span>
                                            {' → '}
                                            <span className="text-green-600">{result.correction}</span>
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{result.explanation}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GrammarChecker;

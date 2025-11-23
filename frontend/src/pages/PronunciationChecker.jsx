import { Mic, Square, Play } from 'lucide-react';
import { useState } from 'react';

const PronunciationChecker = () => {
    const [recording, setRecording] = useState(false);
    const [hasRecording, setHasRecording] = useState(false);

    const handleRecord = () => {
        setRecording(true);
        setTimeout(() => {
            setRecording(false);
            setHasRecording(true);
        }, 3000);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-8 animate-slide-up">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    Pronunciation Checker 🎤
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Practice and improve your pronunciation with AI feedback
                </p>
            </div>

            <div className="glass-card p-12 text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full mb-6 ${recording ? 'bg-red-500 animate-pulse' : 'bg-gradient-to-br from-primary-500 to-ocean-500'}`}>
                    <Mic className="w-16 h-16 text-white" />
                </div>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {recording ? 'Recording...' : hasRecording ? 'Recording Complete!' : 'Ready to Record'}
                </h2>

                {!recording && !hasRecording && (
                    <button onClick={handleRecord} className="btn-primary text-lg px-8 py-3">
                        Start Recording
                    </button>
                )}

                {recording && (
                    <button onClick={() => setRecording(false)} className="bg-red-600 hover:bg-red-700 text-white font-medium px-8 py-3 rounded-lg">
                        <Square className="w-5 h-5 inline mr-2" />
                        Stop
                    </button>
                )}

                {hasRecording && !recording && (
                    <div className="space-y-4">
                        <div className="flex gap-4 justify-center">
                            <button className="btn-secondary">
                                <Play className="w-5 h-5 inline mr-2" />
                                Play
                            </button>
                            <button onClick={handleRecord} className="btn-primary">
                                Record Again
                            </button>
                        </div>
                        <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                Pronunciation Score: 85/100
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                Great job! Your pronunciation is clear. Focus on the "th" sound.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PronunciationChecker;

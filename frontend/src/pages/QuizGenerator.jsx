import { Upload, FileText, Loader, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const QuizGenerator = () => {
    const [file, setFile] = useState(null);
    const [generating, setGenerating] = useState(false);
    const [quizGenerated, setQuizGenerated] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleGenerate = () => {
        setGenerating(true);
        // TODO: Call API to generate quiz
        setTimeout(() => {
            setGenerating(false);
            setQuizGenerated(true);
        }, 3000);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-8 animate-slide-up">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    AI Quiz Generator 🎯
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Upload your study material and let AI create custom quizzes for you
                </p>
            </div>

            {/* File Upload */}
            <div className="glass-card p-8 mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 text-center hover:border-primary-500 transition-colors"
                >
                    {file ? (
                        <div className="flex flex-col items-center">
                            <FileText className="w-16 h-16 text-primary-600 mb-4" />
                            <p className="text-lg font-medium text-gray-900 dark:text-white">{file.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                {(file.size / 1024).toFixed(2)} KB
                            </p>
                            <button
                                onClick={() => setFile(null)}
                                className="mt-4 text-red-600 dark:text-red-400 hover:underline"
                            >
                                Remove file
                            </button>
                        </div>
                    ) : (
                        <div>
                            <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <p className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                Drag and drop your file here
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                or click to browse (PDF, DOCX, TXT)
                            </p>
                            <label className="btn-primary inline-flex items-center cursor-pointer">
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    accept=".pdf,.docx,.txt"
                                    className="hidden"
                                />
                                Choose File
                            </label>
                        </div>
                    )}
                </div>

                {file && (
                    <button
                        onClick={handleGenerate}
                        disabled={generating}
                        className="w-full btn-primary mt-6 flex items-center justify-center gap-2"
                    >
                        {generating ? (
                            <>
                                <Loader className="w-5 h-5 animate-spin" />
                                Generating Quiz...
                            </>
                        ) : (
                            <>
                                <CheckCircle className="w-5 h-5" />
                                Generate Quiz
                            </>
                        )}
                    </button>
                )}
            </div>

            {/* Generated Quiz */}
            {quizGenerated && (
                <div className="glass-card p-8 animate-slide-up">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Generated Quiz (Sample)
                    </h2>
                    <div className="space-y-6">
                        {[1, 2, 3].map((q) => (
                            <div key={q} className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                                    Question {q}: What is the main topic of the document?
                                </h3>
                                <div className="space-y-2">
                                    {['Option A', 'Option B', 'Option C', 'Option D'].map((opt) => (
                                        <label key={opt} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600">
                                            <input type="radio" name={`q${q}`} className="w-4 h-4" />
                                            <span className="text-gray-700 dark:text-gray-300">{opt}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full btn-primary mt-6">Submit Answers</button>
                </div>
            )}
        </div>
    );
};

export default QuizGenerator;

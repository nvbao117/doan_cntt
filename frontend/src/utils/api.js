import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Unauthorized - clear auth and redirect to login
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// API endpoints (ready for backend integration)
export const authAPI = {
    login: (email, password) => api.post('/auth/login', { email, password }),
    register: (name, email, password) => api.post('/auth/register', { name, email, password }),
    logout: () => api.post('/auth/logout'),
    resetPassword: (email) => api.post('/auth/reset-password', { email }),
};

export const chatAPI = {
    sendMessage: (message, chatId) => api.post('/chat/message', { message, chatId }),
    getChatHistory: () => api.get('/chat/history'),
    deleteChat: (chatId) => api.delete(`/chat/${chatId}`),
    sendLangChainMessage: (message, threadId) => api.post('/chat', { message, thread_id: threadId }),
};

export const quizAPI = {
    generateQuiz: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return api.post('/quiz/generate', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
    submitAnswers: (quizId, answers) => api.post(`/quiz/${quizId}/submit`, { answers }),
};

export const grammarAPI = {
    checkGrammar: (text) => api.post('/grammar/check', { text }),
};

export const pronunciationAPI = {
    checkPronunciation: (audioBlob) => {
        const formData = new FormData();
        formData.append('audio', audioBlob);
        return api.post('/pronunciation/check', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    },
};

export const readingAPI = {
    getPassages: () => api.get('/reading/passages'),
    getPassage: (id) => api.get(`/reading/passages/${id}`),
};

export const listeningAPI = {
    getExercises: () => api.get('/listening/exercises'),
    getExercise: (id) => api.get(`/listening/exercises/${id}`),
};

export default api;

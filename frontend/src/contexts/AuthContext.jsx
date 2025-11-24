import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [needsPersonalization, setNeedsPersonalization] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for saved user session
        const savedUser = localStorage.getItem('user');
        const savedAuth = localStorage.getItem('isAuthenticated');
        const savedPersonalization = localStorage.getItem('personalizationCompleted');

        if (savedUser && savedAuth === 'true') {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
            setNeedsPersonalization(savedPersonalization !== 'true');
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await authAPI.login(email, password);
            const { user, access_token } = response.data;

            localStorage.setItem('authToken', access_token);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('isAuthenticated', 'true');

            setUser(user);
            setIsAuthenticated(true);
            setNeedsPersonalization(false);

            return { success: true, user };
        } catch (error) {
            console.error('Login failed:', error);
            return {
                success: false,
                error: error.response?.data?.detail || 'Login failed. Please check your credentials.'
            };
        }
    };

    const loginWithProvider = async (provider) => {
        // TODO: Implement actual OAuth flow with Firebase or backend
        console.log(`Login with ${provider}`);

        // Simulating OAuth success for now
        return new Promise((resolve) => {
            setTimeout(() => {
                const mockUser = {
                    id: Date.now(),
                    name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
                    email: `user@${provider}.com`,
                    avatar: null,
                    provider: provider
                };

                setUser(mockUser);
                setIsAuthenticated(true);
                setNeedsPersonalization(true);

                localStorage.setItem('user', JSON.stringify(mockUser));
                localStorage.setItem('isAuthenticated', 'true');

                resolve({ success: true, user: mockUser });
            }, 1000);
        });
    };

    const register = async (name, email, password) => {
        try {
            const response = await authAPI.register(name, email, password);
            const { user, access_token } = response.data;

            localStorage.setItem('authToken', access_token);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('isAuthenticated', 'true');

            setUser(user);
            setIsAuthenticated(true);
            setNeedsPersonalization(true);

            return { success: true, user };
        } catch (error) {
            console.error('Registration failed:', error);

            return {
                success: false,
                error: error.response?.data?.detail || 'Registration failed. Please try again.'
            };
        }
    };

    const logout = async () => {
        try {
            await authAPI.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
            setIsAuthenticated(false);
            setNeedsPersonalization(false);

            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('personalizationCompleted');
            localStorage.removeItem('quizResults');
        }
    };

    const completePersonalization = (quizResults) => {
        localStorage.setItem('personalizationCompleted', 'true');
        localStorage.setItem('quizResults', JSON.stringify(quizResults));
        setNeedsPersonalization(false);
        // TODO: Send results to backend
    };

    const updateProfile = (updates) => {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        // TODO: Sync with backend
    };

    const value = {
        user,
        isAuthenticated,
        needsPersonalization,
        loading,
        login,
        loginWithProvider,
        register,
        logout,
        completePersonalization,
        updateProfile,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

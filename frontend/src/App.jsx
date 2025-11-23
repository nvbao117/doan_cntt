import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';

// Layout
import MainLayout from './components/layout/MainLayout';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import PersonalizationQuiz from './pages/auth/PersonalizationQuiz';

// Main Pages
import Home from './pages/Home';
import Chatbot from './pages/Chatbot';
import QuizGenerator from './pages/QuizGenerator';
import GrammarChecker from './pages/GrammarChecker';
import PronunciationChecker from './pages/PronunciationChecker';
import Reading from './pages/Reading';
import Listening from './pages/Listening';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, needsPersonalization, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-ocean-500 rounded-2xl flex items-center justify-center shadow-xl mb-4 mx-auto animate-pulse">
            <span className="text-white font-bold text-2xl">L</span>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (needsPersonalization) {
    return <Navigate to="/personalization" replace />;
  }

  return children;
};

// Personalization Route (only accessible after login, before personalization)
const PersonalizationRoute = ({ children }) => {
  const { isAuthenticated, needsPersonalization, loading } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!needsPersonalization) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

// Auth Route (redirect if already authenticated)
const AuthRoute = ({ children }) => {
  const { isAuthenticated, needsPersonalization, loading } = useAuth();

  if (loading) return null;

  if (isAuthenticated) {
    if (needsPersonalization) {
      return <Navigate to="/personalization" replace />;
    }
    return <Navigate to="/home" replace />;
  }

  return children;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ChatProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route
                path="/login"
                element={
                  <AuthRoute>
                    <Login />
                  </AuthRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <AuthRoute>
                    <Register />
                  </AuthRoute>
                }
              />
              <Route
                path="/forgot-password"
                element={
                  <AuthRoute>
                    <ForgotPassword />
                  </AuthRoute>
                }
              />

              {/* Personalization Route */}
              <Route
                path="/personalization"
                element={
                  <PersonalizationRoute>
                    <PersonalizationQuiz />
                  </PersonalizationRoute>
                }
              />

              {/* Protected Routes with Layout */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <MainLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/home" replace />} />
                <Route path="home" element={<Home />} />
                <Route path="chatbot" element={<Chatbot />} />
                <Route path="quiz-generator" element={<QuizGenerator />} />
                <Route path="grammar-checker" element={<GrammarChecker />} />
                <Route path="pronunciation" element={<PronunciationChecker />} />
                <Route path="reading" element={<Reading />} />
                <Route path="listening" element={<Listening />} />
              </Route>

              {/* Catch all - redirect to home or login */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </ChatProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

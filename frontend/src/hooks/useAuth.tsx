import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { authApi } from '../lib/api/auth';
import { LoginRequest, LoginResponse, RegisterRequest, Role } from '../lib/api/types';

interface AuthContextType {
    user: LoginResponse | null;
    loading: boolean;
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: (credentials: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<LoginResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('jwt_token');
        const userData = localStorage.getItem('user_data');
        if (token && userData) {
            try {
                setUser(JSON.parse(userData));
            } catch (error) {
                console.error('Failed to parse user data:', error);
                localStorage.removeItem('jwt_token');
                localStorage.removeItem('user_data');
            }
        }
        setLoading(false);
    }, []);

    const login = async (credentials: LoginRequest) => {
        const data = await authApi.login(credentials);
        localStorage.setItem('jwt_token', data.token);
        localStorage.setItem('user_data', JSON.stringify(data));
        setUser(data);
    };

    const register = async (data: RegisterRequest) => {
        const response = await authApi.register(data);
        localStorage.setItem('jwt_token', response.token);
        localStorage.setItem('user_data', JSON.stringify(response));
        setUser(response);
    };

    const logout = () => {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('user_data');
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated: !!user,
                isAdmin: user?.roles.includes(Role.ADMIN) || false,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

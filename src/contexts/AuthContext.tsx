
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the User interface
export interface User {
  id: string;
  name: string;
  phone: string;
  role: "admin" | "receptionniste" | "gerant";
}

// Define the context interface
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (phone: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: () => boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
  isAdmin: () => false,
});

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Mock user data (in a real app, this would come from an API)
  const mockUsers = [
    { id: "1", name: "Admin Système", phone: "0600000000", role: "admin", password: "admin123" },
    { id: "2", name: "Jean Réceptionniste", phone: "0611111111", role: "receptionniste", password: "jean123" },
    { id: "3", name: "Marie Gérante", phone: "0622222222", role: "gerant", password: "marie123" },
  ] as const;

  // Check if there's a user in localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = async (phone: string, password: string): Promise<boolean> => {
    const user = mockUsers.find(user => user.phone === phone && user.password === password);
    
    if (user) {
      const userData: User = {
        id: user.id,
        name: user.name,
        role: user.role,
        phone: user.phone
      };
      
      localStorage.setItem('currentUser', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
      return true;
    }
    
    return false;
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');
  };

  // Check if user is admin
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

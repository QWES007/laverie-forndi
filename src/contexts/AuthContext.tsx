
import { createContext, useContext, useState, ReactNode } from 'react';
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

  // Default admin account (only account for initial setup)
  const defaultAdmin = {
    id: "1", 
    name: "Admin Système", 
    phone: "0709177296", 
    role: "admin" as const, 
    password: "qwes080184"
  };

  // Initialize appUsers in localStorage if it doesn't exist
  useState(() => {
    const storedUsers = localStorage.getItem('appUsers');
    if (!storedUsers) {
      localStorage.setItem('appUsers', JSON.stringify([
        { id: defaultAdmin.id, name: defaultAdmin.name, phone: defaultAdmin.phone, role: defaultAdmin.role }
      ]));
    }
    
    // Also store the admin password separately for security
    const storedPwd = localStorage.getItem('adminPwd');
    if (!storedPwd) {
      localStorage.setItem('adminPwd', JSON.stringify({
        [defaultAdmin.phone]: defaultAdmin.password
      }));
    }
    
    // Check for logged in user
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      setUser(userData);
      setIsAuthenticated(true);
    }
  });

  // Login function using localStorage
  const login = async (phone: string, password: string): Promise<boolean> => {
    // Get user from the users list
    const storedUsers = localStorage.getItem('appUsers');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    const userToLogin = users.find((u: User) => u.phone === phone);
    
    // Get password from storage
    const storedPwd = localStorage.getItem('adminPwd');
    const passwords = storedPwd ? JSON.parse(storedPwd) : {};
    
    // For default admin or any user whose password matches
    if (userToLogin && passwords[phone] === password) {
      try {
        const userData: User = {
          id: userToLogin.id,
          name: userToLogin.name,
          role: userToLogin.role,
          phone: userToLogin.phone
        };
        
        localStorage.setItem('currentUser', JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
        return true;
      } catch (error) {
        console.error("Login error:", error);
        return false;
      }
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

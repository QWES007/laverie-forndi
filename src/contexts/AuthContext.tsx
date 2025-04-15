
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../integrations/firebase/client';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from '../integrations/firebase/client';

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
  useEffect(() => {
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
  }, []);

  // Set up Firebase authentication listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Check if user exists in Firestore
        try {
          const userDoc = await getDoc(doc(firestore, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data() as User;
            setUser({
              id: firebaseUser.uid,
              name: userData.name,
              role: userData.role,
              phone: userData.phone
            });
            setIsAuthenticated(true);
            localStorage.setItem('currentUser', JSON.stringify(userData));
          } else {
            // User not found in Firestore database
            setUser(null);
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        // No user is logged in
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('currentUser');
      }
    });

    return () => unsubscribe();
  }, []);

  // Login function - for now, we'll continue to use localStorage
  // In a real app, you'd convert this to use Firebase authentication
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
        // Create a Firebase email from the phone number for authentication
        const email = `${phone}@laverie-moderne.com`;
        
        // Try to sign in with Firebase
        try {
          await signInWithEmailAndPassword(auth, email, password);
        } catch (error: any) {
          // If user doesn't exist in Firebase, we'll just use local auth for now
          console.warn("Firebase auth failed, using local auth:", error.message);
        }
        
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
    signOut(auth).then(() => {
      localStorage.removeItem('currentUser');
      setUser(null);
      setIsAuthenticated(false);
      navigate('/login');
    }).catch((error) => {
      console.error("Logout error:", error);
    });
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

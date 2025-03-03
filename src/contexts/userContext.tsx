import { createContext, useContext, useState, ReactNode } from "react";
import { loginUserAsync } from "../services/api";
import { User } from "../domain/user";

interface UserContextType {
  user: User | null;
  login:  (userData: User)  => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);
UserContext.displayName = "User"

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserContextType['user']>(null);

  const login = async (userData: User) => {
    try {
      await loginUserAsync(userData);
      setUser(userData);
    } catch (error) {
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useAuth must be used within a UserProvider');
  }

  return context;
};
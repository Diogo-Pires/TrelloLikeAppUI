import { createContext, useContext, useState, ReactNode } from "react";
import { User } from "../domain/User";

interface UserContextType {
  user: User | null;
  login:  (userData: User)  => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);
UserContext.displayName = "User"

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserContextType['user']>(null);

  // return (
  //   <UserContext.Provider value={{ user, login, logout }}>
  //     {children}
  //   </UserContext.Provider>
  // );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export const useAuth = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useAuth must be used within a UserProvider');
  }

  return context;
};
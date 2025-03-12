import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { User } from "../domain/User";
import { SessionManagementService } from "../services/SessionManagementService";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);
UserContext.displayName = "User"

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    return SessionManagementService.getAuhenticateUser();
  });

  useEffect(() => {
    if (!user) {
      SessionManagementService.logout();
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
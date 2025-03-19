import { jwtDecode } from "jwt-decode";
import { User } from "../domain/User";

export const extractTokenInformation = (token: string):  User | null => {
    if (!token) return null;
  
    try {
      const decoded: User = jwtDecode<User>(token);
      return {
        name: decoded.name,
        email: decoded.email,
      };
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
};
import { jwtDecode } from "jwt-decode";
import { User } from "../domain/User";

const TOKEN_KEY = "auth_token";
const TOKEN_USER_KEY = "auth_user";

export const SessionManagementService = {
  saveToken: (token: string) => {
    const user = extractTokenInformation(token);
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(TOKEN_USER_KEY, JSON.stringify(user));
  },

  getToken: (): string | null => {
    return sessionStorage.getItem(TOKEN_KEY);
  },

  getAuhenticateUser: (): User | null => {
    const userJson = sessionStorage.getItem(TOKEN_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  },

  logout: () => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_USER_KEY);
    window.location.href = "/login";
  },

  isAuthenticated: (): boolean => {
    return !!sessionStorage.getItem(TOKEN_KEY);
  },
};

const extractTokenInformation = (token: string):  User | null => {
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
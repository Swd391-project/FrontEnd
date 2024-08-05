import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

import { config } from "../../config";

interface AuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
    user?: {
      id: string;
      "full-name": string;
      "phone-number": string;
      image: string;
      role: string;
    };
  };
  onRegister?: (
    email: string,
    fullName: string,
    phoneNumber: string,
    password: string,
  ) => Promise<any>;
  onLogin?: (username: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "userToken";
const USER_DATA_KEY = "userData";
export const API_URL = `${config.BACKEND_API}/api/auth`;
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
    user?: {
      id: string;
      "full-name": string;
      "phone-number": string;
      image: string;
      role: string;
    };
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      const userData = await SecureStore.getItemAsync(USER_DATA_KEY);

      if (token && userData) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setAuthState({
          token: token,
          authenticated: true,
          user: JSON.parse(userData),
        });
      }
    };

    loadToken();
  }, []);

  const register = async (
    email: string,
    fullName: string,
    phoneNumber: string,
    password: string,
  ) => {
    try {
      return await axios.post(`${API_URL}/register`, {
        "full-name": fullName,
        email,
        "phone-number": phoneNumber,
        password,
      });
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });
      const userData = {
        id: result.data.id,
        ["full-name"]: result.data["full-name"],
        ["phone-number"]: result.data["phone-number"],
        image: result.data.image,
        role: result.data.role,
      };

      setAuthState({
        token: result.data.token,
        authenticated: true,
        user: userData,
      });

      axios.defaults.headers.common["Authorization"] =
        `Bearer ${result.data.token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
      await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(userData));
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_DATA_KEY);
    } catch (error) {
      console.error("Error deleting tokens:", error);
    }

    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      token: null,
      authenticated: false,
      user: undefined,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

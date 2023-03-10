import React, { useContext, createContext, useState } from "react";

interface User {
  username: string;
  email: string;
  id: string;
  imageUrl: string | null;
}

export interface Auth {
  user: User;
  token: string;
  isLoggedIn: boolean;
}

const initialState: Auth = {
  user: { username: "", email: "", id: "", imageUrl: "" },
  token: "",
  isLoggedIn: false,
};

const AuthContext = createContext<Auth>(initialState);
const AuthenticateContext = createContext<(payload: Auth) => void>(() => {});
const LogOutContext = createContext<() => void>(() => {});

export const useAuth = () => {
  return useContext<Auth>(AuthContext);
};

export const useAuthenticate = (payload: Auth) => {
  return useContext<(payload: Auth) => void>(AuthenticateContext);
};

export const useLogOut = () => {
  return useContext<() => void>(LogOutContext);
};

interface ProviderProps {
  children: JSX.Element;
}

export const AuthProvider: React.FC<ProviderProps> = (props): JSX.Element => {
  const [auth, setAuth] = useState<Auth>(initialState);

  const authenticate = (payload: Auth) => {
    setAuth({
      user: payload.user,
      token: payload.token,
      isLoggedIn: !!payload.token,
    });

    localStorage.setItem("auth", JSON.stringify(auth));
  };

  const logOut = () => {
    setAuth(initialState);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={auth}>
      <AuthenticateContext.Provider value={authenticate}>
        <LogOutContext.Provider value={logOut}>
          {props.children}
        </LogOutContext.Provider>
      </AuthenticateContext.Provider>
    </AuthContext.Provider>
  );
};

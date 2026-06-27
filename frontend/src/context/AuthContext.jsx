import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthProvider({
  children,
}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (data) => {
    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );

    // FIX
    localStorage.setItem(
  "token",
  data.accessToken
);

    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
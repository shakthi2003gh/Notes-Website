import { createContext, useContext, useEffect, useState } from "react";
import IndexedDB from "../services/indexedDB";
import { login, register, resend, verify } from "../services/http/user";

const UserContext = createContext(null);
const userLocalDB = new IndexedDB("user", { keyPath: "_id" });

export function useUser() {
  return useContext(UserContext);
}

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleLogout = () => {
    if (!user) return;

    setUser(null);
    userLocalDB.delete(user._id);
  };

  const handleLogin = async (payload) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      handleLogout();

      login(payload)
        .then((user) => {
          setUser(user);
          userLocalDB.add(user);
          resolve();
        })
        .catch(reject)
        .finally(() => setLoading(false));
    });
  };

  const handleRegister = async (payload) => {
    return new Promise((resolve, reject) => {
      setLoading(true);
      handleLogout();

      register(payload)
        .then(resolve)
        .catch(reject)
        .finally(() => setLoading(false));
    });
  };

  const handleVerify = async (payload) => {
    return new Promise((resolve, reject) => {
      setLoading(true);

      verify(payload)
        .then((user) => {
          setUser(user);
          userLocalDB.add(user);
          resolve();
        })
        .catch(reject)
        .finally(() => setLoading(false));
    });
  };

  const handleResend = (email) => {
    return resend({ email });
  };

  const handleSettings = (property) => (value) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      settings: {
        ...user.settings,
        [property]: value,
        lastSync: new Date(Date.now()).toISOString(),
      },
      isSynced: false,
    };

    setUser(updatedUser);
    userLocalDB.update(updatedUser);
  };

  useEffect(() => {
    setLoading(true);

    userLocalDB
      .getAll()
      .then((users) => setUser(users[0]))
      .finally(() => setLoading(false));
  }, []);

  const methods = {
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    verify: handleVerify,
    resend: handleResend,
    setDarkMode: handleSettings("darkMode"),
    setAutoSync: handleSettings("autoSync"),
  };
  const value = { user, isLoading, ...methods };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

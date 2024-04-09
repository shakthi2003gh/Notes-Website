import { createContext, useContext, useEffect, useState } from "react";
import IndexedDB from "../services/indexedDB";
import { login, register, resend, verify } from "../services/http/user";
import { checkSettingSync, settingsSync } from "../services/http/user";
import { useNetwork } from "./network";
import { useDebounceFn } from "../hooks/useDebounce";

const UserContext = createContext(null);
const userLocalDB = new IndexedDB("user");

export function useUser() {
  return useContext(UserContext);
}

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isSyncing, setSyncing] = useState(false);
  const { isOnline } = useNetwork();
  const { lastSync, autoSync } = user?.settings || {};
  const canSync = user && isOnline && autoSync;

  const handleLogout = () => {
    if (!user) return;

    setUser(null);
    userLocalDB.delete(user._id);
    localStorage.removeItem("Notes-Auth-T");
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
        lastSync: new Date(Date.now()).toISOString(),
        [property]: value,
      },
      isSynced: false,
    };

    setUser(updatedUser);
    userLocalDB.update(updatedUser);
  };

  const setDarkMode = handleSettings("darkMode");
  const setAutoSync = handleSettings("autoSync");
  const setLastSync = handleSettings("lastSync");

  const sync = async () => {
    if (!user) return;

    const { darkMode, autoSync } = user.settings;
    const payload = { darkMode, autoSync };

    return settingsSync(payload).then((data) => {
      if (!data) return;

      const { lastSync } = data;
      setLastSync(lastSync);
    });
  };

  const syncSettings = () => {
    setSyncing(true);
    checkSettingSync()
      .then(({ darkMode, autoSync, lastSync }) => {
        const { settings } = user;

        if (settings.lastSync == lastSync) return;
        if (settings.lastSync > lastSync) return sync();
        if (settings.darkMode !== darkMode) setDarkMode(darkMode);
        if (settings.autoSync !== autoSync) setAutoSync(autoSync);
      })
      .finally(() => setSyncing(false));
  };

  const handleSettingsSync = useDebounceFn(syncSettings, 2500);

  const toggleAutoSync = () => {
    setAutoSync(!autoSync);
  };

  useEffect(() => {
    setLoading(true);

    userLocalDB
      .getAll()
      .then((users) => setUser(users[0]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    canSync && handleSettingsSync();
  }, [canSync, lastSync]);

  const methods = {
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
    verify: handleVerify,
    resend: handleResend,
    setDarkMode,
    toggleAutoSync,
    setSyncing,
    syncSettings,
  };
  const value = { user, isLoading, isSyncing, canSync, ...methods };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

import { createContext, useContext, useEffect, useState } from "react";
import { RiWifiLine } from "react-icons/ri";
import { RiWifiOffLine } from "react-icons/ri";

const NetworkContext = createContext(null);

export function useNetwork() {
  return useContext(NetworkContext);
}

export default function NetworkProvider({ children }) {
  const [isOnline, setOnline] = useState(navigator.onLine);
  const [canAlert, showALert] = useState(!isOnline);

  const checkInternetConnection = (e) => {
    const online = e.type === "online";

    if (online) setTimeout(() => showALert(false), 3000);
    showALert(true);

    setOnline(online);
  };

  useEffect(() => {
    window.addEventListener("online", checkInternetConnection);
    window.addEventListener("offline", checkInternetConnection);

    return () => {
      window.removeEventListener("online", checkInternetConnection);
      window.removeEventListener("offline", checkInternetConnection);
    };
  }, []);

  const value = { isOnline, isOffline: !isOnline };
  return (
    <NetworkContext.Provider value={value}>
      {children}

      <div className={"network-alert" + (canAlert ? " show" : "")}>
        {isOnline ? (
          <div className="online">
            <RiWifiLine /> Back online
          </div>
        ) : (
          <div className="offline">
            <RiWifiOffLine /> No internet connection
          </div>
        )}
      </div>
    </NetworkContext.Provider>
  );
}

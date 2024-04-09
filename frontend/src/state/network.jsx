import { createContext, useContext, useEffect, useRef, useState } from "react";
import { RiWifiLine } from "react-icons/ri";
import { RiWifiOffLine } from "react-icons/ri";

const NetworkContext = createContext(null);

export function useNetwork() {
  return useContext(NetworkContext);
}

export default function NetworkProvider({ children }) {
  const [isOnline, setOnline] = useState(navigator.onLine);
  const [canAlert, showAlert] = useState(!isOnline);
  const alertRef = useRef(null);

  const handleOnline = () => {
    alertRef.current = setTimeout(() => showAlert(false), 3000);
  };

  const handleOffline = () => {
    clearTimeout(alertRef?.current);
    showAlert(true);
  };

  const checkInternetConnection = (e) => {
    const online = e.type === "online";

    if (online) handleOnline();
    else handleOffline();

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

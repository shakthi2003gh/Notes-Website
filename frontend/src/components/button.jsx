import React from "react";
import { MdCloudSync } from "react-icons/md";
import { useNetwork } from "../state/network";
import { useUser } from "../state/user";
import { useNotes } from "../state/notes";

export default function Button({ loading, children, ...rest }) {
  const { isOffline } = useNetwork();

  return (
    <button {...rest} disabled={loading || isOffline}>
      {children}
      {loading && <div className="loading"></div>}
    </button>
  );
}

export function SyncButton() {
  const { isOffline } = useNetwork();
  const { isSyncing, syncSettings } = useUser();
  const { syncNotes } = useNotes();

  const handleClick = () => {
    syncSettings();
    syncNotes();
  };

  return (
    <button
      className="btn-sync"
      title="sync"
      onClick={handleClick}
      disabled={isSyncing || isOffline}
    >
      {isSyncing ? <div className="loading"></div> : <MdCloudSync />}
    </button>
  );
}

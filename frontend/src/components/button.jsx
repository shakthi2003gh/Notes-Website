import React from "react";
import { useNetwork } from "../state/network";

export default function Button({ loading, children, ...rest }) {
  const { isOffline } = useNetwork();

  return (
    <button {...rest} disabled={loading || isOffline}>
      {children}
      {loading && <div className="loading"></div>}
    </button>
  );
}

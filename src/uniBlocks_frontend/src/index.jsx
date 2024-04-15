
import React, { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { AuthClient } from "@dfinity/auth-client";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const AppContainer = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [authClient, setAuthClient] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [client1, setClient] = useState(null);

  const init = async () => {
    const client = await AuthClient.create();
    setAuthClient(client);
    setClient(client);

    if (await client.isAuthenticated()) {
      handleAuthenticated(client);
    }
  };

  const handleIIdisconnect = async () => {
    if (authClient) { // Check if authClient is available
      console.log("=>",authClient);
      await authClient.logout();
      window.location.reload();
    }
  };

  useEffect(() => {
    init();
  }, [setIdentity]);

  const handleAuthenticated = async (client) => {
    const identity = await client.getIdentity();
    setIdentity(identity)
    setAuthenticated(true);
  };

  const handleLogin = async () => {
    if (!authClient) return;

    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => {
        handleAuthenticated(authClient);
        window.location.reload();
      },
    });
  };

  return (
    <StrictMode>
      {authenticated ? (
        <>
          <App loggedInPrincipal={identity} onLoginClick={handleLogin} onDisconnect={handleIIdisconnect}/>
        </>
      ) : (
        <>
          {" "}
          <App loggedInPrincipal={null} onLoginClick={handleLogin} />
        </>
      )}
    </StrictMode>
  );
};

root.render(<AppContainer />);

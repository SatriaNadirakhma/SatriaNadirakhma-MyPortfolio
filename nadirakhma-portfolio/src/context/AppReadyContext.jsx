// src/context/AppReadyContext.jsx
//
// Hero (and any other section) is mounted from the very first render —
// App.jsx just hides it behind opacity/visibility while the loading
// screen is up. That means a plain "animate on mount" entrance would
// quietly play out *behind* the loading screen and be long finished by
// the time it's revealed. This context exposes one boolean, flipped by
// App.jsx the moment the loading screen exits, so sections can gate
// their entrance variants on the real reveal moment instead of mount.

import { createContext, useContext } from "react";

const AppReadyContext = createContext(false);

export const AppReadyProvider = ({ isReady, children }) => (
  <AppReadyContext.Provider value={isReady}>{children}</AppReadyContext.Provider>
);

export const useAppReady = () => useContext(AppReadyContext);

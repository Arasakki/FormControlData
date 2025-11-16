import App from "./App";
import { Provider } from "react-redux";
import store, { persistor } from "./storage";
import { createRoot } from "react-dom/client";
import { LanguageProvider } from "./hooks/context/LanguageContext";
import { PersistGate } from "redux-persist/integration/react";

import GlobalStyles from "./theme/globalStyles";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <LanguageProvider>
        <GlobalStyles />
        <App />
      </LanguageProvider>
    </PersistGate>
  </Provider>
);

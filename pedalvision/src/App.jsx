import React from "react";
import { Layout } from "./Layouts/Layout";
import { PedalboardView } from "./views/PedalboardView/PedalboardView";
import { SessionProvider } from "./Contexts/sessionContext/sessionContext";
export const App = () => {
  return (
    <SessionProvider>
      <Layout>
        <PedalboardView />
      </Layout>
    </SessionProvider>
  );
};

import React from "react";
import { Layout } from "./Layouts/Layout";
import { PedalboardView } from "./Views/PedalboardView/PedalboardView";
export const App = () => {
  return (
    <Layout>
      <PedalboardView />
    </Layout>
  );
};

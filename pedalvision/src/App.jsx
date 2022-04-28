import React from "react";
import { Layout } from "./Layouts/Layout";
import { PedalboardView } from "./Views/PedalboardViewDrag/PedalboardView";
export const App = () => {
  return (
    <Layout>
      <PedalboardView />
    </Layout>
  );
};

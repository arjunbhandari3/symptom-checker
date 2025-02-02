import React from "react";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  return (
    <Layout>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#4ade80",
              secondary: "#fff",
            },
          },
          error: {
            duration: 3000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
      <Dashboard />
    </Layout>
  );
};

export default App;

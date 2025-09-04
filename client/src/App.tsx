
import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { NavigationProvider } from "./components/navigation/NavigationProvider";
import { MainContainer } from "./components/layout/MainContainer";
import { AdminPage } from "./components/pages/AdminPage";

function App() {
  const location = useLocation();
  const route = location.pathname;

  // Simple router
  if (route.startsWith("/admin")) {
    return <AdminPage />;
  }

  return (
    <NavigationProvider>
      <MainContainer />
    </NavigationProvider>
  );
}

export default App;

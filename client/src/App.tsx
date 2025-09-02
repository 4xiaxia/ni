
import * as React from "react";
import { NavigationProvider } from "./components/navigation/NavigationProvider";
import { MainContainer } from "./components/layout/MainContainer";
import { AdminPage } from "./components/pages/AdminPage";

function App() {
  const [route, setRoute] = React.useState(window.location.pathname);

  React.useEffect(() => {
    const handlePopState = () => {
      setRoute(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // 简单路由
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

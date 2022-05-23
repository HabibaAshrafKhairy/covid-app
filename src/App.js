import { useState } from "react";
import "./App.css";
import AuthForm from "./components/AuthForm";
import QrCode from "./components/QrCode";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">
      <header className="header">Covid App</header>
      {!isAuthenticated && <AuthForm setIsAuthenticated={setIsAuthenticated} />}
      {isAuthenticated && <QrCode />}
    </div>
  );
}

export default App;

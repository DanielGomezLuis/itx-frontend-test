import "./App.css";

import React from "react";
import Header from "./components/Header";
import AppRouter from "./router/AppRouter";
import "./styles/base.css";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="container">
        <AppRouter />
      </main>
    </div>
  );
}

export default App;

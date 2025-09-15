import React from "react";
import { useTelegramWebApp } from "./useTelegramWebApp";

function App() {
  const tgData = useTelegramWebApp();

  if (!tgData) return <div>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Hello Telegram 👋</h1>
      <p>欢迎你, <b>{tgData.user?.first_name || "游客"}</b></p>
    </div>
  );
}

export default App;

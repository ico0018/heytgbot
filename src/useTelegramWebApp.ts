import { useEffect, useState } from "react";

interface TelegramUser {
  id: number;
  first_name: string;
  username?: string;
}

interface TelegramWebAppData {
  user?: TelegramUser;
  [key: string]: any;
}

export function useTelegramWebApp() {
  const [data, setData] = useState<TelegramWebAppData | null>(null);

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;

    if (tg?.initDataUnsafe) {
      setData(tg.initDataUnsafe);
    } else {
      // 本地调试 mock 数据
      setData({
        user: {
          id: 1,
          first_name: "LocalTest",
          username: "mock_user",
        },
      });
    }
  }, []);

  return data;
}

export {};

declare global {
  interface TelegramWebAppUser {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
  }

  interface TelegramWebApp {
    initData: string;
    initDataUnsafe: {
      user?: TelegramWebAppUser;
      query_id?: string;
      auth_date?: number;
      hash?: string;
    };
    ready: () => void;
    close: () => void;
    sendData: (data: string) => void;
  }

  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}

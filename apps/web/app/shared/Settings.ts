class Settings {
  public readonly apiHost = process.env.NEXT_PUBLIC_API_URL;
}

export const settings = new Settings();

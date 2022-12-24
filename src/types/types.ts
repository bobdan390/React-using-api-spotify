export interface SpotifyContext {
    state: {
      album: object;
      token: string;
    };
    setAlbum: (album: object) => void;
    setToken: (token: string) => void;
  }
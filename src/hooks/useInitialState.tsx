import { useState } from "react";

import { initialState } from "../utils";

export const useInitialState = () => {
  const [state, setState] = useState(initialState);

  const setAlbum = (payload: object) => {
    setState({
      ...state,
      album: payload,
    });
  };

  const setToken = (payload: string) => {
    setState({
      ...state,
      token: payload,
    });
  };

  return {
    setToken,
    setAlbum,
    state,
  };
};

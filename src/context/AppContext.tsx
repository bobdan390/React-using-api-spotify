import React from "react";
import { SpotifyContext } from "../types/types";

const AppContext = React.createContext<SpotifyContext>({} as SpotifyContext);

export default AppContext;

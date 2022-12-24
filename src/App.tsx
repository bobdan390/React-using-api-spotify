import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useInitialState } from "./hooks";
import { SpotifyContext } from "./types";
import AppContext from "./context/AppContext";
import Header from "./ui/header";
import Login from "./ui/login";
import Search from "./ui/search";
import Artist from "./ui/artist";
import Albumes from "./ui/albumes";

function App() {

  const initialState = useInitialState();

  return (
    <>
      <BrowserRouter>
        <AppContext.Provider value={initialState as SpotifyContext}>
          <Header />
          <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/search" element={<Search />}/>
            <Route path="/artist" element={<Artist />}/>
            <Route path="/albumes" element={<Albumes />}/>
          </Routes>
        </AppContext.Provider>
      </BrowserRouter>
    </>
    
  );
}

export default App;

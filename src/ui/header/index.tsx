/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import { getData } from "../../utils";
import AppContext from "../../context/AppContext";

function Header() {
  const navigate = useNavigate();
  const [logged, setLogged] = useState(false);  
  const { state, setToken } = useContext(AppContext);
  
  const salir = () => {
    localStorage.removeItem("token"); 
    setToken("");
    navigate("/"); 
  }

  useEffect(() => {
        let token = getData("token");
        if(token!=="" && token!==null){
            setLogged(true);
        }
    }, [])
  useEffect(() => {
    let token = getData("token");
    if(state?.token === "" && token === null){
        setLogged(false);
    }
  }, [state]);

  return (
    <>
        <nav className="w-full top-0">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-3 py-2">
                <div className="pl-4 md:pl-8 flex items-center">
                <a className="toggleColour text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="#">
                    
                    <p className="md:hidden">SP Api</p>
                    <p className="hidden md:block">Spotify Api</p>

                </a>
                </div>
                { logged &&
                    <div className="w-full flex items-center w-auto mt-2 mt-0 bg-white bg-transparent text-black p-4 z-20" id="nav-content">
                        <ul className="list-reset flex justify-end flex-1 items-center text-base">
                            <li className="h-[25px]">
                                <a onClick={()=>{ navigate("/search") }} className="inline-block px-3 md:px-6 font-bold no-underline colorSecondary" href="#">Buscar</a>
                            </li>
                            <li className="h-[25px]">
                                <a onClick={()=>{ navigate("/albumes") }} className="inline-block px-3 md:px-6 text-white no-underline" href="#">Mis albumes</a>
                            </li>



                            <li className="h-[25px] border-l-2">
                                <svg onClick={()=>salir()} className="md:hidden mt-1 ml-1.5" width="24" height="19" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.5 17.375H13.5C13.8977 17.3747 14.279 17.2561 14.5602 17.0452C14.8414 16.8343 14.9996 16.5483 15 16.25V14.5625H13.5V16.25H4.5V2.75H13.5V4.4375H15V2.75C14.9996 2.45172 14.8414 2.16575 14.5602 1.95483C14.279 1.74392 13.8977 1.6253 13.5 1.625H4.5C4.1023 1.6253 3.721 1.74392 3.43978 1.95483C3.15856 2.16575 3.0004 2.45172 3 2.75V16.25C3.0004 16.5483 3.15856 16.8343 3.43978 17.0452C3.721 17.2561 4.1023 17.3747 4.5 17.375Z" fill="white"/>
                                    <path d="M15.4395 12.0796L18.129 10.0625H7.5V8.9375H18.129L15.4395 6.92037L16.5 6.125L21 9.5L16.5 12.875L15.4395 12.0796Z" fill="white"/>
                                </svg>
                                <a className="hidden md:block inline-block px-6 text-white no-underline" 
                                    onClick={()=>salir()} href="#">Cerrar sesión</a>
                            </li>
                        </ul>
                    </div>
                }
            </div>
        </nav>
    </>
  );
}

export default Header;

import {useEffect, useContext} from 'react';
import { getData, setData } from "../../utils";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

function Login() {
    const navigate = useNavigate();
    const { setToken } = useContext(AppContext);

    useEffect(() => {
        const hash = window.location.hash
        let token = getData("token");
        if (hash) {
            let _token = hash?.substring(1)?.split("&")?.find(elem => elem.startsWith("access_token"))?.split("=")[1] + "";
            window.location.hash = "";
            setData("token", _token);
            setToken(_token);
            navigate("/search");
        }
        if(token!=="" && token!==null){
            navigate("/search");
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <>  
            <div className="w-full md:p-[80px] mt-[80px] xl:p-[120px] wrapper">
                <div className="grid grid-cols-1 xl:grid-cols-2">
                    <div className="">
                        <svg className="w-[222px] md:w-[318px] xl:w-[464px] h-[222px] md:h-[318px] xl:h-[464px] mx-auto md:mx-0 lg:mx-auto" viewBox="0 0 464 465" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M464 0H93.5V101.5H291.5L0 393L71.5 464.5L363.5 172.5V388.5H464V0Z" fill="#D6F379"/>
                        </svg>
                    </div>

                    <div className="xl:pl-10 mt-[40px] xl:mt-[0px]">
                        <p className="text-4xl lg:text-[64px] text-white font-bold text-center md:text-left tracking-wide md:tracking-normal md:mt-[50px] xl:mt-0">
                            Disfruta de la
                        </p>
                        <p className="text-4xl lg:text-[64px] colorSecondary font-bold text-center md:text-left tracking-wide md:tracking-normal md:mt-[30px]">
                            mejor música
                        </p>
                        <p className="text-white mt-[40px] text-center md:text-left">
                            Accede a tu cuenta para guardar tus <br/> albumes favoritos
                        </p>

                        <a className="flex text-white mt-[100px] font-bold gap-6 pl-[70px] md:pl-0" href={`https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=token&scope=user-library-read,user-library-modify`}>
                            Log in con Spotify
                            <svg className="mt-1" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 1L17 8L10 15M1 8H17H1Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </a>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;

import {useEffect, useState, useContext} from 'react';
import InputSearch from "../components/_inputSearch";
import CardSpotify from "../components/cardSpotify";
import axios from "axios";
import { getData } from "../../utils";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

function Search() {
    const { setAlbum } = useContext(AppContext);
    const [searchKey, setSearchKey] = useState("")
    const [artists, setArtists] = useState([])
    const [pag, setPag] = useState({
        total: 0,
        page: 1,
        perPage: 20
    })
    const navigate = useNavigate();
    const searchArtists = async () => {
        

        let t = await getData("token");

        await axios.get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${t}`
            },
            params: {
                q: searchKey === "" ? "a" : searchKey,
                type: "artist"
            }
        }).catch((error) => {
            if (error.response) {
              if(error.response.status === 401){
                localStorage.removeItem("token");
                navigate("/");
              }
              if(error.response.status !== 401){
                setArtists([])
                setPag({
                    total: 0,
                    perPage: 20,
                    page: 1
                })
              }
            }
        }).then((response: any) => {
            if(response){
                setArtists(response?.data?.artists?.items)
                setPag({
                    total: response?.data?.artists?.total,
                    perPage: response?.data?.artists?.limit,
                    page: 1
                })
            }
        });

        
    }

    useEffect(() => {
        searchArtists();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const redirectArtist = (artist: any) => {
        setAlbum(artist);
        navigate("/artist");
    }
    
  return (
    <>  
        <div className="w-full px-[25px] md:px-[110px] mt-[40px] xl:p-[80px] wrapper">
            <p className="text-4xl md:text-[64px] text-white font-bold text-left md:text-center tracking-wide md:tracking-normal md:mt-[110px] xl:mt-0">
                Busca tus
            </p>
            <p className="text-4xl md:text-[64px] colorSecondary font-bold text-left md:text-center tracking-wide md:tracking-normal md:mt-[30px]">
                artistas
            </p>
            <p className="text-white mt-[40px] text-left block md:hidden leading-8">
                Encuentra tus artistas favoritos gracias a nuestro buscador y guarda tus álbumes favoritos
            </p>
            <p className="text-white mt-[40px] text-center hidden md:block leading-8">
                Encuentra tus artistas favoritos gracias a nuestro <br/> buscador y guarda tus álbumes favoritos
            </p>
            <div className="mt-10 xl:w-[664px] m-auto relative">
                <InputSearch value={searchKey} onChangeKey={setSearchKey} handleSearch={searchArtists}/>
            </div>
            { artists.length > 0 &&
                <>
                    <p className="text-white my-[40px]">
                        Mostrando {pag?.perPage} resultados de {pag?.total} 
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
                        { artists.map((artist, index)=>{
                            return <CardSpotify onSetAlbum={(a:any)=>redirectArtist(a)} key={"artist_" + index} button="" data={artist}/>
                        })}
                    </div>
                </>
                
            }
        </div>
    </>
  );
}

export default Search;

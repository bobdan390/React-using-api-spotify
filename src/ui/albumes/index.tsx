import {useEffect, useState} from 'react';
import CardSpotify from "../components/cardSpotify";
import { getData } from "../../utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Albumes() {
    const navigate = useNavigate();
    const [albumes, setAlbumes] = useState([]);
    const getAlbumes = async () => {
        let t = await getData("token");
        await axios.get(`https://api.spotify.com/v1/me/albums`, {
            headers: {
                  Authorization: `Bearer ${t}`
              },
              params: {
                  limit:30
              }
          }).catch((error) => {
              if (error.response) {
                if(error.response.status === 401){
                  localStorage.removeItem("token");
                  navigate("/");
                }
                if(error.response.status !== 401){
                  setAlbumes([]);
                }
              }
          }).then((response: any) => {
              if(response){
                setAlbumes(response?.data?.items)
              }
          });
    }
    const removeAlbum = async (id:string) => {
        let t = await getData("token");
        await axios.delete(`https://api.spotify.com/v1/me/albums`,{
            headers: {
                  Authorization: `Bearer ${t}`,
                  'Content-Type': 'application/json'
            },
            params: {
              ids: id
            }
          }).catch((error) => {
              if (error.response) {
                if(error.response.status === 401){
                  localStorage.removeItem("token");
                  navigate("/");
                }
              }
          }).then((response: any) => {
              if(response){
                getAlbumes();
              }
          });
    }

    useEffect(() => {
        getAlbumes();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>  
        <div className="w-full px-[25px] md:px-[110px] mt-[40px] xl:p-[80px] wrapper">
            <p className="text-4xl md:text-[64px] text-white font-bold text-left md:text-center tracking-wide md:tracking-normal md:mt-[110px] xl:mt-0">
                Mis albumes
            </p>
            <p className="text-4xl md:text-[64px] colorSecondary font-bold text-left md:text-center tracking-wide md:tracking-normal md:mt-[30px]">
                guardados
            </p>
            <p className="text-white mt-[40px] text-left block md:hidden leading-8">
                Disfruta de tu música a un solo click y descube que discos has guardado dentro de “mis álbumes”
            </p>
            <p className="text-white mt-[40px] text-center hidden md:block leading-8">
                Disfruta de tu música a un solo click y descube que <br/> discos has guardado dentro de “mis álbumes"
            </p>

            { albumes.length > 0 &&
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
                    { albumes.map((album:any, index)=>{
                        return <CardSpotify 
                                  onRemoveAlbum={()=>removeAlbum(album?.album?.id)} 
                                  key={"artist_" + index} 
                                  button="remove" 
                                  data={album?.album}
                                />
                    })}
                </div>
            }
        </div>
    </>
  );
}

export default Albumes;

import {useEffect, useState, useContext} from 'react';
import CardSpotify from "../components/cardSpotify";
import { getData } from "../../utils";
import AppContext from "../../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Artist() {
  const { state } = useContext(AppContext);
  const [artists, setArtists] = useState({} as any)
  const [albumes, setAlbumes] = useState([]);
  const navigate = useNavigate();

  const getAlbumes = async () => {
    let t = await getData("token");
    await axios.get(`https://api.spotify.com/v1/artists/${artists?.id}/albums`, {
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

  const getImg = () =>{
    if(artists?.images){
      return artists?.images[1]?.url
    }else{
      return ""
    }
  }

  useEffect(() => {
    setArtists(state?.album);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if(artists?.id){
      getAlbumes()
    }
  }, [artists]); // eslint-disable-line react-hooks/exhaustive-deps

  const addAlbum = async (id:string) => {
    let t = await getData("token");
    await axios.put(`https://api.spotify.com/v1/me/albums`, {
      ids: [id]
    },{
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
            alert("Album agregado!!")
          }
      });
  }

  return (
    <>  
        <div className="w-full px-[25px] md:px-[110px] mt-[40px] xl:p-[80px] wrapper">
            
            <div className="md:flex gap-20">
              <div>
                  <img className="w-[169px] h-[168px] md:w-[237px] md:h-[236px] rounded-full" src={getImg()} alt="" />
              </div>
              <div>
                <p className="text-white flex gap-3 mt-8">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11 0C4.925 0 0 4.925 0 11C0 17.075 4.925 22 11 22C17.075 22 22 17.075 22 11C22 4.925 17.075 0 11 0ZM15.768 9.14C15.8558 9.03964 15.9226 8.92274 15.9646 8.79617C16.0065 8.6696 16.0227 8.53591 16.0123 8.40298C16.0018 8.27005 15.9648 8.14056 15.9036 8.02213C15.8423 7.90369 15.758 7.79871 15.6555 7.71334C15.5531 7.62798 15.4346 7.56396 15.3071 7.52506C15.1796 7.48616 15.0455 7.47316 14.9129 7.48683C14.7802 7.50049 14.6517 7.54055 14.5347 7.60463C14.4178 7.66872 14.3149 7.75554 14.232 7.86L9.932 13.019L7.707 10.793C7.5184 10.6108 7.2658 10.51 7.0036 10.5123C6.7414 10.5146 6.49059 10.6198 6.30518 10.8052C6.11977 10.9906 6.0146 11.2414 6.01233 11.5036C6.01005 11.7658 6.11084 12.0184 6.293 12.207L9.293 15.207C9.39126 15.3052 9.50889 15.3818 9.63842 15.4321C9.76794 15.4823 9.9065 15.505 10.0453 15.4986C10.184 15.4923 10.32 15.4572 10.4444 15.3954C10.5688 15.3337 10.6791 15.2467 10.768 15.14L15.768 9.14Z" fill="#619CED"/>
                  </svg>
                  Artista certificado  
                </p>
                <p className="text-4xl lg:text-[64px] text-white font-bold mt-8">
                    {artists?.name}
                </p>
                <p className="text-white mt-10">Followers: {artists?.followers?.total}</p>
                <p className="text-white">Top Popularidad: {artists?.popularity}</p>
              </div>
            </div>

            <p className="text-white mt-[100px] mb-5">
                Guarda tus álbumes favoritos de {artists?.name}
            </p>

            { albumes.length > 0 &&
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
                    { albumes.map((album:any, index)=>{
                        return <CardSpotify 
                                  onAddAlbum={()=>addAlbum(album?.id)} 
                                  key={"artist_" + index} 
                                  button="add" 
                                  data={album}
                                />
                    })}
                </div>
            }

        </div>
    </>
  );
}

export default Artist;

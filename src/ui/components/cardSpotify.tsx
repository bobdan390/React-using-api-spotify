function CardSpotify(props : any) {

    const setAlbum = () => {
        if(props?.onSetAlbum){
            props?.onSetAlbum(props?.data)
        }
    }

    const addAlbum = () => {
        if(props?.onAddAlbum){
            props?.onAddAlbum()
        }
    }

    const removedAlbum = () => {
        if(props?.onRemoveAlbum){
            props?.onRemoveAlbum()
        }
    }

    return (
      <>  
        <div className="p-6 rounded-3xl cardContainer" onClick={()=>setAlbum()}>
            <div className="cardContainer m-auto">
                <img className="rounded-xl w-full cursor-pointer" src={props?.data?.images[1]?.url} alt="" />
                <p className="text-3xl mt-5 font-semibold">
                    {props?.data?.name}
                </p>
                { props?.button === "" &&
                    <p className="mt-3">
                        Followers: {props?.data?.followers?.total}
                    </p>
                }
                
                { props?.button === "remove" &&
                    <>
                        <p className="mt-3">
                            Publicado: {props?.data?.release_date}
                        </p>
                        <button onClick={()=>removedAlbum()} className="text-white font-bold py-2 px-4 rounded-full bgRed mt-4">
                            - Remove album
                        </button>
                    </>
                }
                { props?.button === "add" &&
                    <>
                        <p className="mt-3">
                            Publicado: {props?.data?.release_date}
                        </p>
                        <button onClick={()=>addAlbum()} className="text-black font-bold py-2 px-4 rounded-full bgSecondary mt-4">
                            + add album
                        </button>
                    </>
                }
                
            </div>
        </div>
      </>
    );
  }
  
  export default CardSpotify;
  
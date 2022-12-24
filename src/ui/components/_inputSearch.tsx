function InputSearch(props: {value: string, onChangeKey: Function, handleSearch: Function}) {

    return (
      <>  
        <input value={props?.value} onChange={(e)=>{ props?.onChangeKey(e.target.value) }} placeholder="Type a text" className="w-full h-[62px] bg-white rounded-3xl font-bold pl-8" />
        <button onClick={()=>{props?.handleSearch()}} className="text-black font-bold py-2 px-4 rounded-full w-[150px] h-[46px] bgSecondary absolute right-[7px] top-[7px]">
            Button
        </button>
      </>
    );
  }
  
  export default InputSearch;
  
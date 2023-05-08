import  { useNavigate, useSearchParams } from "react-router-dom";
const Edit = ()=>{
    const navigate = useNavigate();
    const [searchParams,setSearchParams] = useSearchParams();
    const id = searchParams.get("id");
    const mode = searchParams.get("mode");
    console.log("id=>",id);
    console.log("mode=>",mode);
    return (
        <div>
            <h1>Edit</h1>
            <p>This is Edit</p>
            <button onClick={()=>setSearchParams({who:"ckly"})}>who change</button>
            <button onClick={()=>navigate('/home')}>To Home</button>
            <button onClick={()=>navigate(-1)}>Back</button>
        </div>
    );
};

export default Edit;
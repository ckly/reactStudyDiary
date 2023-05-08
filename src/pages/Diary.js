import { useParams } from "react-router-dom";

const Diary = ()=>{

    const {id} = useParams();  //custom hooks
    console.log("id=>",id);
    return (
        <div>
            <h1>Diary</h1>
            <p>This is Diary</p>
        </div>
    )
}

export default Diary;
import { useContext, useEffect, useState } from "react";
import  { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";
const Edit = ()=>{
    const [originData, setOriginData ] = useState();
    const navigate = useNavigate();    
    const {id} = useParams();    
    const diaryList = useContext(DiaryStateContext);   

    //Mount 되었을 경우 id 값이나 diaryList 값에 변동이 생길 경우
    useEffect(()=>{
        if(diaryList.length >= 1 ){
            const targetDiary = diaryList.find((it)=> parseInt(it.id) === parseInt(id));
            console.log("targetDiary=>",targetDiary)
            if(targetDiary){
                setOriginData(targetDiary);
            }else{
                navigate("/",{replace:true})
            }
        }
        
    },[id,diaryList]);

    return (
        <div>
           {originData && <DiaryEditor isEdit={true} originData={originData} />}
        </div>
    );
};

export default Edit;
import { useState,useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import MyButton from "./MyButton";
import MyHeader from "./MyHeader";
import EmotionItem from "./EmotionItem";
import {DiaryDispatchContext} from "./../App.js";

const emotionList = [
    {
        emotion_id : 5,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion5.png`,
        emotion_desript : '완전 좋음'
    },
    {
        emotion_id : 4,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion4.png`,
        emotion_desript : '좋음'
    },
    {
        emotion_id : 3,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion3.png`,
        emotion_desript : '보통'
    },
    {
        emotion_id : 2,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion2.png`,
        emotion_desript : '나쁨'
    },
    {
        emotion_id : 1,
        emotion_img : process.env.PUBLIC_URL + `/assets/emotion1.png`,
        emotion_desript : '완전 나쁨'
    },
]

const getStringDate = (date) => {
    let year = date.getFullYear();  
    let month = date.getMonth() + 1;  
    let day = date.getDate();
  
    if (month < 10) {  
      month = `0${month}`;  
    }
  
    if (day < 10) {  
      day = `0${day}`;  
    }
  
    return `${year}-${month}-${day}`;
}

const DiaryEditor = ({isEdit,originData}) => {
    const contentRef = useRef();
    const [content, setContent] = useState("");
    const [emotion, setEmotion] = useState(3);
    const [date, setDate] = useState(getStringDate(new Date()));
    const {onCreate, onEdit} = useContext(DiaryDispatchContext);

    const handleClickEmotion = (emotion) => {
        setEmotion(emotion);
    }
    const navigate = useNavigate();

    useEffect(()=>{
        if(isEdit){
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setEmotion(originData.emotion);
            setContent(originData.content);
        }
    },[isEdit,originData]);

    const handleSubmit = () => {
        if(content.length < 1){
            contentRef.current.focus();
            return;
        }
        if(window.confirm(isEdit ? "Modify?" : "New?")){
            if(!isEdit){
                onCreate(date,content,emotion);
            }else{
                onEdit(originData.id,date,content,emotion);
            }
        }
        
        navigate("/",{replace:true});
    }
    
    return (
        <div className="DiaryEditor">
           <MyHeader 
            headText={isEdit ? "Modify":"New"}
            leftChild={<MyButton text={"< Back"} onClick={()=>navigate(-1)} />}
           />
           <div>
                <section>
                    <h4>What's the date today?</h4>
                    <div className="input_box">
                        <input className="input_date"
                            type="date" 
                            value={date}
                            onChange={(e) => setDate(e.target.value)}                            
                        />
                    </div>
                </section>    
                <section>
                    <h4>Todays emotion</h4>
                    <div className="input_box emotion_list_wrapper">
                        {emotionList.map((it) => (
                            <EmotionItem key={it.emotion_id} {...it} onClick={handleClickEmotion} isSelected={it.emotion_id === emotion}/>
                        ))}
                    </div>
                </section>     
                <section>
                    <h4>Todays Diary</h4>
                    <div className="input_box text_wrapper">
                        <textarea
                            placeholder="What the Fuck Up?"
                            ref={contentRef}
                            value={content}
                            onChange={(e)=> setContent(e.target.value)}
                        />
                    </div>
                </section>   
                <section>
                    <div className="control_box">
                        <MyButton text={"Cancel"} onClick={()=>navigate(-1)}/>
                        <MyButton text={"write"} type={"positive"} onClick={handleSubmit}/>
                    </div>
                </section>    
            </div>
        </div>
        
    )
}

export default DiaryEditor;
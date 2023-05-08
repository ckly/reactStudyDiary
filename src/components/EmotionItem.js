const EmotionItem = ({emotion_id, emotion_img, emotion_desript,onClick,isSelected}) => {
    return (
        <div onClick={()=>onClick(emotion_id)} className={["EmotionItem",isSelected ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off` ].join(" ")}>
            <img src={emotion_img} />
            <span>{emotion_desript}</span>
        </div>
    )
} 

export default EmotionItem;
import { useNavigate } from "react-router-dom";
import MyButton from "./MyButton";

const DirayItem = ({ id, emotion, content, date }) => {
    const navigate = useNavigate();
    const strDate = new Date(parseInt(date)).toLocaleDateString();
    const getDetail = () => {
        navigate(`/diary/${id}`);
    }
    const goedit = () => {
        navigate(`/edit/${id}`);
    }

    return (
        <div className="DiaryItem">
            <div
                className={[
                    "emotion_img_wrapper",
                    `emotion_img_wrapper_${emotion}`,
                ].join(" ")} onClick={getDetail}
            >
                <img
                    src={
                        process.env.PUBLIC_URL + `assets/emotion${emotion}.png`
                    }
                />
            </div>

            <div className="info_wrapper" onClick={getDetail}>
                <div className="diary_date">{strDate}</div>
                <div className="diary_content_preview">
                    {content.slice(0, 25)}
                </div>
            </div>

            <div className="btn_wrapper">
                <MyButton text={"수정하기"} onClick={goedit}/>
            </div>
        </div>
    );
};

export default DirayItem;

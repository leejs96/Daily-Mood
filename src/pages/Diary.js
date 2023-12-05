import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import MyHeader from "../components/common/MyHeader.js";
import MyButton from "../components/common/MyButton.js";
import { DiaryStateContext } from "../App";
import { getStringDate } from "../util/date.js";
import {emotionList} from "../util/emotion.js";

const Diary = () => {
    const { id } = useParams();
    const [data, setData] = useState();
    const diaryList = useContext(DiaryStateContext);
    const navigate = useNavigate();

    useEffect(() => {
        const titleElement = document.getElementsByTagName('title')[0];
        titleElement.innerHTML = `감정 일기장 - 그 날의 기록`;
    }, []);

    useEffect(() => {
        if (diaryList.length >= 1) {
            const targetDiary = diaryList.find(
                (it) => parseInt(it.id) === parseInt(id)
            );
            if (targetDiary) {
                setData(targetDiary);
                console.log(data);
            } else {
                alert("없는 일기입니다.");
                navigate("/", { replace: true });
            }
        }
    }, [id, diaryList]);

    if (!data) {
        return <div className="DiaryPage">로딩중입니다...</div>;
    } else {
        const curEmotionList = emotionList.find((it) => parseInt(it.emotion_id) === parseInt(data.emotion));

        return (
            <div className="DiaryPage">
                <div id="main_header">
                    <MyHeader
                        headText={`${getStringDate(new Date(data.date))} 기록`}
                        leftChild={
                            <MyButton
                                text={"< 뒤로가기"}
                                onClick={() => navigate(-1)}
                            />
                        }
                        rightChild={
                            <MyButton
                                text={"수정하기"}
                                onClick={() => navigate(`/edit/${data.id}`)}
                            />
                        }
                    />
                </div>
                <div id="mobile_header">
                    <MyHeader
                        headText={`${getStringDate(new Date(data.date))} 기록`}
                        leftChild={
                            <MyButton
                                text={"<"}
                                onClick={() => navigate(-1)}
                            />
                        }
                        rightChild={
                            <MyButton
                                text={"수정"}
                                onClick={() => navigate(`/edit/${data.id}`)}
                            />
                        }
                    />
                </div>
                <article>
                    <section>
                        <h4>오늘의 감정</h4>
                        <div className={["diary_img_wrapper", `diary_img_wrapper_${data.emotion}`].join(" ")}>
                            <img src={curEmotionList.emotion_img} />
                            <div className="emotion_descript">{curEmotionList.emotion_descript}</div>
                        </div>
                    </section>
                    <section>
                        <h4>오늘의 일기</h4>
                        <div className="diary_content_wrapper">
                            <p>{data.content}</p>
                        </div>
                    </section>
                </article>
            </div>
        );
    }
};

export default Diary;

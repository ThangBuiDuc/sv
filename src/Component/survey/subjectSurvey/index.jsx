import style from "./index.module.css";
import { useState, useLayoutEffect, useEffect } from "react";
import ReactLoading from "react-loading";
import Survey from "./sub/Index";

export default function SubjectSurvey() {
  const [present, setPresent] = useState(null);
  const [inited, setInited] = useState("first");
  // const [toggle , setToggle] = useState(false)

  useLayoutEffect(() => {
    const callApi = async () => {
      await fetch("https://edumnghpu.hasura.app/api/rest/present")
        .then((res) => res.json())
        .then((res) => {
          if (res.hientai.length > 0) setPresent(res.hientai[0]);
        });
    };

    callApi();
  }, []);

  useEffect(() => {
    const callApi = async () => {
      await fetch(
        `https://edu-survey.hasura.app/api/rest/check-init/${present.hocky}/${present.manamhoc}`
      )
        .then((res) => res.json())
        .then((res) => {
          // console.log(res);
          if (res.result) setInited(res.result[0].result);
        });
    };

    if (present) callApi();
  }, [present]);
  // console.log(inited)

  return (
    <div className={style.wrap}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2 style={{ color: "#0083C2" }}>
          Phản hồi ý kiến về công tác giảng dạy
        </h2>
      </div>
      {inited === "first" ? (
        <ReactLoading
          type="spin"
          color="#0083C2"
          width={"50px"}
          height={"50px"}
          className={style.loading}
        />
      ) : inited === true ? (
        <Survey hocky={present.hocky} namhoc={present.manamhoc} />
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h3>Chưa mở đợt phản hồi của kỳ hiện tại</h3>
        </div>
      )}
    </div>
  );
}

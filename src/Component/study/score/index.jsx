import style from "./index.module.css";
import SemesterTable from "./semesterTable";
import AllScoreTable from "./allScoreTable";
import { useState } from "react";

const datatest = {
  bangdiem: ["Bảng điểm trong học kỳ", "Bảng điểm toàn khóa "],
};

function Score() {
  // const [show, setShow]= useState(false)
  const [option, SetOption] = useState(0);
  const show = () => {
    switch (option) {
      case 0: {
        return <SemesterTable />;
      }
      case 1: {
        return <AllScoreTable />;
      }

      default: {
        return <></>;
      }
    }
  };

  return (
    <div className={style.wrap}>
      {/* <div style={{display:'flex',justifyContent:'center'}}><h2 style={{color:'#0083C2'}}>Hoàng ngu</h2></div> */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2 style={{ color: "#0083C2" }}>Điểm học tập</h2>
      </div>
      <div className={style.container}>
        <div className={style.nhxhk}>
          <div className={style.bangdiem}>
            <select
              name="optionbangdiem"
              className={style.select}
              defaultValue={datatest.bangdiem[option]}
              onChange={(e) => {
                SetOption(e.target.selectedIndex);
              }}
            >
              {datatest.bangdiem.map((item, index) => {
                return (
                  <option key={index} style={{ textAlign: "center" }}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      {show()}
    </div>
  );
}

export default Score;

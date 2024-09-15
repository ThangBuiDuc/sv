import style from "./contentMobile.module.css";

import { BsPencilSquare } from "react-icons/bs";

export default function Index({ data, setDataPass }) {
  //   console.log(data);

  return (
    <div className={style.wrap}>
      <div className={style.box}>
        <div className={style.info}>
          <h3 style={{ width: "70%" }}>{data.sv.fullname}</h3>
          <h4 style={{ width: "30%" }}>{data.student_code}</h4>
        </div>

        <div className={style.point}>
          <h4 style={{ width: "70%" }}>Tự đánh giá:</h4>
          <span>
            {data.total_self_point ? `${data.total_self_point}` : "..."}
          </span>
        </div>

        <div className={style.point}>
          <h4 style={{ width: "70%" }}>Cán bộ lớp:</h4>
          <span>
            {data.total_monitor_point ? `${data.total_monitor_point}` : "..."}
          </span>
        </div>

        <div className={style.point}>
          <h4 style={{ width: "70%" }}>Quản lý sinh viên:</h4>
          <span>
            {data.total_staff_point ? `${data.total_staff_point}` : "..."}
          </span>
        </div>
      </div>
      {data.total_self_point && !data.total_monitor_point ? (
        <button
          className={style.btn}
          style={{
            // padding: "5px",
            cursor: "pointer",
            alignSelf: "center",
            width: "20%",
          }}
          onClick={() =>
            setDataPass((pre) => {
              return {
                toggle: !pre.toggle,
                data,
              };
            })
          }
        >
          <BsPencilSquare size={25} />
        </button>
      ) : (
        <button
          disabled
          className={style.btn}
          style={{
            // padding: "5px",
            cursor: "not-allowed",
            alignSelf: "center",
            width: "20%",
          }}
        >
          <BsPencilSquare size={25} />
        </button>
      )}
    </div>
  );
}

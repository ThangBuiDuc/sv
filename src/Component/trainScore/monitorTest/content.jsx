import style from "./index.module.css";

export default function Index({ data, setDataPass }) {
  //   console.log(data);

  return (
    <div className={style.class} style={{ display: "flex", borderTop: "solid 1px rgba(0, 0, 0, 0.1)" }}>
      <div style={{ width: "30%" }}>
        <h3>{data.sv.fullname}</h3>
        <h4>{data.student_code}</h4>
      </div>
      <div className={style.point} style={{ width: "20%" }}>
        <h3>Cá nhân:</h3>
        <h4>
          {data.total_self_point ? `${data.total_self_point}` : "..."}
        </h4>
      </div>
      <div style={{ width: "20%" }}>
        <h3>Cán bộ lớp:</h3>
        <h4>
          {data.total_monitor_point
            ? `${data.total_monitor_point}`
            : "..."}
        </h4>
      </div>
      <div className={style.point} style={{ width: "20%" }}>
        <h3>QLSV:</h3>
        <h4>
          {data.total_staff_point ? `${data.total_staff_point}` : "..."}
        </h4>
      </div>
      {data.total_self_point && !data.total_monitor_point ? (
        <button
          className={style.btn}
          style={{
            padding: "5px",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            cursor: "pointer",
            alignSelf: "center",
            width: "10%",
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
          Đánh giá
        </button>
      ) : (
        <button
          disabled
          className={style.btn}
          style={{
            padding: "5px",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            cursor: "not-allowed",
            alignSelf: "center",
            width: "10%",
          }}
        >
          Đánh giá
        </button>
      )}
    </div>
  );
}

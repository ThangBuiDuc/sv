import style from "./index.module.css";
import Table from "./table";

function Warning() {
  return (
    <div className={style.wrap}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2 style={{ color: "#0083C2" }}>Cảnh báo học vụ</h2>
      </div>
      <Table />
    </div>
  );
}

export default Warning;

import style from "./index.module.css";
import Table from "./table";

export default function Index() {
  return (
    <div className={style.wrap}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2 style={{ color: "#0083C2" }}>Các môn học đã đăng ký</h2>
      </div>
      <Table />
    </div>
  );
}

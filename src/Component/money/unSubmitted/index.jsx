import style from "./index.module.css";
// import Table from "./table";
import Content from "./content";

function UnSubmitted() {
  return (
    <div className={style.wrap}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2 className={style.title} style={{ color: "#0083C2" }}>
          Các khoản còn thiếu trong học kỳ
        </h2>
      </div>
      {/* <Table /> */}
      <Content />
    </div>
  );
}

export default UnSubmitted;

import style from "./style.module.css";

export default function ToanKhoa({ data }) {
  return (
    <div className={style.toankhoa}>
      <h3 style={{ color: "#0083c2" }}>Điểm trung bình toàn khoá</h3>
      <div>
        <p>
          <span style={{ fontWeight: "bold" }}>Điểm 10:&nbsp;</span>
          {data[0].diem10}
        </p>

        <p>
          <span style={{ fontWeight: "bold" }}>Xếp loại 10:&nbsp;</span>
          {data[0].xeploai10}
        </p>

        <p>
          <span style={{ fontWeight: "bold" }}>Điểm 4:&nbsp;</span>
          {data[0].diem4}
        </p>

        <p>
          <span style={{ fontWeight: "bold" }}>Xếp loại 4:&nbsp;</span>
          {data[0].xeploai4}
        </p>
      </div>
    </div>
  );
}

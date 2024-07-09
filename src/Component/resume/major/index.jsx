import { useState, useLayoutEffect } from "react";
import style from "./index.module.css";
import ReactLoading from "react-loading";
import { useAuth, useUser } from "@clerk/clerk-react";

function Major() {
  const [data, setData] = useState(null);
  const { getToken } = useAuth();
  const { user } = useUser();

  useLayoutEffect(() => {
    const fetchData = async () => {
      await fetch(
        `${import.meta.env.VITE_APP_MAJOR_API}${user.publicMetadata.masv}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${await getToken({
              template: import.meta.env.VITE_APP_EDUMNG_TEMPLATE,
            })}`,
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setData(res.nganh.length > 0 ? res.nganh[0] : []);
        });
    };
    fetchData();
  }, []);

  return (
    <div className={style.major}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ color: "#0083C2" }}>Ngành học</h2>
      </div>
      {data ? (
        <>
          <div className={style.line}>
            <div className={style.lineItem}>
              <label style={{ fontWeight: "bold" }}>Hệ đào tạo</label>
              <label className={style.labelContent}>
                {data ? data.tenhedaotao : "Null"}
              </label>
            </div>
            <div className={style.lineItem}>
              <label style={{ fontWeight: "bold" }}>Chuyên ngành</label>
              <label className={style.labelContent}>
                {data ? data.tennganh : "Null"}
              </label>
            </div>
            <div className={style.lineItem}>
              <label style={{ fontWeight: "bold" }}>Khóa</label>
              <label className={style.labelContent}>
                {data ? data.tenkhoahoc : "Null"}
              </label>
            </div>
            <div className={style.lineItem}>
              <label style={{ fontWeight: "bold" }}>Tình trạng</label>
              <label className={style.labelContent}>
                {data
                  ? data.tinhtrang.charAt(0).toUpperCase() +
                    data.tinhtrang.slice(1)
                  : "Null"}
              </label>
            </div>
          </div>

          <div className={style.line1}>
            <div className={style.lineItem2}>
              <label style={{ fontWeight: "bold" }}>Lớp</label>
              <label className={style.labelContent}>
                {data ? data.malop : "Null"}
              </label>
            </div>
            {/* <div className={style.lineItem2}>
                    <label style={{fontWeight: 'bold'}}>Năm nhập trường</label>
                    <label className={style.labelContent}>{data?data.namnhaptrg:''}</label>
                </div> */}
          </div>
          {/* <div className={style.containerBtn}>
                <button className={style.btn}>Lưu</button>
                <button className={style.btn}>In</button>
            </div> */}
        </>
      ) : (
        <ReactLoading
          type="spin"
          color="#0083C2"
          width={"50px"}
          height={"50px"}
          className={style.loading}
        />
      )}
    </div>
  );
}

export default Major;

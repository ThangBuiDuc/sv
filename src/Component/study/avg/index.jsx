import { useAuth, useUser } from "@clerk/clerk-react";
import style from "./style.module.css";
import { useState, useLayoutEffect } from "react";
import ToanKhoa from "./toankhoa";
import ReactLoading from "react-loading";
import HocKy from "./hocky";

export default function AVG() {
  const [data, setData] = useState(null);
  const { getToken } = useAuth();
  const { user } = useUser();

  useLayoutEffect(() => {
    const fetchData = async () => {
      await fetch(
        `${import.meta.env.VITE_APP_AVG_API}${user.publicMetadata.masv}`,
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
          setData(res.toan_khoa.length > 0 ? res : []);
        });
    };
    fetchData();
  }, []);

  return (
    <div className={style.wrap}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2 style={{ color: "#0083C2" }}>Điểm tổng kết</h2>
      </div>
      {data ? (
        data.toan_khoa.length > 0 ? (
          <>
            <ToanKhoa data={data.toan_khoa} />
            <HocKy
              lan={1}
              data={data.hk_lan_1.map((item, index) => {
                item.stt = index + 1;
                return item;
              })}
            />
            <HocKy
              lan={2}
              data={data.hk_lan_2.map((item, index) => {
                item.stt = index + 1;
                return item;
              })}
            />
          </>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h3>Chưa có dữ liệu</h3>
          </div>
        )
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

import { useAuth, useUser } from "@clerk/clerk-react";
import style from "./index.module.css";
import { useState, useLayoutEffect } from "react";
import ReactLoading from "react-loading";

function Paper() {
  const [data, setData] = useState(null);
  const { getToken } = useAuth();
  const { user } = useUser();
  useLayoutEffect(() => {
    const fetchData = async () => {
      await fetch(
        `${import.meta.env.VITE_APP_PAPER_API}${user.publicMetadata.masv}`,
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
          res.giay_to.length > 0 ? setData(res.giay_to) : setData([]);
        });
    };
    fetchData();
  }, []);

  return data ? (
    <div className={style.wrapPaper}>
      <div className={style.danop}>
        <h2 className={style.line}>Các loại giấy tờ đã nộp</h2>
        {data.length > 0 ? (
          data
            .filter((item) => item.trangthai === "đã nộp")
            .map((item, index) => {
              return (
                <li key={index} className={style.line2}>
                  {item.tengiayto} -{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {item.ban.charAt(0).toUpperCase() + item.ban.slice(1)}
                  </span>
                </li>
              );
            })
        ) : (
          <p>Chưa có thông tin</p>
        )}
      </div>
      <div className={style.chuanop}>
        <h2 className={style.line}>Các loại giấy tờ còn thiếu</h2>
        {data.length > 0 ? (
          data
            .filter((item) => item.trangthai === "chưa nộp")
            .map((item, index) => {
              return (
                <li key={index} className={style.line2}>
                  {item.tengiayto} -{" "}
                  <span style={{ fontWeight: "bold" }}>
                    {item.ban.charAt(0).toUpperCase() + item.ban.slice(1)}
                  </span>
                </li>
              );
            })
        ) : (
          <p>Chưa có thông tin</p>
        )}
      </div>
      {/* <div>
        <button className={style.bn}>In</button>
      </div> */}
    </div>
  ) : (
    <div className={style.wrapPaper} style={{ justifyContent: "unset" }}>
      <ReactLoading
        type="spin"
        color="#0083C2"
        width={"50px"}
        height={"50px"}
        className={style.loading}
      />
    </div>
  );
}

export default Paper;

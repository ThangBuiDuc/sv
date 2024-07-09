import { useState } from "react";
import style from "./index.module.css";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import Table from "./table";
import ReactLoading from "react-loading";

const select = [
  {
    title: "Lịch thi lần 1",
    value: 1,
  },
  {
    title: "Lịch thi lần 2",
    value: 2,
  },
];

function CalendarTest() {
  const [status, setStatus] = useState(1);
  const [present, setPresent] = useState(null);
  const [data, setData] = useState(null);
  const { getToken } = useAuth();
  useEffect(() => {
    let callApi = async () => {
      await fetch(`${import.meta.env.VITE_APP_PRESENT_API}`)
        .then((res) => res.json())
        .then((res) => setPresent(res.hientai[0]));
    };

    callApi();
  }, []);

  useEffect(() => {
    let callApi = async () => {
      if (present.hocky == 1) {
        if (status == 1) {
          await fetch(
            `${import.meta.env.VITE_APP_CALENDAT_TEST1}${
              present.manamhoc
            }/${status}`,
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
            .then((res) =>
              setData(res.result.length > 0 ? res.result : "empty")
            );
        }

        if (status == 2) {
          await fetch(
            `${import.meta.env.VITE_APP_CALENDAT_TEST1}${
              present.manamhoc
            }/${status}`,
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
            .then((res) =>
              setData(res.result.length > 0 ? res.result : "empty")
            );
        }
      }

      if (present.hocky == 2) {
        if (status == 1) {
          await fetch(
            `${import.meta.env.VITE_APP_CALENDAT_TEST2}${
              present.manamhoc
            }/${status}`,
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
            .then((res) =>
              setData(res.result.length > 0 ? res.result : "empty")
            );
        }

        if (status == 2) {
          await fetch(
            `${import.meta.env.VITE_APP_CALENDAT_TEST2}${
              present.manamhoc
            }/${status}`,
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
            .then((res) =>
              setData(res.result.length > 0 ? res.result : "empty")
            );
        }
      }
    };

    if (present) {
      callApi();
    }
  }, [status, present]);

  return (
    <div className={style.wrapTest} style={{ gap: "50px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2 style={{ color: "#0083C2" }}>Lịch thi học kỳ</h2>
      </div>
      <select
        className={style.select}
        style={{
          width: "fit-content",
          marginTop: "20px",
          color: "#0083C2",
          fontSize: "16px",
          borderRadius: "15px",
          padding: "2px",
        }}
        onChange={(e) => {
          setData(null);
          setStatus(e.target[e.target.selectedIndex].value);
        }}
      >
        {select.map((item, index) => (
          <option value={item.value} key={index}>
            {item.title}
          </option>
        ))}
      </select>
      {data ? (
        data === "empty" ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h3>
              Sinh viên chưa có lịch thi lần {status} trong học kỳ hoặc chưa cập
              nhật dữ liệu.
            </h3>
          </div>
        ) : (
          <Table data={data} />
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

export default CalendarTest;

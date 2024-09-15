import { useLayoutEffect, useState } from "react";
import style from "./index.module.css";
import { useAuth } from "@clerk/clerk-react";
import ReactLoading from "react-loading";
import Table from "./table";
import TableMobile from "./tableMobile";
import { useEffect } from "react";
// import TableAfter from "./tableAfter";
export default function Index() {
  const [width, setWidth] = useState(window.innerWidth);
  const { getToken } = useAuth();
  const [batch, setBatch] = useState(null);
  const [data, setData] = useState(null);
  const [invalidate, setInvalidate] = useState(false);

  useEffect(() => {
    const handleResize = (e) => {
      setWidth(e.target.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useLayoutEffect(() => {
    let callApi = async () => {
      await fetch(process.env.REACT_APP_REN_LUYEN_BATCH)
        .then((res) => res.json())
        .then((res) => setBatch(res.result[0]));
    };

    callApi();
  }, []);

  useLayoutEffect(() => {
    let callApi = async () => {
      await fetch(`${process.env.REACT_APP_REN_LUYEN_SELF}${batch?.id}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${await getToken({
            template: process.env.REACT_APP_REN_LUYEN_SV,
          })}`,
        },
      })
        .then((res) => res.json())
        .then((res) => setData(res.result[0]));
    };

    if (batch) callApi();
  }, [batch, invalidate]);

  return (
    <div className={style.wrap}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2 style={{ color: "#0083C2" }}>Tự đánh giá</h2>
      </div>
      {/* {data ? (
        data.total_self_point ? (
          <TableAfter
            group={data.group_point
              .map((item) => {
                let object = Object.assign({}, item);
                delete object.group_question;
                let question = item.group_question.question
                  .map((item) => {
                    return {
                      id: item.id,
                      name: item.detail_question.name,
                      max_point: item.detail_question.max_point,
                      position: item.detail_question.position,
                      self_point: item.question_point.point,
                      monitor_point: null,
                      staff_point: null,
                    };
                  })
                  .sort((a, b) => a.position - b.position);

                return {
                  self_point: null,
                  ...object,
                  ...item.group_question,
                  question,
                };
              })
              .sort((a, b) => a.position - b.position)}
          />
        ) : (
          <Table
            group={data.group_point
              .map((item) => {
                let object = Object.assign({}, item);
                delete object.group_question;
                let question = item.group_question.question
                  .map((item) => {
                    return {
                      id: item.id,
                      name: item.detail_question.name,
                      max_point: item.detail_question.max_point,
                      position: item.detail_question.position,
                      self_point: item.question_point.point,
                      monitor_point: null,
                      staff_point: null,
                    };
                  })
                  .sort((a, b) => a.position - b.position);

                return {
                  self_point: null,
                  ...object,
                  ...item.group_question,
                  question,
                };
              })
              .sort((a, b) => a.position - b.position)}
            batch={batch}
            setAfterData={setData}
            setInvalidate={setInvalidate}
          />
        ) */}
      {data ? (
        <>
          {data.total_self_point ||
          data.total_monitor_point ||
          data.total_staff_point ? (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <p>
                Điểm sinh viên tự đánh giá:{" "}
                <span style={{ fontWeight: "bold" }}>
                  {data.total_self_point ? data.total_self_point : "..."}
                </span>
              </p>
              <p>
                Điểm cán bộ lớp đánh giá:{" "}
                <span style={{ fontWeight: "bold" }}>
                  {data.total_monitor_point ? data.total_monitor_point : "..."}
                </span>
              </p>
              <p>
                Điểm QLSV đánh giá:{" "}
                <span style={{ fontWeight: "bold" }}>
                  {data.total_staff_point ? data.total_staff_point : "..."}
                </span>
              </p>
              <p>
                Điểm trừ:{" "}
                <span style={{ fontWeight: "bold" }}>
                  {data.total_sub_point ? data.total_sub_point : "..."}
                </span>
              </p>
              <p>
                Điểm cộng:{" "}
                <span style={{ fontWeight: "bold" }}>
                  {data.total_add_point ? data.total_add_point : "..."}
                </span>
              </p>
              <p>
                Điểm tổng:{" "}
                <span style={{ fontWeight: "bold" }}>
                  {data.total_accepted_point
                    ? data.total_accepted_point
                    : "..."}
                </span>
              </p>
            </div>
          ) : (
            <></>
          )}
          {width < 760 ? (
            <TableMobile
              group={data.group_point
                .map((item) => {
                  let object = Object.assign({}, item);
                  delete object.group_question;
                  let question = item.group_question.question
                    .map((item) => {
                      return {
                        id: item.id,
                        name: item.detail_question.name,
                        max_point: item.detail_question.max_point,
                        position: item.detail_question.position,
                        self_point: item.question_point.point,
                        monitor_point: null,
                        staff_point: null,
                      };
                    })
                    .sort((a, b) => a.position - b.position);

                  return {
                    self_point: null,
                    ...object,
                    ...item.group_question,
                    question,
                  };
                })
                .sort((a, b) => a.position - b.position)}
              batch={batch}
              setAfterData={setData}
              setInvalidate={setInvalidate}
              total_self_point={data ? data.total_self_point : null}
              total_staff_point={data ? data.total_staff_point : null}
            />
          ) : (
            <Table
              total_self_point={data ? data.total_self_point : null}
              total_staff_point={data ? data.total_staff_point : null}
              group={data.group_point
                .map((item) => {
                  let object = Object.assign({}, item);
                  delete object.group_question;
                  let question = item.group_question.question
                    .map((item) => {
                      return {
                        id: item.id,
                        name: item.detail_question.name,
                        max_point: item.detail_question.max_point,
                        position: item.detail_question.position,
                        self_point: item.question_point[0].point,
                        monitor_point: null,
                        staff_point: null,
                      };
                    })
                    .sort((a, b) => a.position - b.position);

                  return {
                    self_point: null,
                    ...object,
                    ...item.group_question,
                    question,
                  };
                })
                .sort((a, b) => a.position - b.position)}
              batch={batch}
              setAfterData={setData}
              setInvalidate={setInvalidate}
            />
          )}
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

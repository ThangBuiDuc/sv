import style from "../index.module.css";
import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import { useAuth, useUser } from "@clerk/clerk-react";
import SubIndex from "./subIndex";

export default function Index({ hocky, namhoc }) {
  const [data, setData] = useState(null);
  const [dataSent, setDataSent] = useState(null);
  const [toggle, setToggle] = useState(false);
  const { getToken } = useAuth();
  const { user } = useUser();

  const handleOnClick = (
    subject_code,
    class_code,
    teacher_name,
    class_name,
    hoc_vi
  ) => {
    setDataSent({
      subject_code,
      hocky,
      namhoc,
      class_code,
      teacher_name,
      class_name,
      hoc_vi,
    });
    setToggle(true);
  };

  useEffect(() => {
    const callApi = async () => {
      await fetch(
        `https://edu-survey.hasura.app/api/rest/status-survey/${user.publicMetadata.masv}/${hocky}/${namhoc}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${await getToken({
              template: import.meta.env.VITE_APP_HASURA_SURVEY,
            })}`,
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.result.length > 0) setData(res.result);
          else setData([]);
        });
    };

    callApi();
  }, [toggle]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      {toggle ? (
        <SubIndex
          data={dataSent}
          setToggle={setToggle}
          user={user}
          getToken={getToken}
          rootData={data}
        />
      ) : data ? (
        data.length > 0 ? (
          <>
            <h3
              style={{ textAlign: "center", margin: 0, padding: 0 }}
              className={style.subTitle}
            >
              Danh sách các môn học phản hồi trong kỳ
            </h3>
            {data ? (
              <div
                style={{
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "40px",
                }}
              >
                {data.map((item, index) => {
                  return (
                    <div key={index} className={style.subject}>
                      {/* <div style={{ display: "flex" , justifyContent : 'space-between' }}> */}
                      <p
                        className={style.connectText}
                        style={{ padding: "5px", width: "25%" }}
                      >
                        {item.class_name}
                      </p>
                      <p
                        className={style.connectText}
                        style={{
                          padding: "5px",
                          width: "25%",
                          textAlign: "center",
                        }}
                      >
                        {item.teacher_name}
                      </p>
                      <p
                        style={{
                          fontWeight: "bold",
                          color: `${item.status ? "#11B03E" : "red"}`,
                          padding: "5px",
                          width: "25%",
                          textAlign: "center",
                        }}
                      >
                        {item.status ? "Chưa phản hồi!" : "Đã đánh giá!"}
                      </p>
                      {item.status ? (
                        <p
                          style={{
                            fontWeight: "bold",
                            color: `${item.status ? "#11B03E" : "red"}`,
                            padding: "5px",
                            width: "25%",
                            textAlign: "center",
                          }}
                        >
                          {item.respond_result}/5
                        </p>
                      ) : (
                        <div
                          style={{
                            width: "25%",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <button
                            style={{
                              padding: "5px",
                              border: "1px solid rgba(0, 0, 0, 0.1)",
                              borderRadius: "10px",
                              cursor: "pointer",
                              height: "fit-content",
                            }}
                            onClick={() => {
                              handleOnClick(
                                item.subject_code,
                                item.class_code,
                                item.teacher_name,
                                item.class_name,
                                item.hoc_vi
                              );
                            }}
                          >
                            Phản hồi
                          </button>
                        </div>
                      )}
                      {/* </div> */}
                      {/* <div>

                    </div> */}
                    </div>
                  );
                })}
              </div>
            ) : (
              <ReactLoading
                type="spin"
                color="#0083C2"
                width={"50px"}
                height={"50px"}
                className={style.loading}
              />
            )}
          </>
        ) : (
          <h3 style={{ textAlign: "center", margin: 0, padding: 0 }}>
            Sinh viên không thuộc diện được đánh giá
          </h3>
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

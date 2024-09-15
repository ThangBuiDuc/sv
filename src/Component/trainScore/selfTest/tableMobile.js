import { useState, useEffect } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import style from "./index.module.css";
import { useAuth, useUser } from "@clerk/clerk-react";
import Swal from "sweetalert2";

function GroupQuestion({
  item,
  index,
  setData,
  total_self_point,
  total_staff_point,
  tbhk1,
}) {
  const [active, setActive] = useState(true);

  return (
    <div>
      <div>
        <div className={style.groupName} onClick={() => setActive(!active)}>
          <p>
            {`${item.name} ( Tối đa ${item.max_point} điểm).`}
            <AiOutlineCaretDown
              className={`${style.iconDow} ${active && style.active}`}
            />
          </p>
          {item ? (
            <>
              {item.monitor_point || item.staff_point || item.self_point ? (
                <div className={style.viewPoint}>
                  <p>
                    SV: <span>{item.self_point ? item.self_point : "..."}</span>
                  </p>
                  <p>
                    CBL:{" "}
                    <span>
                      {item.monitor_point ? item.monitor_point : "..."}
                    </span>
                  </p>
                  <p>
                    QLSV:{" "}
                    <span>{item.staff_point ? item.staff_point : "..."}</span>
                  </p>
                </div>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
          {/* <div>
            <p>{item.monitor_point}</p>
            <p>{item.staff_point}</p>
          </div> */}
        </div>
        <div>
          {item.question.map((questionItem, i) => {
            return (
              <div
                key={i}
                className={`${style.question} ${active && style.active}`}
              >
                {index === 0 && i === 1 ? (
                  <>
                    {" "}
                    <p className={style.questionName}>
                      {questionItem.name}
                      {tbhk1 ? (
                        tbhk1 === "empty" ? (
                          ""
                        ) : (
                          <span style={{ fontWeight: "bold" }}>
                            &nbsp;---&nbsp;{tbhk1.diem4}
                          </span>
                        )
                      ) : (
                        ". . ."
                      )}
                    </p>
                    <ul>
                      <li>
                        Có điểm trung bình chung học tập từ 3.6 trở lên =&gt; 05
                        điểm
                      </li>
                      <li>
                        Có điểm trung bình chung học tập từ 3.2 đến 3.59 =&gt;
                        04 điểm
                      </li>
                      <li>
                        Có điểm trung bình chung học tập từ 2.5 đến 3.19 =&gt;
                        03 điểm
                      </li>
                      <li>
                        Có điểm trung bình chung học tập từ 2.0 đến 2.49 =&gt;
                        02 điểm
                      </li>
                      <li>
                        Có điểm trung bình chung học tập dưới 2.0 =&gt; 0 điểm
                      </li>
                    </ul>
                  </>
                ) : (
                  <p className={style.questionName}>{questionItem.name}</p>
                )}
                <div className={style.groupInput}>
                  <p className={style.sv}>
                    Điểm{" "}
                    {total_self_point
                      ? ""
                      : `(Tối đa ${questionItem.max_point} điểm)`}
                    :{" "}
                  </p>
                  {total_self_point || total_staff_point ? (
                    <p className={style.sv}>{questionItem.self_point}</p>
                  ) : (
                    <input
                      style={{ width: "50px" }}
                      type="number"
                      value={
                        typeof questionItem.self_point === "number"
                          ? questionItem.self_point
                          : ""
                      }
                      onWheel={(e) => e.target.blur()}
                      onKeyDown={(e) => {
                        if (
                          e.key !== "Backspace" &&
                          (e.key < "0" || e.key > "9")
                        ) {
                          e.preventDefault();
                        }
                      }}
                      onChange={(e) => {
                        const re = /^[0-9\b]+$/;
                        // console.log(e.target.value);
                        let number = parseInt(e.target.value, 10);

                        setData((pre) =>
                          pre.map((el, idx) => {
                            return idx === index
                              ? {
                                  ...el,
                                  question: el.question.map((el1, idx1) =>
                                    idx1 === i
                                      ? {
                                          ...el1,
                                          self_point:
                                            (number === "" ||
                                              re.test(number)) &&
                                            number < 0
                                              ? 0
                                              : number > el1.max_point
                                              ? 0
                                              : number,
                                        }
                                      : el1
                                  ),
                                }
                              : el;
                          })
                        );
                      }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function Index({
  group,
  batch,
  setAfterData,
  setInvalidate,
  total_self_point,
  total_staff_point,
}) {
  const [data, setData] = useState(group);
  const { getToken } = useAuth();
  const { user } = useUser();

  const [tbhk1, setTbhk1] = useState(null);

  useEffect(() => {
    let calApi = async () => {
      await fetch(
        `${process.env.REACT_APP_RL_EDU_TBHK}${user.publicMetadata.masv}/${batch.term}/${batch.school_year}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${await getToken({
              template: process.env.REACT_APP_RL_EDU,
            })}`,
          },
        }
      )
        .then((res) => res.json())
        .then((res) =>
          res.result.length > 0 ? setTbhk1(res.result[0]) : setTbhk1("empty")
        );
    };

    calApi();
  }, []);

  const handleOnclick = () => {
    let check = data.reduce((total, curr) => {
      let data = curr.question.reduce((array, cur) => {
        return [...array, cur];
      }, []);
      return [...total, ...data];
    }, []);

    if (check.some((item) => typeof item.self_point !== "number")) {
      Swal.fire({
        title: "Chưa trả lời hết các câu hỏi!",
        text: "Vui lòng đánh giá điểm cho từng câu hỏi",
        icon: "warning",
      });
    } else {
      Swal.fire({
        title: "Hoàn thành tự đánh giá!",
        text: "Bạn có chắc chắn muốn hoàn thành quá trình tự đánh giá không?",
        icon: "question",
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Huỷ bỏ",
        showLoaderOnConfirm: () => !Swal.isLoading(),
        preConfirm: async () => {
          let result = await fetch(
            process.env.REACT_APP_REN_LUYEN_UPDATE_SELF,
            {
              method: "PUT",
              headers: {
                authorization: `Bearer ${await getToken({
                  template: process.env.REACT_APP_REN_LUYEN_SV,
                })}`,
              },
              body: JSON.stringify({
                updates: check.map((item) => {
                  return {
                    _set: {
                      point: item.self_point,
                      updated_at: new Date(),
                    },
                    where: {
                      student_code: {
                        _eq: user.publicMetadata.masv,
                      },
                      batch_id: {
                        _eq: batch.id,
                      },
                      question_group_id: {
                        _eq: item.id,
                      },
                    },
                  };
                }),
              }),
            }
          )
            .then((res) => res.json())
            .then((res) => res.result);

          if (result.some((item) => item.affected_rows !== 1)) {
            Swal.fire({
              title: "Đã có lỗi xảy ra!",
              text: "Vui lòng liên hệ quản trị mạng để khắc phục sự cố",
              icon: "error",
            });
          } else {
            setAfterData(null);
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            setInvalidate((pre) => !pre);
            Swal.fire({
              title: "Đánh giá thành công!",
              icon: "success",
            });
          }
        },
      });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {data &&
        data.map((item, index) => (
          <GroupQuestion
            key={index}
            item={item}
            setData={setData}
            index={index}
            total_self_point={total_self_point}
            total_staff_point={total_staff_point}
            tbhk1={tbhk1}
          />
        ))}
      {!total_self_point || total_staff_point ? (
        <button
          className={style.btnSubmit}
          style={{
            padding: "5px",
            border: "1px solid rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            cursor: "pointer",
            width: "fit-content",
            alignSelf: "center",
            marginTop: "20px",
          }}
          onClick={() => handleOnclick()}
        >
          Hoàn Thành
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

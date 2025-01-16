import style from "../index.module.css";
import { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import { BiArrowBack } from "react-icons/bi";
import RadioCheckBox from "./radioCheckBox";
import Swal from "sweetalert2";

function Convert(string) {
  switch (string) {
    case "Thạc sỹ": {
      string = "ThS";
      break;
    }
    case "Tiến sỹ": {
      string = "TS";
      break;
    }
    case "Cử nhân": {
      string = "CN";
      break;
    }
    case "Kỹ sư": {
      string = "KS";
      break;
    }
    case "Phó giáo sư": {
      string = "PGS";
      break;
    }
    case "Giáo sư": {
      string = "GS";
      break;
    }
    case "Tiến sỹ khoa học": {
      string = "TSKH";
      break;
    }
    default:
      string = "";
  }
  return string;
}

export default function SubIndex({ data, setToggle, user, getToken }) {
  const [preData, setPreData] = useState(null);
  const [comment, setComment] = useState("");
  const [point, setPoint] = useState([]);
  // console.log(point)
  const { subject_code, hocky, namhoc, class_code } = data;

  const handleOnClick = () => {
    if (point.every((item) => item !== null)) {
      Swal.fire({
        title: "Bạn có chắn chắn muốn phản hồi không",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        cancelButtonText: "Huỷ",
        confirmButtonText: "Xác nhận",
        showLoaderOnConfirm: true,
        preConfirm: async () => {
          var updates = [];
          for (let i = 0; i < preData.length; i++) {
            let item = Object.assign({}, preData[i]);
            // console.log(item)
            updates = [
              ...updates,
              {
                _set: { question_point: point[i], updated_at: new Date() },
                where: {
                  namhoc: { _eq: namhoc },
                  question_id: { _eq: item.id },
                  subject_code: { _eq: subject_code },
                  user_code: { _eq: user.publicMetadata.masv },
                  hocky: { _eq: hocky },
                  class_code: {
                    _eq: class_code,
                  },
                },
              },
            ];
          }

          let _set = {
            comment: comment,
            updated_at: new Date(),
          };

          let where = {
            namhoc: { _eq: namhoc },
            subject_code: { _eq: subject_code },
            user_code: { _eq: user.publicMetadata.masv },
            hocky: { _eq: hocky },
            class_code: {
              _eq: class_code,
            },
          };

          const status = await fetch(
            "https://edu-survey.hasura.app/api/rest/update-survey-sv",
            {
              method: "PUT",
              headers: {
                authorization: `Bearer ${await getToken({
                  template: "hasura-survey",
                })}`,
              },
              body: JSON.stringify({ updates, _set, where }),
            }
          ).then((res) => res.status);

          if (status === 200) {
            setToggle(false);
            Swal.fire({
              title: "Cập nhật thành công!",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Cập nhật thất bại",
              icon: "error",
            });
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });
    } else {
      Swal.fire({
        title: "Vui lòng nhập đủ điểm khảo sát",
        icon: "warning",
      });
    }
  };

  useEffect(() => {
    const callApi = async () => {
      await fetch(
        "https://edu-survey.hasura.app/api/rest/list-question-subject",
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${await getToken({
              template: "hasura-survey",
            })}`,
          },
          body: JSON.stringify({
            code: user.publicMetadata.masv,
            sbj_code: subject_code,
            hk: hocky,
            namhoc: namhoc,
            clss_code: class_code,
          }),
        }
      )
        .then((res) => res.json())
        .then((res) => {
          // console.log(res.result)
          setPreData(res.result);
          //   setPoint(new Array(preData.length))
        });
    };

    callApi();
  }, []);
  //   console.log(preData)

  useEffect(() => {
    // console.log("change");
    if (preData) setPoint(new Array(preData.length).fill(null));
  }, [preData]);

  return preData ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingLeft: "20px",
        gap: "20px",
      }}
    >
      <label onClick={() => setToggle(false)} style={{ cursor: "pointer" }}>
        <BiArrowBack size={"40"} />
      </label>
      <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
        <div
          style={{
            flexDirection: "column",
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "20px",
          }}
          className={style.subTitle}
        >
          <p>{data.class_name}</p>
          <p style={{ textAlign: "right", color: "#0083C2" }}>
            {Convert(data.hoc_vi)} {data.teacher_name}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            // border: "1px solid rgba(0, 0, 0, 0.1)",
            // borderRadius: "10px",
            gap: "10px",
            padding: "10px",
          }}
        >
          <p style={{ fontWeight: "bold" }}>Ý kiến riêng</p>
          <textarea
            style={{
              resize: "none",
              padding: "10px",
              borderRadius: "10px",
              border: "1px solid rgba(0, 0, 0, 0.1)",
            }}
            rows="5"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        {preData.map((item, index) => {
          // console.log(item)
          return (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                // border: "1px solid rgba(0, 0, 0, 0.1)",
                // borderRadius: "10px",
                gap: "10px",
                padding: "10px",
              }}
            >
              <p style={{ fontWeight: "bold" }}>
                {index + 1}. {item.content}
              </p>
              <RadioCheckBox
                data={item.description.split("//")}
                index={index}
                point={point}
                setPoint={setPoint}
              />
            </div>
          );
        })}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            style={{
              padding: "5px",
              border: "1px solid rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              cursor: "pointer",
            }}
            onClick={() => {
              handleOnClick();
            }}
          >
            Hoàn thành
          </button>
        </div>
      </div>
    </div>
  ) : (
    <ReactLoading
      type="spin"
      color="#0083C2"
      width={"50px"}
      height={"50px"}
      className={style.loading}
    />
  );
}

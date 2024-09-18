import { useLayoutEffect, useState } from "react";
import style from "./index.module.css";
import ReactLoading from "react-loading";
import Table from "./table";
import {
  LineChart,
  Line,
  Tooltip,
  YAxis,
  XAxis,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useAuth, useUser } from "@clerk/clerk-react";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "5px",
          backgroundColor: "white",
        }}
      >
        <p>{`${payload[0].payload.semester} năm ${payload[0].payload.year}`}</p>
        <p>{`Điểm rèn luyện: ${payload[0].payload.score}`}</p>
      </div>
    );
  }

  return null;
};

function TrainScore() {
  const [data, setData] = useState(null);
  const { getToken } = useAuth();
  const { user } = useUser();

  useLayoutEffect(() => {
    // function interleave(arr, arr2) {
    //   let newArr = [];
    //   for (let i = 0; i < arr.length; i++) {
    //     newArr.push(arr[i], arr2[i]);
    //   }

    //   return newArr.filter((item) => item);
    // }

    const fetchData = async () => {
      await fetch(
        `${process.env.REACT_APP_TRAIN_SCORE_API}${user.publicMetadata.masv}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${await getToken({
              template: process.env.REACT_APP_EDUMNG_TEMPLATE,
            })}`,
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setData(res.train_score.length > 0 ? res.train_score.reverse() : []);
          // let data1, data2;
          // if (res.data.sv_diem_ren_luyen.length > 0) {
          //   data1 = res.data.sv_diem_ren_luyen.filter(
          //     (item) => item.hoc_ky === 1
          //   );
          //   data2 = res.data.sv_diem_ren_luyen.filter(
          //     (item) => item.hoc_ky === 2
          //   );
          //   return setData(interleave(data1, data2));
          // } else return [];
        });
    };
    fetchData();
  }, []);

  return (
    <div className={style.wrap}>
      <>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h2 style={{ color: "#0083C2" }}>Điểm rèn luyện</h2>
        </div>
        {data ? (
          data.length > 0 ? (
            <>
              <Table
                data={data.map((item, index) => {
                  item.stt = index + 1;
                  return item;
                })}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <h3 style={{ color: "#0083C2" }}>Biểu đồ điểm rèn luyện</h3>
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart
                    data={data.map((item) => {
                      return {
                        score: item.diem,
                        year: item.namhoc,
                        semester: `HK: ${item.hocky}`,
                      };
                    })}
                    // margin={{ top: 30, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="1 1" />
                    <XAxis
                      dataKey="semester"
                      xAxisId={0}
                      padding={{ left: 20, right: 40 }}
                      tickMargin={10}
                      interval={0}
                      style={{ fontSize: "14px" }}
                    />
                    <XAxis
                      dataKey="year"
                      xAxisId={1}
                      tickLine={false}
                      axisLine={false}
                      padding={{ left: 20, right: 40 }}
                      interval={0}
                      style={{ fontSize: "14px" }}
                    />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend verticalAlign="top" height={40} />
                    <Line
                      name="Điểm rèn luyện"
                      type="monotone"
                      dataKey="score"
                      stroke="#8884d8"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h3>
                Sinh viên chưa có điểm rèn luyện hoặc chưa cập nhật dữ liệu
              </h3>
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
      </>
    </div>
  );
}

export default TrainScore;

// {data ? (
//   data.length > 0 ? (
//     <>
//       <div style={{ display: "flex", justifyContent: "center" }}>
//         <h2 style={{ color: "#0083C2" }}>Điểm rèn luyện</h2>
//       </div>
//       <Table
//         data={data.map((item, index) => {
//           item.stt = index + 1;
//           return item;
//         })}
//       />
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           flexDirection: "column",
//         }}
//       >
//         <div style={{ display: "flex", justifyContent: "center" }}>
//           <h3 style={{ color: "#0083C2" }}>Biểu đồ điểm rèn luyện</h3>
//         </div>
//         <ResponsiveContainer width="100%" height={400}>
//           <LineChart
//             data={data.map((item) => {
//               return {
//                 score: item.diem,
//                 year: item.nam_hoc,
//                 semester: `HK: ${item.hoc_ky}`,
//               };
//             })}
//             // margin={{ top: 30, right: 30, left: 20, bottom: 5 }}
//           >
//             <CartesianGrid strokeDasharray="1 1" />
//             <XAxis
//               dataKey="semester"
//               xAxisId={0}
//               padding={{ left: 20, right: 40 }}
//               tickMargin={10}
//               interval={0}
//               style={{ fontSize: "14px" }}
//             />
//             <XAxis
//               dataKey="year"
//               xAxisId={1}
//               tickLine={false}
//               axisLine={false}
//               padding={{ left: 20, right: 40 }}
//               interval={0}
//               style={{ fontSize: "14px" }}
//             />
//             <YAxis />
//             <Tooltip content={<CustomTooltip />} />
//             <Legend verticalAlign="top" height={40} />
//             <Line
//               name="Điểm rèn luyện"
//               type="monotone"
//               dataKey="score"
//               stroke="#8884d8"
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </>
//   ) : (
//     <div style={{ display: "flex", justifyContent: "center" }}>
//       <h3>Sinh viên chưa có điểm rèn luyện hoặc chưa cập nhật dữ liệu</h3>
//     </div>
//   )
// ) : (
//   <ReactLoading
//     type="spin"
//     color="#0083C2"
//     width={"50px"}
//     height={"50px"}
//     className={style.loading}
//   />
// )}

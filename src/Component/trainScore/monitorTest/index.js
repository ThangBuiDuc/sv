import { useState, createContext } from "react";
import style from "./index.module.css";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useLayoutEffect } from "react";
import { useEffect } from "react";
import ReactLoading from "react-loading";
import { Fragment } from "react";
import Content from "./content";
import Table from "./table";
import ContentMobile from "./contentMobile";
// import TableMobile from "./tableMobile";

export const SetAfterDataContext = createContext(null);

export default function Index() {
  const [invalidate, setInvalidate] = useState(false);
  const [role, setRole] = useState(null);
  const [batch, setBatch] = useState(null);
  const [data, setData] = useState(null);
  const [dataPass, setDataPass] = useState({ toggle: false, data: null });
  const { getToken } = useAuth();
  const { user } = useUser();
  const [width, setWidth] = useState(window.innerWidth);

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

  useEffect(() => {
    let callApi = async () => {
      await fetch(`${process.env.REACT_APP_REN_LUYEN_ROLE}/${batch?.id}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${await getToken({
            template: process.env.REACT_APP_REN_LUYEN_MONITOR,
          })}`,
        },
      })
        .then((res) => res.json())
        .then((res) => setRole(res.result[0]));
    };

    if (batch) callApi();
  }, [batch]);
  useLayoutEffect(() => {
    let callApi = async () => {
      await fetch(
        `${process.env.REACT_APP_API_REN_LUYEN_MONITOR}${user.publicMetadata.masv}/${batch?.id}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${await getToken({
              template: process.env.REACT_APP_REN_LUYEN_MONITOR,
            })}`,
          },
        }
      )
        .then((res) => res.json())
        .then((res) => setData(res?.result[0]?.enrollment));
    };

    if (batch && role) callApi();
  }, [batch, invalidate, role]);

  //   console.log(data);

  if (role === null) {
    return (
      <div className={style.wrap}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h2 className={style.title} style={{ color: "#0083C2" }}>
            Cán bộ đánh giá
          </h2>
        </div>
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

  if (
    role === undefined ||
    role?.role_id.toString() !== process.env.REACT_APP_REN_LUYEN_MONITOR_ROLE
  ) {
    return (
      <div className={style.wrap}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h2 style={{ color: "#0083C2" }}>Cán bộ đánh giá</h2>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h3>Tài khoản không có quyền cho chức năng này</h3>
        </div>
      </div>
    );
  }

  if (batch === null || data === null) {
    return (
      <div className={style.wrap}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h2 style={{ color: "#0083C2" }}>Cán bộ đánh giá</h2>
        </div>
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
  // console.log(screenWidth);

  return (
    <SetAfterDataContext.Provider value={{ setData, setInvalidate }}>
      <div className={style.wrap}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h2 style={{ color: "#0083C2" }}>Cán bộ lớp đánh giá</h2>
        </div>

        {dataPass.toggle ? (
          <Table
            batch={batch}
            dataPass={dataPass.data}
            setDataPass={setDataPass}
          />
        ) : (
          // <>
          //   {screenWidth <760
          //   ?
          //     <TableMobile
          //       batch={batch}
          //       dataPass={dataPass.data}
          //       setDataPass={setDataPass}
          //     />
          //   :
          //     <Table
          //       batch={batch}
          //       dataPass={dataPass.data}
          //       setDataPass={setDataPass}
          //     />
          //   }
          // </>
          <>
            <div className={style.titleContent}>
              <h3 style={{ width: "30%" }}>Sinh viên</h3>
              <h3 style={{ width: "20%" }}>Điểm tự chấm</h3>
              <h3 style={{ width: "20%" }}>Điểm cán bộ lớp</h3>
              <h3 style={{ width: "20%" }}>Điểm quản lý sinh viên</h3>
            </div>
            {data.map((item, index) => {
              return (
                <Fragment key={index}>
                  {width < 760 ? (
                    <ContentMobile data={item} setDataPass={setDataPass} />
                  ) : (
                    <Content data={item} setDataPass={setDataPass} />
                  )}
                  {/* <Content data={item} setDataPass={setDataPass} /> */}
                </Fragment>
              );
            })}
          </>
        )}
      </div>
    </SetAfterDataContext.Provider>
  );
}

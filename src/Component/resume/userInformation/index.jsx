import { useAuth, useUser } from "@clerk/clerk-react";
import style from "./index.module.css";
import { useState, useLayoutEffect } from "react";
import ReactLoading from "react-loading";

function UserInfor() {
  const [data, setData] = useState(null);
  const { getToken } = useAuth();
  const { user } = useUser();
  useLayoutEffect(() => {
    const fetchData = async () => {
      await fetch(
        `${import.meta.env.VITE_APP_GET_STUDENT_INFOR_API}${
          user.publicMetadata.masv
        }`,
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
          setData(res.tt_sv.length > 0 ? res.tt_sv[0] : []);
        });
    };
    fetchData();
  }, []);

  // console.log(data)

  return (
    <div className={style.wrapUser}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2 style={{ color: "#0083C2" }}>Thông tin cá nhân</h2>
      </div>
      {data ? (
        <div className={style.wrapUserInfor}>
          <div className={style.line}>
            <div className={style.lineItem}>
              <label style={{ fontWeight: "bold" }}>Mã số sinh viên</label>
              <label className={style.labelContent}>
                {data && data.masinhvien ? data.masinhvien : "null"}
              </label>
            </div>

            <div className={style.lineItem}>
              <label style={{ fontWeight: "bold" }}>Họ và tên</label>
              <label className={style.labelContent}>
                {data && data.hoten ? data.hoten : "null"}
              </label>
            </div>

            <div className={style.lineItem}>
              <label style={{ fontWeight: "bold" }}>Ngày sinh</label>
              <label className={style.labelContent}>
                {data && data.ngaysinh
                  ? data.ngaysinh.split("T")[0].split("-").reverse().join("-")
                  : "null"}
              </label>
            </div>

            <div className={style.lineItem}>
              <label style={{ fontWeight: "bold" }}>Giới tính</label>
              <label className={style.labelContent}>
                {data && data.gioitinh ? data.gioitinh : "null"}
              </label>
            </div>
          </div>

          <div className={style.line}>
            <div className={style.lineItem}>
              <label style={{ fontWeight: "bold" }}>Nơi sinh</label>
              <label className={style.labelContent}>
                {data && data.tinh ? data.tinh : "null"}
              </label>
            </div>

            <div className={style.lineItem}>
              <label style={{ fontWeight: "bold" }}>Tôn giáo</label>
              <label className={style.labelContent}>
                {data && data.ton_giao ? data.tongiao : "null"}
              </label>
            </div>

            <div className={style.lineItem}>
              <label style={{ fontWeight: "bold" }}>Quốc tịch</label>
              <label className={style.labelContent}>
                {data && data.nuoc ? data.nuoc : "null"}
              </label>
            </div>

            <div className={style.lineItem}>
              <label style={{ fontWeight: "bold" }}>Dân tộc</label>
              <label className={style.labelContent}>
                {data && data.dantoc ? data.dantoc : "null"}
              </label>
            </div>
          </div>

          <div className={style.line}>
            <div className={style.lineItem}>
              <label style={{ fontWeight: "bold" }}>CCCD</label>
              <label className={style.labelContent}>
                {data && data.so_cmtnd ? data.so_cmtnd : "null"}
              </label>
            </div>

            <div className={style.lineItem}>
              <label style={{ fontWeight: "bold" }}>Thành phần xuất thân</label>
              <label className={style.labelContent}>
                {data && data.thanhphanxuatthan
                  ? data.thanhphanxuatthan
                  : "null"}
              </label>
            </div>

            <div className={style.lineItem}>
              <label style={{ fontWeight: "bold" }}>Ngày vào Đoàn</label>
              <label className={style.labelContent}>
                {data && data.ngayvaodoan ? data.ngayvaodoan : "null"}
              </label>
            </div>

            <div className={style.lineItem}>
              <label style={{ fontWeight: "bold" }}>Ngày vào Đảng</label>
              <label className={style.labelContent}>
                {data && data.ngayvaodangchinhthuc
                  ? data.ngayvaodangchinhthuc
                  : "null"}
              </label>
            </div>
          </div>

          <div className={style.line}>
            <div className={`${style.lineItem} ${style.diachi}`}>
              <label style={{ fontWeight: "bold" }}>Địa chỉ thường trú</label>
              <label className={style.labelContent}>
                {data && data.diachithuongtru ? data.diachithuongtru : "null"}
              </label>
            </div>

            <div className={style.lineItem}>
              <label style={{ fontWeight: "bold" }}>Số điện thoại</label>
              <label className={style.labelContent}>
                {data && data.dienthoai ? data.dienthoai : "null"}
              </label>
            </div>

            <div className={`${style.lineItem} ${style.email}`}>
              <label style={{ fontWeight: "bold" }}>E-mail</label>
              <label className={style.labelContent}>
                {data && data.email ? data.email : "null"}
              </label>
            </div>
          </div>

          <div className={style.line}>
            <div className={`${style.lineItem} ${style.noio}`}>
              <label style={{ fontWeight: "bold" }}>Nơi ở hiện nay</label>
              <label className={style.labelContent}>
                {data && data.diachi ? data.diachi : "null"}
              </label>
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
      )}
    </div>
  );

  // : (
  //   <div className={style.wrapUserInfor} style={{justifyContent:'unset'}}>
  //       <ReactLoading type="spin" color="#0083C2" width={"50px"} height={"50px"} className={style.loading}/>
  //   </div>
  // );
}

export default UserInfor;

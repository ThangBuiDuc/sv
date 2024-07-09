import style from "./index.module.css";
import logo from "../../img/logo.png";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { HiOutlineHome, HiOutlineAnnotation } from "react-icons/hi";
import { TfiAnnouncement } from "react-icons/tfi";
import { StatusMobileNav } from "../../App";
import { useContext } from "react";
import { useClerk, useUser } from "@clerk/clerk-react";

const headerItem = [
  {
    title: "Trang chủ",
    path: "/home",
    icon: <HiOutlineHome />,
  },
  {
    title: "Thông báo",
    path: "/announcement",
    icon: <TfiAnnouncement />,
  },
  {
    title: "Hỏi đáp",
    path: "/qanda",
    icon: <HiOutlineAnnotation />,
  },
  {
    title: "Menu",
    icon: <FaBars />,
  },
];

function Header() {
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const { statusMenu, setStatusMenu } = useContext(StatusMobileNav);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogIn = () => {
    window.location.href = "/sign-in";
  };

  const handleLogOut = () => {
    signOut();
    navigate("/home");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          backgroundColor: "#0083C2",
          height: "90px",
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex" }}>
          <img src={logo} alt="" className={style.imgLogo} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <p className={style.uniName}>
              TRƯỜNG ĐẠI HỌC QUẢN LÝ VÀ CÔNG NGHỆ HẢI PHÒNG
            </p>
            <h2 className={style.title}>CỔNG THÔNG TIN SINH VIÊN</h2>
          </div>
        </div>
        {isSignedIn ? (
          <div className={style.divLog}>
            <img
              src={`${import.meta.env.VITE_APP_AVATAR_URL}${
                user.publicMetadata.masv
              }.jpg`}
              alt="avatar"
              className={style.imgAvatar}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={{ color: "white" }}>{user.publicMetadata.fullname}</p>
              <button
                className={style.btnLog}
                style={{ marginBottom: "0px" }}
                onClick={handleLogOut}
              >
                Đăng xuất
              </button>
            </div>
          </div>
        ) : (
          <button className={style.btnLog} onClick={handleLogIn}>
            Đăng nhập
          </button>
        )}
      </div>
      <div className={style.navBar}>
        {headerItem.map((item, index) => {
          return item.title === "Menu" ? (
            statusMenu ? (
              <div style={{ borderBottom: "5px solid #0083C2" }} key={index}>
                <label
                  htmlFor="modal"
                  className={style.navMobile}
                  id={"navMobile"}
                  style={{ cursor: "pointer" }}
                  // onClick={() => {
                  //   setStatusMenu(!statusMenu);
                  // }}
                >
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {item.icon}
                  </div>
                  <p className="font-semibold">{item.title}</p>
                </label>
              </div>
            ) : (
              <div key={index}>
                <label
                  htmlFor="modal"
                  className={style.navMobile}
                  style={{ cursor: "pointer" }}
                  // onClick={() => {
                  //   setStatusMenu(!statusMenu);
                  // }}
                >
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    {item.icon}
                  </div>
                  <p className="font-semibold">{item.title}</p>
                </label>
              </div>
            )
          ) : "/" + location.pathname.split("/")[1] === item.path &&
            statusMenu === false ? (
            <div style={{ borderBottom: "5px solid #0083C2" }} key={index}>
              <Link
                to={item.path}
                className={style.navLink}
                onClick={() => {
                  // console.log("clicked");
                  document.getElementById("modal").checked = false;
                  setStatusMenu(false);
                  document.body.scrollTop = 0; // For Safari
                  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                  document.body.style.overflow = "unset";
                }}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {item.icon}
                </div>
                <p className="font-semibold">{item.title}</p>
              </Link>
            </div>
          ) : (
            <div key={index}>
              <Link
                to={item.path}
                className={style.navLink}
                onClick={() => {
                  setStatusMenu(false);
                  document.getElementById("modal").checked = false;
                  setStatusMenu(false);
                  document.body.scrollTop = 0; // For Safari
                  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                  document.body.style.overflow = "unset";
                }}
              >
                <div style={{ display: "flex", justifyContent: "center" }}>
                  {item.icon}
                </div>
                <p className="font-semibold">{item.title}</p>
              </Link>
            </div>
          );
        })}
        {/* <label className={style.navMobile}>{<FaBars/>}</label> */}
      </div>
    </div>
  );
}

export default Header;

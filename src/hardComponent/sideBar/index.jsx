import style from "./index.module.css";
import blank_profile from "./blank_profile.png";
import { sideBarData } from "./sideBarData";
import { useNavigate } from "react-router-dom";
import SubMenu from "./subMenu";
import { useRef, useEffect } from "react";
import { StatusMobileNav } from "../../App";
import { useContext } from "react";
import { FaTimes } from "react-icons/fa";
import { useClerk, useUser } from "@clerk/clerk-react";

function SideBar() {
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const ref = useRef();
  const { statusMenu, setStatusMenu } = useContext(StatusMobileNav);

  useEffect(() => {
    let checknav = ref.current;
    const handlechange = (e) => {
      setStatusMenu(!statusMenu);
      e.target.checked
        ? (document.body.style.overflow = "hidden")
        : (document.body.style.overflow = "unset");
    };
    checknav.addEventListener("change", handlechange);
    return () => {
      checknav.removeEventListener("change", handlechange);
    };
  }, [statusMenu]);

  const handleLogIn = () => {
    window.location.href = "/sign-in";
  };

  const handleLogOut = () => {
    signOut();
    navigate("/home");
  };

  return (
    <>
      <input
        ref={ref}
        type={"checkbox"}
        id={"modal"}
        className={style.modal}
        style={{ display: "none" }}
      />
      <label htmlFor="modal" className={style.blur}></label>
      <div className={style.wrapSideBar} id={"wrapsidebar"}>
        {isSignedIn ? (
          <div className={style.divLog}>
            <label
              htmlFor="modal"
              style={{
                position: "absolute",
                right: "10px",
                cursor: "pointer",
                top: "10px",
                fontSize: "30px",
              }}
            >
              {<FaTimes />}
            </label>
            <img
              src={`${
                import.meta.env.VITE_APP_AVATAR_URL
              }${user.username.substring(0, user.username.length - 1)}.jpg`}
              alt="avatar"
              className={style.imgAvatar}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <p style={{ color: "#0083C2" }}>{user.publicMetadata.fullname}</p>
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
          <div className={style.divLog}>
            <label
              htmlFor="modal"
              style={{
                position: "absolute",
                right: "10px",
                cursor: "pointer",
                top: "10px",
                fontSize: "30px",
              }}
            >
              {<FaTimes />}
            </label>
            <img src={blank_profile} alt="avatar" className={style.imgAvatar} />
            <button
              className={style.btnLog}
              style={{ marginBottom: "0px" }}
              onClick={handleLogIn}
            >
              Đăng Nhập
            </button>
          </div>
        )}

        {/* <div style={{display:'flex',flexDirection:'column',justifyContent:'center', marginTop:'20px'}}>
                <img src={avatar} alt="This is avatar student" style={{height:'fit-content', width: 'fit-content', borderRadius:'50%',alignSelf:'center'}}/>
                <p style={{textAlign:'center',alignSelf:'center',width:'95%',color:'#0083C2'}}>Đại học quản lý và công nghệ Hải Phòng</p>
            </div> */}
        {sideBarData.map((item, index) => {
          return <SubMenu item={item} key={index} sidename={index} />;
        })}
      </div>
    </>
  );
}

export default SideBar;

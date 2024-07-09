import style from "./index.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
// import { StatusMobileNav } from "../../App";

function SubMenu({ item, sidename }) {
  let location = useLocation();
  // const { statusMenu, setStatusMenu } = useContext(StatusMobileNav);
  // console.log(location.pathname.split("/"))
  const [subnav, setSubnav] = useState(false);
  const handleOnclick = () => {
    setSubnav(!subnav);
  };

  useEffect(() => {
    if (1) setSubnav(true);
    else if ("/" + location.pathname.split("/")[1] === item.path)
      setSubnav(true);
  }, []);

  return (
    <div className={"sidebar" + sidename}>
      <button onClick={handleOnclick} className={style.rootNavItem}>
        {item.icon} <span style={{ marginLeft: "10px" }}>{item.title}</span>
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "30px",
          marginTop: "10px",
        }}
      >
        {subnav
          ? item.subNav.map((item, index) => {
              return item.path === "/calendar/tkb" ? (
                <a
                  href="/TKB/Index.html"
                  key={index}
                  style={{
                    display: "flex",
                    fontSize: "16px",
                    marginTop: "15px",
                    color: "black",
                    textDecoration: "none",
                  }}
                >
                  {item.icon}
                  <span style={{ marginLeft: "10px" }}>{item.title}</span>
                </a>
              ) : location.pathname === item.path ? (
                <Link
                  onClick={() => {
                    // console.log('clicked')
                    // setStatusMenu(!statusMenu);
                    document.getElementById("modal").checked =
                      !document.getElementById("modal").checked;
                    document.body.scrollTop = 0; // For Safari
                    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                    document.body.style.overflow = "unset";
                  }}
                  key={index}
                  style={{
                    display: "flex",
                    fontSize: "16px",
                    marginTop: "15px",
                    color: "black",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                  to={item.path}
                >
                  {item.icon}
                  <span style={{ marginLeft: "10px" }}>{item.title}</span>
                </Link>
              ) : (
                <Link
                  onClick={() => {
                    // setStatusMenu(!statusMenu);
                    document.getElementById("modal").checked =
                      !document.getElementById("modal").checked;
                    document.body.scrollTop = 0; // For Safari
                    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
                    document.body.style.overflow = "unset";
                  }}
                  key={index}
                  style={{
                    display: "flex",
                    fontSize: "16px",
                    marginTop: "15px",
                    color: "black",
                    textDecoration: "none",
                  }}
                  to={item.path}
                >
                  {item.icon}
                  <span style={{ marginLeft: "10px" }}>{item.title}</span>
                </Link>
              );
            })
          : ""}
      </div>
    </div>
  );
}

export default SubMenu;

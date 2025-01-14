import style from "./index.module.css";
import { useState, useLayoutEffect } from "react";
import noIMG from "../../img/noIMG.png";
import ReactLoading from "react-loading";

function Announcement() {
  const [blog, setBlog] = useState([]);

  useLayoutEffect(() => {
    fetch("/api/announce")
      .then((res) => res.json())
      .then((res) => {
        const reverse = res.data1.articles.reverse();
        setBlog(reverse);
      });
  }, []);

  return (
    <div className={style.wrapper}>
      {blog.length > 0 ? (
        <>
          {(blog.length > 9 ? blog.slice(0, 9) : blog).map((item) => {
            return (
              <div className={style.article}>
                <img src={item.image ? item.image.src : noIMG} alt="" />
                <div style={{ width: "100%" }}>
                  <a
                    href={`https://hpu.edu.vn/blogs/thong-bao/${item.handle}`}
                    style={{ textDecoration: "none" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h3 style={{ color: "#0083C2", width: "90%" }}>
                      {item.title}
                    </h3>
                  </a>
                  <p style={{ width: "90%" }} className={style.des}>
                    {item.meta_description}
                  </p>
                </div>
              </div>
            );
          })}
          {blog.length > 4 ? (
            <a
              href={`https://hpu.edu.vn/blogs/thong-bao`}
              style={{ textAlign: "center" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Xem Tất cả
            </a>
          ) : (
            <></>
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

export default Announcement;

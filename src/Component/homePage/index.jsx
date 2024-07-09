import style from "./index.module.css";
import ImgSlider from "./imageSlider";
import { useLayoutEffect, useState } from "react";
import ReactLoading from "react-loading";
import noIMG from "../../img/noIMG.png";

function HomePage() {
  const [blog, setBlog] = useState([]);

  useLayoutEffect(() => {
    fetch("/api/article")
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        const reverse = res.data1.articles.reverse();
        setBlog(reverse);
      });
  }, []);

  return (
    <div className={style.wrapper}>
      {blog?.length > 0 ? (
        <>
          <ImgSlider />
          <div className={style.wrapArticle}>
            <div className={style.mainArticle0}>
              <img src={blog[0].image ? blog[0].image.src : noIMG} alt="" />
              <div>
                <a
                  href={`https://hpu.edu.vn/blogs/tin-tuc-moi/${blog[0].handle}`}
                  style={{ textDecoration: "none" }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h4 style={{ color: "#0084C2", width: "100%" }}>
                    {blog[0].title}
                  </h4>
                </a>
                <p style={{ width: "100%" }} className={style.des}>
                  {blog[0].meta_description}
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "58%",
              }}
            >
              <div className={style.mainArticle1}>
                <img src={blog[1].image ? blog[1].image.src : noIMG} alt="" />
                <div>
                  <a
                    href={`https://hpu.edu.vn/blogs/tin-tuc-moi/${blog[1].handle}`}
                    style={{ textDecoration: "none" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h4 style={{ color: "#0084C2", width: "100%" }}>
                      {blog[1].title}
                    </h4>
                  </a>
                  <p style={{ width: "100%" }} className={style.des}>
                    {blog[1].meta_description}
                  </p>
                </div>
              </div>

              <div className={style.mainArticle1}>
                <img src={blog[2].image ? blog[2].image.src : noIMG} alt="" />
                <div>
                  <a
                    href={`https://hpu.edu.vn/blogs/tin-tuc-moi/${blog[2].handle}`}
                    style={{ textDecoration: "none" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h4 style={{ color: "#0084C2", width: "100%" }}>
                      {blog[2].title}
                    </h4>
                  </a>
                  <p style={{ width: "100%" }} className={style.des}>
                    {blog[2].meta_description}
                  </p>
                </div>
              </div>
            </div>

            {/* <div className={style.mainArticle0}>fdsfdsf</div>

            <div className={style.subArticle1}>fdsfdsf</div>

            <div className={style.subArticle2}>fdsfdsf</div> */}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
              gap: "20px",
            }}
          >
            {blog.slice(3, 9).map((item, index) => {
              return (
                <div
                  className={style.mainArticle1}
                  key={index}
                  style={{ gap: "2%" }}
                >
                  <img
                    src={item.image ? item.image.src : noIMG}
                    alt=""
                    style={{ maxHeight: "250px" }}
                  />
                  <div style={{ width: "58%", marginLeft: "0" }}>
                    <a
                      href={`https://hpu.edu.vn/blogs/tin-tuc-moi/${item.handle}`}
                      style={{ textDecoration: "none" }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <h4 style={{ color: "#0084C2", width: "100%" }}>
                        {item.title}
                      </h4>
                    </a>
                    <p style={{ width: "100%" }} className={style.des}>
                      {item.meta_description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <a
            href={`https://hpu.edu.vn/blogs/tin-tuc-moi`}
            style={{ textAlign: "center" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Xem Tất cả
          </a>
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

export default HomePage;

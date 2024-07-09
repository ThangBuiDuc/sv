import style from "./index.module.css";
import fbicon from "./fbIcon.svg";
import youtube from "./youtubeIcon.svg";
import zalo from "./zaloIcon.svg";

function Footer() {
  return (
    <div
      className={style.wrapFooter}
      style={{
        marginTop: "50px",
        display: "flex",
        justifyContent: "space-evenly",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <p style={{ fontWeight: "bold", fontSize: "16px", color: "white" }}>
          Thông tin về HPU
        </p>
        <p style={{ fontSize: "16px", color: "white", marginTop: "15px" }}>
          <span style={{ fontWeight: "bold" }}>Địa chỉ:</span> Số 36, đường Dân
          lập, phường Dư Hàng Kênh, quận Lê Chân, thành phố Hải Phòng
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <p style={{ fontSize: "16px", color: "white" }}>
          <span style={{ fontWeight: "bold" }}>Số điện thoại:</span> 0936 821
          821
        </p>
        <p style={{ fontSize: "16px", color: "white", marginTop: "15px" }}>
          <span style={{ fontWeight: "bold" }}>Email:</span> hpu@hpu.edu.vn
        </p>
        <p style={{ fontSize: "16px", color: "white", marginTop: "15px" }}>
          <span style={{ fontWeight: "bold" }}>Thời gian làm việc:</span>
          <br />
          Thứ 2 - sáng thứ 7
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <p style={{ fontSize: "16px", color: "white", fontWeight: "bold" }}>
          Social networks:
        </p>
        <div style={{ display: "flex", marginTop: "15px" }}>
          <a
            href="https://www.facebook.com/HaiPhongPrivateUniversity"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={fbicon} alt="this is fb icon" />
          </a>
          <a
            href="https://www.youtube.com/channel/UCBzgxqAk0f2jtqXHnmZoq8w"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginLeft: "20px" }}
          >
            <img src={youtube} alt="this is youtube icon" />
          </a>
          <a
            href="https://zalo.me/0901598698"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginLeft: "20px" }}
          >
            <img src={zalo} alt="this is zalo icon" />
          </a>
        </div>
      </div>
      <p>
        <span style={{ fontWeight: "bold" }}>Dev by HPU-TTS:</span> Bùi Đức
        Thắng, Lưu Thanh Hoàng, Vũ Hoài Nam, Nguyễn Quốc Thụ, Đào Anh Ngọc
      </p>
    </div>
  );
}

export default Footer;

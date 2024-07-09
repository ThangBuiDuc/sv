import style from "./index.module.css";
// import { useState, useLayoutEffect } from 'react';

// const dataTest =
// {
//     hotencha : 'Nguyễn Văn A',
//     quoctichcha: 'Việt Nam',
//     dantoccha: 'Kinh',
//     tongiaocha:'Không',
//     namsinhcha: '1974',
//     nghenghiepcha: 'Nông dân',
//     diachithuongchucha: 'Thôn Cẩm Hoàn, xã Thanh Sơn, huyện Kiến Thụy, Hải Phòng',

//     hotenme:'Trương THị B',
//     quoctichme:'Việt Nam',
//     dantocme:'Kinh',
//     tongiaome:'Không',
//     namsinhme:'1979',
//     nghenghiepme:'Nông dân',
//     diachithuongchume:'An hòa An Dongw Hải Phòng',

//     hotenvochong:'Nguyễn Thị C',
//     quoctichvochong:'Việt Nam',
//     dantocvochong:'Kinh',
//     tongiaovochong:'Không',
//     namsinhvochong:'2001',
//     nghenghiepvochong:'Nông dân',
//     diachithuongchuvochong:'An hòa An Dương Hải Phòng'
// }

function Family() {
  // const [data,setData] = useState();
  // useLayoutEffect(()=>{
  //     setData(dataTest);
  // },[])

  return (
    <div className={style.wrapFamily}>
      <h2 className={style.title}>
        Tính năng đang trong quá trình phát triển ...
      </h2>
      {/* <div style={{display:'flex',justifyContent:'center'}}><h2 style={{color:'#0083C2'}}>Gia đình</h2></div>
             <div className={style.line}>
                <div className={style.lineItem}>
                    <label style={{fontWeight: 'bold'}}>Họ tên cha</label>
                    <label className = {style.labelContent} >{data?data.hotencha:''}</label>
                </div>

                <div className={style.lineItem}>
                    <label style={{fontWeight: 'bold'}}>Quốc tịch</label>
                    <label className = {style.labelContent} >{data?data.quoctichcha:''}</label>
                </div>

                <div className={style.lineItem}>
                    <label style={{fontWeight: 'bold'}}>Dân tộc</label>
                    <label className = {style.labelContent} >{data?data.dantoccha:''}</label>
                </div>

                <div className={style.lineItem}>
                    <label style={{fontWeight: 'bold'}}>Tôn giáo</label>
                    <label className = {style.labelContent} >{data?data.tongiaocha:''}</label>
                </div>
                
            </div>
            <div className={style.line}>
                <div className={style.lineItem}>
                    <label style={{fontWeight: 'bold'}}>Năm sinh</label>
                    <label className = {style.labelContent} >{data?data.namsinhcha:''}</label>
                </div>

                <div className={style.lineItem}>
                    <label style={{fontWeight: 'bold'}}>Nghề nghiệp </label>
                    <label className = {style.labelContent} >{data?data.nghenghiepcha:''}</label>
                </div>

                <div className={style.lineItem2}>
                    <label style={{fontWeight: 'bold'}} >Địa chỉ thường chú</label>
                    <label className = {style.labelContent} >{data?data.diachithuongchucha:''}</label>
                </div>
            </div>

            <div className={style.line}>
                <div className={style.lineItem}>
                    <label style={{fontWeight: 'bold'}}>Họ tên mẹ</label>
                    <label className = {style.labelContent} >{data?data.hotenme:''}</label>
                </div>

                <div className={style.lineItem}>
                    <label style={{fontWeight: 'bold'}}>Quốc tịch</label>
                    <label className = {style.labelContent} >{data?data.quoctichme:''}</label>
                </div>

                <div className={style.lineItem}>
                    <label style={{fontWeight: 'bold'}}>Dân tộc</label>
                    <label className = {style.labelContent} >{data?data.dantocme:''}</label>
                </div>

                <div className={style.lineItem}>
                    <label style={{fontWeight: 'bold'}}>Tôn giáo</label>
                    <label className = {style.labelContent} >{data?data.tongiaome:''}</label>
                </div>
                
            </div>
            <div className={style.line}>
                <div className={style.lineItem}>
                    <label style={{fontWeight: 'bold'}}>Năm sinh</label>
                    <label className = {style.labelContent} >{data?data.namsinhme:''}</label>
                </div>

                <div className={style.lineItem}>
                    <label style={{fontWeight: 'bold'}}>Nghề nghiệp </label>
                    <label className = {style.labelContent} >{data?data.nghenghiepme:''}</label>
                </div>

                <div className={style.lineItem2}>
                    <label style={{fontWeight: 'bold'}}>Địa chỉ thường chú</label>
                    <label className = {style.labelContent} >{data?data.diachithuongchume:''}</label>
                </div>
            </div>

            <div className={style.line}>
                <div className={style.lineItem}>
                    <label style={{fontWeight: 'bold'}}>Họ tên vợ/chồng</label>
                    <label className = {style.labelContent} >{data?data.hotenvochong:''}</label>
                </div>

                <div className={style.lineItem}>
                    <label style={{fontWeight: 'bold'}}>Quốc tịch</label>
                    <label className = {style.labelContent} >{data?data.quoctichvochong:''}</label>
                </div>

                <div className={style.lineItem}>
                    <label style={{fontWeight: 'bold'}}>Dân tộc</label>
                    <label className = {style.labelContent} >{data?data.dantocvochong:''}</label>
                </div>

                <div className={style.lineItem}>
                    <label style={{fontWeight: 'bold'}}>Tôn giáo</label>
                    <label className = {style.labelContent} >{data?data.tongiaovochong:''}</label>
                </div>
                
            </div>
            <div className={style.line}>
                <div className={style.lineItem}>
                    <label style={{fontWeight: 'bold'}}>Năm sinh</label>
                    <label className = {style.labelContent} >{data?data.namsinhvochong:''}</label>
                </div>

                <div className={style.lineItem}>
                    <label style={{fontWeight: 'bold'}}>Nghề nghiệp </label>
                    <label className = {style.labelContent} >{data?data.nghenghiepvochong:''}</label>
                </div>

                <div className={style.lineItem2}>
                    <label style={{fontWeight: 'bold'}}>Địa chỉ thường chú</label>
                    <label className = {style.labelContent} >{data?data.diachithuongchuvochong:''}</label>
                </div>
            </div> */}
      {/* <div>
                <button className={style.bn}>In</button>
            </div> */}
    </div>
  );
}

export default Family;

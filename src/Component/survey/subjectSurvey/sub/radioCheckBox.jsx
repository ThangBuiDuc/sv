import style from "../index.module.css";
import { useState, useEffect } from "react";


export default function RadioCheckBox({ data, index, point, setPoint }) {
    //   console.log(data);
    const [checked, setChecked] = useState(null);
  
    const handleOnChange = (item) => {
      setChecked(item);
    };

    // useEffect(()=>{
    //   setPoint(point.fill(1))
    // },[])
  
    useEffect(() => {
      setPoint(
        point.map((item, i) => {
          if (i === index) {
            switch (checked) {
              case "Rất không đồng ý": {
                item = 1;
                break;
              }
              case "Không đồng ý": {
                item = 2;
                break;
              }
              case "Lưỡng lự": {
                item = 3;
                break;
              }
              case "Đồng ý": {
                item = 4;
                break;
              }
              case "Rất đồng ý": {
                item = 5;
                break;
              }
  
              default:
                item = 5;
            }
  
            return item;
          } else return item;
        })
      );
    }, [checked]);
    return (
      <div style={{ display: "flex", justifyContent: "space-evenly" }} className={style.radio}> 
        {data.map((item, i) => {
          return (
            <div key = {i} style={{ display: "flex" }} >
              <input
                type="checkbox"
                id={i + "x" + index}
                checked={checked? checked=== item:false}
                onChange={() => handleOnChange(item)}
              />
              <label htmlFor={i + "x" + index}>{item}</label>
            </div>
          );
        })}
      </div>
    );
  }
import { useState, useContext, Fragment } from "react";
import style from "./index.module.css";
import { BiArrowBack } from "react-icons/bi";
import { useEffect, useMemo } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useTransition, animated } from "@react-spring/web";
import useMeasure from "react-use-measure";
import ReactLoading from "react-loading";
import "react-loading-skeleton/dist/skeleton.css";
import {
  createColumnHelper,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
  //   Table,
  flexRender,
  //   ExpandedState,
} from "@tanstack/react-table";
import Swal from "sweetalert2";
import { SetAfterDataContext } from "./index";
import convertToRoman from "../convertToRoman";

import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const columnHelper = createColumnHelper();

function TableRender({ table }) {
  return (
    <div className={style.wrapTable}>
      <table style={{ width: "100%" }} className={style.table}>
        <thead className={style.wrapHeaderTable}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* style={{ backgroundColor: "#D9E1F2" }} */}
        <tbody className={style.wrapBodyTable}>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={style.trTable}>
              {row.getVisibleCells().map((cell, index) => (
                <td key={cell.id} className={index !== 0 ? style.tdTable : ""}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Mobile
function DetailQuestionMobile({ data, setData, index, tbhk1 }) {
  const [toggle, setToggle] = useState(false);

  const [ref, { height }] = useMeasure();

  const transitions = useTransition(toggle, {
    from: { opacity: 0, heigth: 0, overflow: "hidden" },
    // to:{opacity: 1, height: 100 },
    enter: { opacity: 1, height, overflow: "visible" },
    leave: { opacity: 0, height: 0, overflow: "hidden" },
    update: { height },
  });

  return (
    <div className={style.mobilegroup}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h3 style={{ width: "90%" }}>
          {convertToRoman(data.position)}. {data.name}
        </h3>
        <label
          // className="flex justify-center"
          onClick={() => setToggle(!toggle)}
          style={{
            width: "10%",
            display: "flex",
            justifyContent: "flex-end",
            cursor: "pointer",
          }}
        >
          {toggle ? <AiOutlineUp size={20} /> : <AiOutlineDown size={20} />}
        </label>
      </div>
      <div>
        {transitions(
          (style, toggle) =>
            toggle && (
              <animated.div style={style}>
                <div
                  style={{
                    paddingLeft: "15px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                  ref={ref}
                >
                  {data.question.map((item, i) => (
                    <div key={i} style={{ display: "flex" }}>
                      {index === 0 && i === 1 ? (
                        <div>
                          <p style={{ width: "80%" }}>
                            {item.position}. {item.name}{" "}
                            {tbhk1 ? (
                              tbhk1 === "empty" ? (
                                ""
                              ) : (
                                <span style={{ fontWeight: "bold" }}>
                                  &nbsp;---&nbsp;{tbhk1.diem4}
                                </span>
                              )
                            ) : (
                              ". . ."
                            )}
                          </p>
                          <ul>
                            <li>
                              Có điểm trung bình chung học tập từ 3.6 trở lên
                              =&gt; 05 điểm
                            </li>
                            <li>
                              Có điểm trung bình chung học tập từ 3.2 đến 3.59
                              =&gt; 04 điểm
                            </li>
                            <li>
                              Có điểm trung bình chung học tập từ 2.5 đến 3.19
                              =&gt; 03 điểm
                            </li>
                            <li>
                              Có điểm trung bình chung học tập từ 2.0 đến 3.49
                              =&gt; 02 điểm
                            </li>
                            <li>
                              Có điểm trung bình chung học tập dưới 2.0 =&gt; 0
                              điểm
                            </li>
                          </ul>
                        </div>
                      ) : (
                        <p style={{ width: "80%" }}>
                          {item.position}. {item.name} :
                        </p>
                      )}
                      <span
                        style={{
                          display: "flex",
                          width: "20%",
                          justifyContent: "center",
                        }}
                      >
                        {item.self_point}
                      </span>
                    </div>
                  ))}
                </div>
              </animated.div>
            )
        )}
      </div>
      <div className={style.mobilePoint}>
        <h4 style={{ width: "40%" }}>Điểm tối đa:</h4>
        <span>{data.max_point}</span>
      </div>
      <div className={style.mobilePoint}>
        <h4 style={{ width: "40%" }}>Tự đánh giá:</h4>
        <span>{data.self_point}</span>
      </div>
      <div className={style.mobilePoint}>
        <h4 style={{ width: "40%" }}>Cán bộ lớp:</h4>
        <input
          className={style.mobileInput}
          type="number"
          placeholder="Nhập điểm"
          value={
            typeof data.monitor_point === "number" ? data.monitor_point : ""
          }
          onWheel={(e) => e.target.blur()}
          onKeyDown={(e) => {
            if (e.key !== "Backspace" && (e.key < "0" || e.key > "9")) {
              e.preventDefault();
            }
          }}
          onChange={(e) => {
            const re = /^[0-9\b]+$/;
            let number = parseInt(e.target.value, 10);
            setData((pre) =>
              pre.map((el, i) =>
                i === index
                  ? {
                      ...el,
                      monitor_point:
                        (number === "" || re.test(number)) && number < 0
                          ? 0
                          : number > el.max_point
                          ? 0
                          : number,
                    }
                  : el
              )
            );
          }}
          // onChange={handleChange}
          // onBlur={onBlur}
        />
      </div>
    </div>
  );
}

function TableMobile({ data, setData, tbhk1 }) {
  return (
    <div className={style.mobilewrap}>
      {data.map((item, index) => (
        <Fragment key={index}>
          <DetailQuestionMobile
            data={item}
            setData={setData}
            index={index}
            tbhk1={tbhk1}
          />
        </Fragment>
      ))}
    </div>
  );
}

export default function Index({ dataPass, setDataPass, batch }) {
  const setAfterData = useContext(SetAfterDataContext);
  // console.log(setAfterData);
  const { user } = useUser();
  const { getToken } = useAuth();
  const [data, setData] = useState(null);
  const [tbhk1, setTbhk1] = useState(null);

  useEffect(() => {
    let calApi = async () => {
      await fetch(
        `${import.meta.env.VITE_APP_RL_EDU_TBHK}${dataPass.student_code}/${
          batch.term
        }/${batch.school_year}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${await getToken({
              template: import.meta.env.VITE_APP_RL_EDU,
            })}`,
          },
        }
      )
        .then((res) => res.json())
        .then((res) =>
          res.result.length > 0 ? setTbhk1(res.result[0]) : setTbhk1("empty")
        );
    };

    calApi();
  }, []);
  useEffect(() => {
    let callApi = async () => {
      await fetch(
        `${import.meta.env.VITE_APP_API_REN_LUYEN_MONITOR_DETAIL}${
          user.publicMetadata.masv
        }/${batch?.id}/${dataPass.student_code}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${await getToken({
              template: import.meta.env.VITE_APP_REN_LUYEN_MONITOR,
            })}`,
          },
        }
      )
        .then((res) => res.json())
        .then((res) =>
          setData(
            res.result[0].enrollment[0].group_point
              .map((item) => {
                let object = Object.assign({}, item);
                delete object.group_question;
                let question = item.group_question.question
                  .map((item) => {
                    return {
                      id: item.id,
                      name: item.detail_question.name,
                      max_point: item.detail_question.max_point,
                      position: item.detail_question.position,
                      self_point: item.question_point[0].point,
                      monitor_point: null,
                      staff_point: null,
                    };
                  })
                  .sort((a, b) => a.position - b.position);

                return {
                  self_point: question.reduce(
                    (total, curr) => total + curr.self_point,
                    0
                  ),
                  ...object,
                  ...item.group_question,
                  question,
                };
              })
              .sort((a, b) => a.position - b.position)
          )
        );
    };

    callApi();
  }, []);

  // const [comment, setComment] = useState("");
  const EditableCell = ({ getValue, row, table, column }) => {
    const [value, setValue] = useState(
      typeof getValue() === "number" ? getValue() : ""
    );
    useEffect(() => {
      if (getValue()) setValue(getValue());
    }, [getValue()]);

    // console.log();

    const onBlur = () => {
      table.options.meta?.updateData(row.index, value);
    };
    return row.depth === 0 && column.id === "monitor_point" ? (
      <>
        <input
          className={style.tableInput}
          type="number"
          placeholder="Nhập điểm"
          value={value}
          // onChange={(e) => setValue(e.target.value)}
          onChange={(e) => {
            const re = /^[0-9\b]+$/;
            let number = parseInt(e.target.value, 10);
            // if value is not blank, then test the regex

            if (number === "" || re.test(number)) {
              number < 0
                ? setValue(0)
                : number > row.original.max_point
                ? setValue(0)
                : setValue(number);
            }
          }}
          onKeyDown={(e) => {
            if (e.key !== "Backspace" && (e.key < "0" || e.key > "9")) {
              e.preventDefault();
            }
          }}
          onBlur={onBlur}
          onWheel={(e) => e.target.blur()}
        />
      </>
    ) : (
      <p>{getValue()}</p>
    );
  };

  const columns = useMemo(
    () => [
      columnHelper.group({
        id: "noidung",
        columns: [
          columnHelper.accessor("name", {
            header: "Nội dung đánh giá",
            cell: ({ row, getValue }) => {
              return (
                <div
                  // className={style.groupQuestion}
                  style={{
                    // Since rows are flattened by default,
                    // we can use the row.depth property
                    // and paddingLeft to visually indicate the depth
                    // of the row
                    paddingLeft: `${row.depth * 3}rem`,
                    fontWeight: `${row.depth === 0 ? "bold" : ""}`,
                  }}
                >
                  {row.getCanExpand() && (
                    <button
                      className={style.expandBtn}
                      onClick={row.getToggleExpandedHandler()}
                      style={{ marginRight: "10px" }}
                    >
                      {row.getIsExpanded() ? (
                        <IoMdArrowDropup style={{ cursor: "pointer" }} />
                      ) : (
                        <IoMdArrowDropdown style={{ cursor: "pointer" }} />
                      )}
                    </button>
                  )}
                  {row.parentId === "0" && row.original.position === 2 ? (
                    <>
                      <div style={{ display: "flex" }}>
                        <p>
                          {getValue()}
                          {tbhk1 ? (
                            tbhk1 === "empty" ? (
                              ""
                            ) : (
                              <span style={{ fontWeight: "bold" }}>
                                &nbsp;---&nbsp;{tbhk1.diem4}
                              </span>
                            )
                          ) : (
                            ". . ."
                          )}
                        </p>
                      </div>
                      <ul>
                        <li>
                          Có điểm trung bình chung học tập từ 3.6 trở lên =&gt;
                          05 điểm
                        </li>
                        <li>
                          Có điểm trung bình chung học tập từ 3.2 đến 3.59 =&gt;
                          04 điểm
                        </li>
                        <li>
                          Có điểm trung bình chung học tập từ 2.5 đến 3.19 =&gt;
                          03 điểm
                        </li>
                        <li>
                          Có điểm trung bình chung học tập từ 2.0 đến 2.49 =&gt;
                          02 điểm
                        </li>
                        <li>
                          Có điểm trung bình chung học tập dưới 2.0 =&gt; 0 điểm
                        </li>
                      </ul>
                    </>
                  ) : (
                    getValue()
                  )}
                </div>
              );
            },
          }),
          columnHelper.accessor("max_point", {
            header: "Điểm tối đa",
            cell: ({ getValue }) => <p>{getValue()}</p>,
          }),
        ],
      }),

      columnHelper.group({
        header: "Điểm",
        columns: [
          columnHelper.accessor("self_point", {
            header: "Tự đánh giá",
            cell: ({ getValue }) => <p>{getValue()}</p>,
          }),
          columnHelper.accessor("monitor_point", {
            header: "Cán bộ lớp",
            cell: EditableCell,
          }),
          columnHelper.accessor("staff_point", {
            header: "Cán bộ quản lý",
            cell: ({ getValue }) => <p>{getValue()}</p>,
          }),
        ],
      }),
    ],
    [tbhk1]
  );

  const [expanded, setExpanded] = useState({});
  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    getExpandedRowModel: getExpandedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    onExpandedChange: setExpanded,
    getSubRows: (row) => row.question,
    meta: {
      updateData: (index, value) => {
        // console.log(index);
        setData((pre) => {
          return pre.map((item, i) => {
            if (i == index) {
              return {
                ...item,
                monitor_point: value,
              };
            } else return item;
          });
        });
      },
    },
  });

  const handleOnclick = () => {
    // console.log(data);
    // console.log(batch);
    if (data.some((item) => typeof item.monitor_point !== "number")) {
      Swal.fire({
        title: "Chưa trả lời hết nhóm các câu hỏi!",
        text: "Vui lòng đánh giá điểm cho từng nhóm câu hỏi",
        icon: "warning",
      });
    } else {
      Swal.fire({
        title: "Hoàn thành đánh giá!",
        text: "Bạn có chắc chắn muốn hoàn thành quá trình đánh giá không?",
        icon: "question",
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Huỷ bỏ",
        showLoaderOnConfirm: () => !Swal.isLoading(),
        preConfirm: async () => {
          let result = await fetch(
            import.meta.env.VITE_APP_REN_LUYEN_UPDATE_MONITOR,
            {
              method: "PUT",
              headers: {
                authorization: `Bearer ${await getToken({
                  template: import.meta.env.VITE_APP_REN_LUYEN_MONITOR,
                })}`,
              },
              body: JSON.stringify({
                updates: data.map((item) => {
                  return {
                    _set: {
                      monitor_point: item.monitor_point,
                      updated_at: new Date(),
                    },
                    where: {
                      student_code: {
                        _eq: dataPass.student_code,
                      },
                      batch_id: {
                        _eq: batch.id,
                      },
                      group_id: {
                        _eq: item.id,
                      },
                    },
                  };
                }),
              }),
            }
          )
            .then((res) => res.json())
            .then((res) => res.result);

          if (result.some((item) => item.affected_rows !== 1)) {
            Swal.fire({
              title: "Đã có lỗi xảy ra!",
              text: "Vui lòng liên hệ quản trị mạng để khắc phục sự cố",
              icon: "error",
            });
          } else {
            setAfterData.setData(null);
            setDataPass((pre) => {
              return {
                ...pre,
                toggle: !pre.toggle,
              };
            });
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            setAfterData.setInvalidate((pre) => !pre);
            Swal.fire({
              title: "Đánh giá thành công!",
              icon: "success",
            });
          }
        },
      });
    }
  };
  const screenWidth = window.innerWidth;
  // console.log(data);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <BiArrowBack
        size={"40"}
        style={{ cursor: "pointer" }}
        onClick={() =>
          setDataPass((pre) => {
            return {
              ...pre,
              toggle: !pre.toggle,
            };
          })
        }
      />
      <h3 style={{ fontWeight: "bold", textAlign: "center" }}>
        Đánh giá sinh viên: <span>{dataPass.sv.fullname}</span>
      </h3>
      <p>
        Điểm sinh viên tự đánh giá:{" "}
        <span style={{ fontWeight: "bold" }}>
          {dataPass.total_self_point ? dataPass.total_self_point : "..."}
        </span>
      </p>
      <p>
        Điểm trừ:{" "}
        <span style={{ fontWeight: "bold" }}>
          {dataPass.total_sub_point ? dataPass.total_sub_point : "..."}
        </span>
      </p>
      <p>
        Điểm cộng:{" "}
        <span style={{ fontWeight: "bold" }}>
          {dataPass.total_add_point ? dataPass.total_add_point : "..."}
        </span>
      </p>
      <>
        {data ? (
          <>
            <button
              style={{
                padding: "5px",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                cursor: "pointer",
                width: "fit-content",
                alignSelf: "end",
              }}
              onClick={() => {
                setData((pre) =>
                  pre.map((item) => ({
                    ...item,
                    monitor_point: item.self_point,
                  }))
                );
              }}
            >
              Đổ điểm sinh viên
            </button>

            {screenWidth < 760 ? (
              <TableMobile data={data} setData={setData} tbhk1={tbhk1} />
            ) : (
              <TableRender table={table} />
            )}
            {/* <div
              style={{
                display: "flex",
                flexDirection: "column",
                // border: "1px solid rgba(0, 0, 0, 0.1)",
                // borderRadius: "10px",
                gap: "10px",
                padding: "10px",
              }}
            >
              <p style={{ fontWeight: "bold" }}>Nhận xét</p>
              <textarea
                placeholder="Ý kiến nhận xét!!"
                style={{
                  resize: "none",
                  padding: "10px",
                  borderRadius: "10px",
                }}
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div> */}
            <button
              className={style.btnSubmit}
              style={{
                padding: "5px",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                cursor: "pointer",
                width: "fit-content",
                alignSelf: "center",
              }}
              onClick={() => handleOnclick()}
            >
              Hoàn Thành
            </button>
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
      </>
    </div>
  );
}

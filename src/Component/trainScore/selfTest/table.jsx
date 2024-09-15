import { useState, useMemo, useEffect } from "react";
import ReactLoading from "react-loading";
import style from "./index.module.css";
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
import { useAuth, useUser } from "@clerk/clerk-react";
import "react-loading-skeleton/dist/skeleton.css";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
const columnHelper = createColumnHelper();

function TableRender({ table }) {
  return (
    <div>
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
            <tr key={row.id} className={style.tr}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
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

export default function Index({
  group,
  batch,
  setAfterData,
  setInvalidate,
  total_self_point,
  total_staff_point,
}) {
  const [data, setData] = useState(
    total_self_point
      ? group.map((item) => {
          let group_point = item.question.reduce((total, curr) => {
            return total + curr.self_point;
          }, 0);

          return {
            ...item,
            self_point: group_point,
          };
        })
      : group
  );

  const { getToken } = useAuth();
  const { user } = useUser();
  const [tbhk1, setTbhk1] = useState(null);

  useEffect(() => {
    let calApi = async () => {
      await fetch(
        `${process.env.REACT_APP_RL_EDU_TBHK}${user.publicMetadata.masv}/${batch.term}/${batch.school_year}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${await getToken({
              template: process.env.REACT_APP_RL_EDU,
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

  const EditableCell = ({ getValue, row, table, column }) => {
    const [value, setValue] = useState(
      typeof getValue() === "number" ? getValue() : ""
    );
    useEffect(() => {
      if (getValue()) setValue(getValue());
    }, [getValue()]);

    // console.log(row);

    const onBlur = () => {
      table.options.meta?.updateData(row.parentId, row.original, value);
    };

    return row.depth === 1 && column.id === "self_point" ? (
      <input
        className={style.tableInput}
        placeholder="Nhập điểm"
        type="number"
        value={value}
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
    ) : (
      // <input />
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
              // console.log(row.parentId === "0" && row.original.position === 2);
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
                        <p>{getValue()}</p>
                        {tbhk1 ? (
                          tbhk1 === "empty" ? (
                            ""
                          ) : (
                            <p>
                              &nbsp;---&nbsp;
                              <span style={{ fontWeight: "bold" }}>
                                {tbhk1.diem4}
                              </span>
                            </p>
                          )
                        ) : (
                          <ReactLoading
                            type="spin"
                            color="#0083C2"
                            width={"22px"}
                            height={"22px"}
                            className={style.loading}
                          />
                        )}
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
            cell:
              total_self_point || total_staff_point
                ? ({ getValue }) => <p>{getValue()}</p>
                : EditableCell,
          }),
          columnHelper.accessor("monitor_point", {
            header: "Cán bộ lớp",
            cell: ({ getValue }) => <p>{getValue()}</p>,
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

  const [expanded, setExpanded] = useState(true);
  //   console.log(data);
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
      updateData: (index, original, value) => {
        // console.log(index, original, value);
        setData((pre) => {
          return pre.map((item, i) => {
            // console.log(i, index, i == index);
            if (i == index) {
              return {
                ...item,
                question: item.question.map((el) => {
                  if (el.id === original.id) {
                    return {
                      ...el,
                      self_point: value,
                    };
                  } else return el;
                }),
              };
            } else return item;
          });
        });
        // console.log(rowIndex, columnId, value);
        // setData((old) =>
        //   old.map((row, index) => {
        //     if (index === rowIndex) {
        //       return {
        //         ...old[rowIndex],
        //         [columnId]: value,
        //       };
        //     }
        //     return row;
        //   })
        // );
      },
    },
  });

  //   console.log(
  //     data.reduce((total, curr) => {
  //       let data = curr.question.reduce((array, cur) => {
  //         return [...array, cur];
  //       }, []);
  //       return [...total, ...data];
  //     }, [])
  //   );

  const handleOnclick = () => {
    let check = data.reduce((total, curr) => {
      let data = curr.question.reduce((array, cur) => {
        return [...array, cur];
      }, []);
      return [...total, ...data];
    }, []);

    // console.log(batch);

    if (check.some((item) => typeof item.self_point !== "number")) {
      Swal.fire({
        title: "Chưa trả lời hết các câu hỏi!",
        text: "Vui lòng đánh giá điểm cho từng câu hỏi",
        icon: "warning",
      });
    } else {
      Swal.fire({
        title: "Hoàn thành tự đánh giá!",
        text: "Bạn có chắc chắn muốn hoàn thành quá trình tự đánh giá không?",
        icon: "question",
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Huỷ bỏ",
        showLoaderOnConfirm: () => !Swal.isLoading(),
        preConfirm: async () => {
          let result = await fetch(
            process.env.REACT_APP_REN_LUYEN_UPDATE_SELF,
            {
              method: "PUT",
              headers: {
                authorization: `Bearer ${await getToken({
                  template: process.env.REACT_APP_REN_LUYEN_SV,
                })}`,
              },
              body: JSON.stringify({
                updates: check.map((item) => {
                  return {
                    _set: {
                      point: item.self_point,
                      updated_at: new Date(),
                    },
                    where: {
                      student_code: {
                        _eq: user.publicMetadata.masv,
                      },
                      batch_id: {
                        _eq: batch.id,
                      },
                      question_group_id: {
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
            setAfterData(null);
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
            setInvalidate((pre) => !pre);
            Swal.fire({
              title: "Đánh giá thành công!",
              icon: "success",
            });
          }
        },
      });
    }
  };
  return (
    <>
      <TableRender table={table} />
      {total_self_point || total_staff_point ? (
        <></>
      ) : (
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
      )}
    </>
  );
}

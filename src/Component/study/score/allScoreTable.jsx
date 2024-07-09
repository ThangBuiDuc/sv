import { useTable, useSortBy } from "react-table";
import { useState, useLayoutEffect, useMemo } from "react";
import style from "./index.module.css";
import ReactLoading from "react-loading";
import { useAuth, useUser } from "@clerk/clerk-react";

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  // Render the UI for your table
  return (
    <table
      {...getTableProps()}
      cellSpacing={0}
      style={{ width: "100%", borderBottom: "1px solid #0083C2" }}
    >
      <thead className={style.wrapHeaderTable}>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                style={{ padding: "10px", cursor: "pointer" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "5px",
                  }}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody
        {...getTableBodyProps()}
        className={`${style.wrapBodyTable} ${style.wrapBodyTable1}`}
      >
        {rows.map((row, i) => {
          prepareRow(row);
          return i % 2 === 0 ? (
            <tr {...row.getRowProps()} style={{ backgroundColor: "#D9E1F2" }}>
              {row.cells.map((cell, index) => {
                return index === 2 ? (
                  <td
                    {...cell.getCellProps()}
                    key={index}
                    style={{ textAlign: "left" }}
                  >
                    {cell.render("Cell")}
                  </td>
                ) : (
                  <td {...cell.getCellProps()} key={index}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          ) : (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell, index) => {
                return index === 2 ? (
                  <td
                    {...cell.getCellProps()}
                    key={index}
                    style={{ textAlign: "left" }}
                  >
                    {cell.render("Cell")}
                  </td>
                ) : (
                  <td {...cell.getCellProps()} key={index}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

// function calc(num){
//   num = num.toString();
//   return num.slice(0, (num.indexOf("."))+3)
// }

function AllScoreTable() {
  // Tao cot
  const columns = useMemo(
    () => [
      {
        Header: "STT",
        accessor: "stt",
      },
      {
        Header: "Mã môn học",
        accessor: "mamonhoc",
      },
      {
        Header: "Tên môn học",
        accessor: "tenmonhoc",
      },
      {
        Header: "Khối lượng",
        accessor: "khoiluong",
      },
      {
        Header: "Điểm 10",
        accessor: "diemthang10",
      },
      {
        Header: "Điểm 4",
        accessor: "diemthang4",
      },
      {
        Header: "Điểm chữ",
        accessor: "diemchu",
      },
    ],
    []
  );

  // Fetch du lieu
  const [data, setData] = useState(null);
  const { getToken } = useAuth();
  const { user } = useUser();

  useLayoutEffect(() => {
    const fetchData = async () => {
      await fetch(
        `${import.meta.env.VITE_APP_GET_ALL_SCORE_STUDENT_API}${
          user.publicMetadata.masv
        }`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${await getToken({
              template: import.meta.env.VITE_APP_EDUMNG_TEMPLATE,
            })}`,
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setData(
            res.diem_toan_khoa.length > 0
              ? res.diem_toan_khoa.map((item, index) => {
                  item.stt = index + 1;
                  return item;
                })
              : []
          );
        });
    };
    fetchData();
  }, []);

  return data ? (
    data.length > 0 ? (
      <Table columns={columns} data={data} />
    ) : (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h3>Sinh viên chưa có điểm toàn khoá hoặc chưa cập nhật dữ liệu</h3>
      </div>
    )
  ) : (
    <ReactLoading
      type="spin"
      color="#0083C2"
      width={"50px"}
      height={"50px"}
      className={style.loading}
    />
  );
}

export default AllScoreTable;

import { useTable, useSortBy } from "react-table";
import { useState, useLayoutEffect, useMemo } from "react";
import style from "./index.module.css";
import ReactLoading from "react-loading";
import { useAuth } from "@clerk/clerk-react";

function ReactTable({ columns, data }) {
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
        {headerGroups.map((headerGroup, index) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={index}>
            {headerGroup.headers.map((column, index) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                style={{ padding: "10px", cursor: "pointer" }}
                key={index}
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
      <tbody {...getTableBodyProps()} className={style.wrapBodyTable}>
        {rows.map((row, i) => {
          prepareRow(row);
          return i % 2 === 0 ? (
            <tr
              {...row.getRowProps()}
              style={{ backgroundColor: "#D9E1F2" }}
              key={i}
            >
              {row.cells.map((cell, index) => {
                return index === 2 ? (
                  <td
                    {...cell.getCellProps()}
                    key={index}
                    style={{ padding: "10px", textAlign: "left" }}
                  >
                    {cell.render("Cell")}
                  </td>
                ) : (
                  <td {...cell.getCellProps()} key={cell.id}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          ) : (
            <tr {...row.getRowProps()} key={i}>
              {row.cells.map((cell, index) => {
                return index === 2 ? (
                  <td
                    {...cell.getCellProps()}
                    key={index}
                    style={{ padding: "10px", textAlign: "left" }}
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

function Table() {
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
        Header: "Năm học",
        accessor: "namhoc",
      },
      {
        Header: "Học kỳ",
        accessor: "hocky",
      },
      {
        Header: "Số tín chỉ",
        accessor: "sotc",
      },
      {
        Header: "Học phí",
        accessor: "hocphi",
      },
      {
        Header: "Trạng thái",
        accessor: "trangthai",
      },
    ],
    []
  );

  // Fetch du lieu
  const [data, setData] = useState(null);
  const { getToken } = useAuth();

  useLayoutEffect(() => {
    const fetchData = async () => {
      await fetch(`${import.meta.env.VITE_APP_SUBJECT_MONEY}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await getToken({
            template: import.meta.env.VITE_APP_EDUMNG_TEMPLATE,
          })}`,
        },
      })
        .then((res) => res.json())
        .then((res) => {
          setData(
            res.result.length > 0
              ? res.result.map((item, index) => {
                  item.stt = index + 1;
                  item.hocphi = item.hocphi.toLocaleString();
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
      <ReactTable columns={columns} data={data} />
    ) : (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h3>
          Sinh viên chưa có thông tin về khoản đã nộp hoặc chưa cập nhật dữ liệu
        </h3>
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

export default Table;

import { useMemo } from "react";
import style from "./index.module.css";
import { useTable, useSortBy } from "react-table";
import moment from "moment-timezone";

function ReactTable({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  // console.log(renderRowSub)
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
      style={{
        width: "94.5%",
        borderBottom: "1px solid #0083C2",
        float: "right",
      }}
    >
      <thead
        className={style.wrapHeaderTable}
        style={{ backgroundColor: "#a3bcd1" }}
      >
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
      <tbody {...getTableBodyProps()} className={style.wrapBodyTable}>
        {rows.map((row, i) => {
          prepareRow(row);
          return i % 2 === 0 ? (
            <tr {...row.getRowProps()} style={{ backgroundColor: "#D9E1F2" }}>
              {row.cells.map((cell, index) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    key={index}
                    style={{ textAlign: "center", padding: "10px" }}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          ) : (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell, index) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    key={index}
                    style={{ textAlign: "center", padding: "10px" }}
                  >
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

function SubTable({ data }) {
  // Tao cot
  const columns = useMemo(
    () => [
      {
        Header: "STT",
        accessor: "stt",
      },
      {
        Header: "Giáo viên",
        accessor: "gv",
      },
      {
        Header: "Thời gian",
        accessor: "thoi_gian",
        Cell: ({ value }) => {
          return (
            <span>
              {moment(value + "Z")
                .tz("Asia/Ho_Chi_Minh")
                .format("HH:mm DD-MM-YYYY")}
            </span>
          );
        },
      },
      {
        Header: "Số tiết vắng",
        accessor: "so_tiet_vang",
      },
      {
        Header: "Phép",
        accessor: "phep",
        Cell: ({ value }) => (value ? <span>✓</span> : <span>✗</span>),
      },
    ],
    []
  );

  return <ReactTable columns={columns} data={data} />;
}

export default SubTable;

import style from "./style.module.css";
import { useTable, useSortBy } from "react-table";
import { useMemo } from "react";

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

export default function HocKy({ lan, data }) {
  const columns = useMemo(
    () => [
      {
        Header: "STT",
        accessor: "stt",
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
        Header: "Điểm 10",
        accessor: "diem",
      },
      {
        Header: "Xếp loại 10",
        accessor: "xeploai10",
      },
      {
        Header: "Điểm 4",
        accessor: "diem4",
      },
      {
        Header: "Xếp loại 4",
        accessor: "xeploai4",
      },
    ],
    []
  );
  return (
    <div>
      <h3 style={{ color: "#0083c2" }}>
        Điểm trung bình học kỳ lần {lan}:&nbsp;
      </h3>
      <Table columns={columns} data={data} />
    </div>
  );
}

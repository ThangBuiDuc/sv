import style from "./index.module.css";
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
      <tbody
        {...getTableBodyProps()}
        className={`${style.wrapBodyTable} ${style.wrapBodyTable1}`}
      >
        {rows.map((row, i) => {
          prepareRow(row);
          return i % 2 === 0 ? (
            <tr {...row.getRowProps()} style={{ backgroundColor: "#D9E1F2" }}>
              {row.cells.map((cell, index) => {
                return (
                  <td {...cell.getCellProps()} key={index}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          ) : (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell, index) => {
                return (
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

export default function Index({ data }) {
  const columns = useMemo(
    () => [
      {
        Header: "STT",
        accessor: "stt",
      },
      {
        Header: "Tên môn học",
        accessor: "tenmonhoc",
      },
      {
        Header: "Ngày thi",
        accessor: "ngay",
        Cell: ({ value }) => (
          <span style={{ border: "none" }}>
            {value.split("T")[0].split("-").reverse().join("-")}
          </span>
        ),
      },
      {
        Header: "Địa điểm",
        accessor: "dd_thi",
      },
      {
        Header: "Giờ thi",
        accessor: "gio",
      },
      {
        Header: "Hình thức",
        accessor: "ht_thi",
      },
    ],
    []
  );
  return (
    <div>
      <Table
        columns={columns}
        data={data.map((item, index) => {
          item.stt = index + 1;
          return item;
        })}
      />
    </div>
  );
}

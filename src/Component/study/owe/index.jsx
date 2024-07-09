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
      <tbody {...getTableBodyProps()} className={style.wrapBodyTable}>
        {rows.map((row, i) => {
          prepareRow(row);
          return i % 2 === 0 ? (
            <tr {...row.getRowProps()} style={{ backgroundColor: "#D9E1F2" }}>
              {row.cells.map((cell, index) => {
                return index === 1 ? (
                  <td
                    {...cell.getCellProps()}
                    key={index}
                    style={{ textAlign: "left", padding: "10px" }}
                  >
                    {cell.render("Cell")}
                  </td>
                ) : (
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
                return index === 1 ? (
                  <td
                    {...cell.getCellProps()}
                    key={index}
                    style={{ textAlign: "left", padding: "10px" }}
                  >
                    {cell.render("Cell")}
                  </td>
                ) : (
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

export default function Owe() {
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
        Header: "Điểm",
        accessor: "diemmax",
      },
    ],
    []
  );

  const [data, setData] = useState(null);
  const { getToken } = useAuth();
  const { user } = useUser();

  useLayoutEffect(() => {
    const fetchData = async () => {
      await fetch(
        `${import.meta.env.VITE_APP_OWE_API}${user.publicMetadata.masv}`,
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
          setData(
            res.no_mon.length > 0
              ? res.no_mon.map((item, index) => {
                  item.stt = index + 1;
                  return item;
                })
              : []
          );
        });
    };
    fetchData();
  }, []);
  return (
    <div className={style.wrap}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2 style={{ color: "#0083C2" }}>Nợ môn</h2>
      </div>
      {data ? (
        data.length > 0 ? (
          <Table columns={columns} data={data} />
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h3>Sinh viên hiện tại không nợ môn</h3>
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
      )}
    </div>
  );
}

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
                return index === 2 ? (
                  <td
                    {...cell.getCellProps()}
                    key={index}
                    style={{textAlign:'left'}}
                  >
                    {cell.render("Cell")}
                  </td>
                ) : (
                  <td
                    {...cell.getCellProps()}
                    key={index}
                  >
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
                    style={{textAlign:'left'}}
                  >
                    {cell.render("Cell")}
                  </td>
                ) : (
                  <td
                    {...cell.getCellProps()}
                    key={index}
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

function Table() {
  // Tao cot
  const columns = useMemo(
    () => [
      {
        Header: "STT",
        accessor: "stt",
      },
      {
        Header: "Mã ấn phẩm",
        accessor: "ma_an_pham",
      },
      {
        Header: "Tên ấn phẩm",
        accessor: "ten_an_pham",
      },
      {
        Header: "Ngày mượn sách",
        accessor: "ngay_muon_sach",
        Cell: ({ value, row }) => {
          return value.split("-").reverse().join('-')
        },
      },
      {
        Header: "Ngày phải trả",
        accessor: "ngay_phai_tra",
        Cell: ({ value, row }) => {
          return value.split("-").reverse().join('-')
        },
      },
      {
        Header: "Số ngày quá hạn",
        accessor: "so_ngay_qua_han",
      },
      {
        Header: "Ghi chú",
        accessor: "ghi_chu",
      },
    ],
    []
  );

  // Fetch du lieu
  const [data, setData] = useState(null);
  const {getToken} = useAuth()

  useLayoutEffect(() => {
    const fetchData = async () => {
      await fetch(`/api/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          body: JSON.stringify({queryName:'REACT_LIBRARY_SEARCH',token: `${await getToken({template:'hasura-sinhvien'})}`})
      })
        .then((res) => res.json())
        .then((res) => {
          setData(
            res.data.nh_sach_qua_han.length > 0
              ? res.data.nh_sach_qua_han.map((item, index) => {
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
      <ReactTable columns={columns} data={data} />
    ) : (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h3 >
          Sinh viên hiện đang không mượn sách thư viện
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

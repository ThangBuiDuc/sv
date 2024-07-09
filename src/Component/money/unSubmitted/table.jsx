import { useTable, useSortBy } from "react-table";
import { useState, useLayoutEffect, useMemo } from "react";
import style from "./index.module.css";
import ReactLoading from "react-loading";
import { useAuth, useUser } from "@clerk/clerk-react";
import { getText } from "number-to-text-vietnamese";

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

function ConvertText({ data }) {
  return (
    <p>
      <span style={{ fontWeight: "bold" }}>
        Tổng số tiền học phí thiếu:&nbsp;
      </span>
      {" " +
        data
          .map((item) => item.thieu)
          .reduce((total, num) => total + num, 0)
          .toLocaleString() +
        "đ"}{" "}
      {`(${
        getText(
          data.map((item) => item.thieu).reduce((total, num) => total + num, 0)
        ) + " đồng"
      })`}
    </p>
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
        Header: "Tên khoản",
        accessor: "ten",
      },
      {
        Header: "Số tiền quy định",
        accessor: "sotienquydinh",
        Cell: ({ value }) => (value ? value.toLocaleString() : 0),
      },
      {
        Header: "Số tiền thay đổi",
        accessor: "sotienthaydoi",
        Cell: ({ value }) => (value ? value.toLocaleString() : 0),
      },
      {
        Header: "Số tiền miễn giảm",
        accessor: "sotienmiengiam",
        Cell: ({ value }) => (value ? value.toLocaleString() : 0),
      },
      {
        Header: "Số tiền kỳ trước chuyển sang",
        accessor: "sotienkytruocchuyensang",
        Cell: ({ value }) => (value ? value.toLocaleString() : 0),
      },
      {
        Header: "Số tiền đã thu",
        accessor: "sotiendathu",
        Cell: ({ value }) => (value ? value.toLocaleString() : 0),
      },
      {
        Header: "Số tiền phải chi",
        accessor: "sotienphaichi",
        Cell: ({ value }) => (value ? value.toLocaleString() : 0),
      },
      {
        Header: "Số tiền đã chi",
        accessor: "sotiendachi",
        Cell: ({ value }) => (value ? value.toLocaleString() : 0),
      },
      {
        Header: "Số tiền chuyển sang kỳ sau",
        accessor: "sotienchuyensangkysau",
        Cell: ({ value }) => (value ? value.toLocaleString() : 0),
      },
      {
        Header: "Số tiền thiếu",
        accessor: "thieu",
        Cell: ({ value }) => (value ? value.toLocaleString() : 0),
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
        `${import.meta.env.VITE_APP_SEMESTER_UNSUBMITTED_API}${
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
          setData(
            res.khoan_thieu.length > 0
              ? res.khoan_thieu.map((item, index) => {
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
      <>
        <ReactTable columns={columns} data={data} />
        <ConvertText data={data} />
      </>
    ) : (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <h3>Sinh viên không nợ học phí trong kì này</h3>
        <h4>
          Các khoản thiếu kỳ trước vui lòng liên hệ phòng kế hoạch tài chính để
          biết thêm chi tiết
        </h4>
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

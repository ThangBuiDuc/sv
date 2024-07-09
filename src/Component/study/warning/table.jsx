import { useTable, useSortBy, useExpanded } from "react-table";
import {
  useState,
  useLayoutEffect,
  useMemo,
  useCallback,
  Fragment,
} from "react";
import style from "./index.module.css";
import ReactLoading from "react-loading";
import { useAuth, useUser } from "@clerk/clerk-react";
import SubTable from "./subTable";

function ReactTable({ columns, data, renderRowSub }) {
  // Use the state and functions returned from useTable to build your UI
  // console.log(renderRowSub)
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
    useExpanded
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
            <Fragment key={i}>
              <tr {...row.getRowProps()} style={{ backgroundColor: "#D9E1F2" }}>
                {row.cells.map((cell, index) => {
                  return index === 2 ? (
                    <td
                      {...cell.getCellProps()}
                      key={index}
                      style={{ padding: "10px" }}
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
              {/* {row.isExpanded ? (
                <tr>
                  <td colSpan={visibleColumns.length}>
                    {renderRowSub({ row })}
                  </td>
                </tr>
              ) : <></>} */}
            </Fragment>
          ) : (
            <Fragment key={i}>
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, index) => {
                  return index === 2 ? (
                    <td
                      {...cell.getCellProps()}
                      key={index}
                      style={{ padding: "10px" }}
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
              {/* {row.isExpanded ? (
                <tr>
                  <td colSpan={visibleColumns.length}>
                    {renderRowSub({ row })}
                  </td>
                </tr>
              ) : null} */}
            </Fragment>
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
        accessor: "ma_mon_hoc",
      },
      {
        Header: "Tên môn học",
        accessor: "ten_mon_hoc",
      },
      {
        Header: "Tổng tiết vắng",
        accessor: "tong_tiet_vang",
      },
      {
        Header: "Tỉ lệ vắng",
        accessor: "tinhhinh",
        Cell: ({ value }) => {
          return <span>{value}%</span>;
        },
      },
    ],
    []
  );

  const renderRowSubComponent = useCallback(({ row }) => {
    // console.log(row)
    return <SubTable data={row.original.chi_tiet} />;
  }, []);

  // Fetch du lieu
  const [data, setData] = useState(null);
  const { getToken } = useAuth();
  const { user } = useUser();

  useLayoutEffect(() => {
    const fetchData = async () => {
      await fetch(
        `${import.meta.env.VITE_APP_WARNING_API}${user.publicMetadata.masv}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${await getToken({
              template: import.meta.env.VITE_APP_QLGD_TEMPLATE,
            })}`,
          },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setData(
            res.tt_chung.length > 0
              ? res.tt_chung.map((item, index) => {
                  item.stt = index + 1;
                  item.chi_tiet = item.chi_tiet.map((item, index) => {
                    item.stt = index + 1;
                    return item;
                  });
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
      <ReactTable
        columns={columns}
        data={data}
        renderRowSub={renderRowSubComponent}
      />
    ) : (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h3>Sinh viên đang thực hiện tốt quá trình học tập</h3>
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

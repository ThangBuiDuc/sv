import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Spinner } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Input,
} from "@nextui-org/react";
// import { getText } from "number-to-text-vietnamese";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

async function createInvoice(invoice, token) {
  const res = await fetch(import.meta.env.VITE_APP_CREATE_INVOICE, {
    method: "POST",
    headers: {
      "content-type": "Application/json",
    },
    body: JSON.stringify({ invoice, token }),
  });

  if (!res.ok) throw new Error();

  return res.json();
}

async function getUnSubmitted(token) {
  const res = await fetch(import.meta.env.VITE_APP_API_UNSUBMITTED, {
    method: "GET",
    headers: {
      "content-type": "Application/json",
      authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error();

  return res.json();
}

async function getBank() {
  const res = await fetch(import.meta.env.VITE_APP_API_BANK, {
    method: "GET",
    headers: {
      "content-type": "Application/json",
    },
  });
  if (!res.ok) throw new Error();

  return res.json();
}

const Handle = ({ bank, unSubmitted, hocky, isRefetching }) => {
  const client = useQueryClient();
  const { user } = useUser();
  const { getToken } = useAuth();
  const [selected, setSelected] = useState("manual");
  const [value, setValue] = useState(new Set(["HDBank"]));
  const total = unSubmitted.reduce((total, curr) => total + curr.thieu, 0);
  const [selectedKeys, setSelectedKeys] = useState("all");
  const [amount, setAmount] = useState(0);
  const [invoice, setInvoice] = useState(null);
  const [mutating, setMutating] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [messages, setMessages] = useState();

  useEffect(() => {
    const socket = new WebSocket("wss://api.hpu.edu.vn");

    socket.addEventListener("open", () => {
      console.log("WebSocket connection established");
    });

    socket.addEventListener("message", (event) => {
      console.log("Message from server:", event.data);
      const data = JSON.parse(event.data);

      // Update the state with the new message
      setMessages(data);
    });

    socket.addEventListener("close", () => {
      console.log("WebSocket connection closed");
    });

    socket.addEventListener("error", (error) => {
      console.error("WebSocket error:", error);
    });

    return () => {
      socket.close();
    };
  }, []);

  console.log(messages);
  // const liveInvoice = useSubscription(gql`
  //   subscription MySubscription {
  //     bank {
  //       name
  //     }
  //   }
  // `);
  console.log(invoice);
  // console.log(liveInvoice);

  useEffect(() => {
    if (messages) {
      if (messages.uuid === invoice?.invoice_uuid) {
        if (messages.status_id === 2) {
          client.invalidateQueries(["unsubmited"]);
          onClose();
          toast.success("Thanh toán thành công!", {
            duration: Infinity,
            important: true,
          });
          setInvoice(null);
        }

        // if (messages.status_id === 2 && messages.edu_status_id !== 2) {
        //   client.invalidateQueries(["unsubmited"]);
        //   onClose();
        //   toast.error(
        //     "Thanh toán thành công nhưng hệ thống đã gặp lỗi trong quá trình gạch nợ!",
        //     {
        //       duration: Infinity,
        //       important: true,
        //     }
        //   );
        //   setInvoice(null);
        // }
      }
    }
  }, [messages]);

  // client.query();

  const mutation = useMutation({
    mutationFn: async (data) => createInvoice(data.invoice, data.token),
    onSuccess: (res) => {
      setMutating(false);
      setInvoice(res);
      onOpen();
      // toast.success("Đã có lỗi xảy ra. Vui lòng thử lại!");
    },
    onError: (_) => {
      setMutating(false);
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại!", {
        duration: Infinity,
        important: true,
      });
    },
  });

  const handleOnClick = async () => {
    setMutating(true);
    if (selected === "manual") {
      const invoice_detail = unSubmitted.reduce(
        (total, curr) =>
          selectedKeys === "all"
            ? [
                ...total,
                {
                  revenue_code: curr.maKhoanThu.trim(),
                  amount: curr.thieu,
                  ten: curr.khoan_thu.Ten,
                },
              ]
            : selectedKeys.has(curr.maKhoanThu.trim())
            ? [
                ...total,
                {
                  revenue_code: curr.maKhoanThu.trim(),
                  amount: curr.thieu,
                  ten: curr.khoan_thu.Ten,
                },
              ]
            : total,
        []
      );

      const invoice = {
        hoc_ky: hocky[0].HocKy,
        nam_hoc: hocky[0].MaNamHoc,
        student_code: user.publicMetadata.masv,
        student_name: user.publicMetadata.fullname,
        type: 1,
        transactionAmount: unSubmitted.reduce(
          (total, curr) =>
            selectedKeys === "all"
              ? total + curr.thieu
              : selectedKeys.has(curr.maKhoanThu.trim())
              ? total + curr.thieu
              : total,
          0
        ),
        transactionDescription: `${user.publicMetadata.masv}`,
        EduTransactionDescription: invoice_detail
          .map((item) => `${item.ten.trim()}: ${item.amount}`)
          .join("; "),
        detail: invoice_detail.map((item) => ({
          revenue_code: item.revenue_code,
          amount: item.amount,
        })),
      };

      mutation.mutate({
        invoice,
        token: await getToken({
          template: import.meta.env.VITE_APP_HASURA_PAY_TEMPLATE,
        }),
      });
    } else {
      const invoice = {
        hoc_ky: hocky[0].HocKy,
        nam_hoc: hocky[0].MaNamHoc,
        student_code: user.publicMetadata.masv,
        student_name: user.publicMetadata.fullname,
        type: 2,
        transactionAmount: amount,
        transactionDescription: `${user.publicMetadata.masv}`,
      };

      mutation.mutate({
        invoice,
        token: await getToken({
          template: import.meta.env.VITE_APP_HASURA_PAY_TEMPLATE,
        }),
      });
    }
    // const invoice =
  };

  //   console.log(selectedKeys.has("CN-GT"));
  return (
    <>
      <div className="flex gap-10 w-full flex-col md:flex-row">
        {/* <RadioGroup
          label="Lựa chọn cách nộp tiền"
          value={selected}
          onValueChange={setSelected}
          orientation="horizontal"
        >
          <Radio value="manual">Thủ công</Radio>
          <Radio value="auto">Tự động</Radio>
        </RadioGroup> */}
        <Select
          label="Ngân hàng"
          variant="bordered"
          selectedKeys={value}
          className="max-w-xs"
          onSelectionChange={setValue}
          defaultSelectedKeys={value}
        >
          {bank.map((item) => (
            <SelectItem key={item.code}>{item.name}</SelectItem>
          ))}
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <h5 className="font-normal text-sm md:text-lg">
          Tổng số tiền phải đóng:{" "}
          <span className="font-semibold">{numberWithCommas(total)}đ</span>
        </h5>
        <Table
          color="primary"
          aria-label="Bảng những khoản còn thiếu"
          isHeaderSticky
          isStriped
          // selectionMode={selected === "manual" ? "multiple" : "none"}
          // selectedKeys={selectedKeys}
          // onSelectionChange={setSelectedKeys}
          className="w-full"
        >
          <TableHeader>
            <TableColumn>STT</TableColumn>
            <TableColumn>Tên khoản</TableColumn>
            {/* <TableColumn>Số tiền quy định</TableColumn> */}
            {/* <TableColumn>Số tiền thay đổi</TableColumn>
            <TableColumn>Số tiền miễn giảm</TableColumn>
            <TableColumn>Số tiền kỳ trước chuyển sang</TableColumn>
            <TableColumn>Số tiền đã thu</TableColumn>
            <TableColumn>Số tiền phải chi</TableColumn>
            <TableColumn>Số tiền đã chi</TableColumn>
            <TableColumn>Số tiền chuyển sang kỳ sau</TableColumn> */}
            <TableColumn>Số tiền thiếu</TableColumn>
          </TableHeader>
          <TableBody
            emptyContent="Sinh viên hiện tại không có khoản cần đóng!"
            isLoading={isRefetching}
            loadingContent={<Spinner />}
          >
            {unSubmitted.map((item, index) => (
              <TableRow key={item.maKhoanThu.trim()}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.khoan_thu.Ten.trim()}</TableCell>
                {/* <TableCell>{numberWithCommas(item.soTienQuyDinh)}</TableCell> */}
                {/* <TableCell>{numberWithCommas(item.SoTienThayDoi)}</TableCell>
                <TableCell>{numberWithCommas(item.soTienMienGiam)}</TableCell>
                <TableCell>
                  {numberWithCommas(item.SoTienKyTruocChuyenSang)}
                </TableCell>
                <TableCell>{numberWithCommas(item.SoTienDaThu)}</TableCell>
                <TableCell>{numberWithCommas(item.SoTienPhaiChi)}</TableCell>
                <TableCell>{numberWithCommas(item.SoTienDaChi)}</TableCell>
                <TableCell>
                  {numberWithCommas(item.SoTienChuyenSangKySau)}
                </TableCell> */}
                <TableCell>{numberWithCommas(item.thieu)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col">
        {/* <h5>Tổng số tiền phải đóng bằng chữ: {getText(total)} đồng</h5> */}

        {selected === "manual" ? (
          <h5 className="font-normal text-sm md:text-lg">
            Tổng số tiền phải đóng lần này:{" "}
            <span className="font-semibold">
              {numberWithCommas(
                unSubmitted.reduce(
                  (total, curr) =>
                    selectedKeys === "all"
                      ? total + curr.thieu
                      : selectedKeys.has(curr.maKhoanThu.trim())
                      ? total + curr.thieu
                      : total,
                  0
                )
              )}{" "}
              đ
            </span>
          </h5>
        ) : (
          <>
            <div className="flex gap-2 md:items-center w-full md:flex-row flex-col">
              <h5 className="font-normal text-sm text-left md:text-lg">
                Tổng số tiền phải đóng lần này:
              </h5>
              <Input
                label="Tổng tiền"
                variant="bordered"
                type="number"
                placeholder="Nhập số tiền cần thanh toán tự động"
                className="md:w-[50%]"
                value={amount}
                onValueChange={(e) => setAmount(e > total ? total : e)}
                endContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">đ</span>
                  </div>
                }
              />
            </div>
          </>
        )}
        {mutating ? (
          <Spinner className="self-center mt-4" />
        ) : (
          <Button
            isDisabled={
              isRefetching || selected === "manual"
                ? selectedKeys.size === 0
                  ? true
                  : false
                : amount > 0
                ? false
                : true
            }
            color="primary"
            className="w-fit self-center mt-4"
            onClick={() => handleOnClick()}
          >
            Thanh toán
          </Button>
        )}
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="blur"
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Thực hiện thanh toán sử dụng mã QR
              </ModalHeader>
              <ModalBody>
                <img src={`data:image/jpeg;base64,${invoice.qrCode}`} />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Đóng
                </Button>
                {/* <Button color="primary" onPress={onClose}>
                  Action
                </Button> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
const Content = () => {
  const { getToken } = useAuth();
  const unSubmitted = useQuery({
    queryKey: ["unsubmited"],
    queryFn: async () =>
      getUnSubmitted(
        await getToken({
          template: import.meta.env.VITE_APP_HASURA_PAY_TEMPLATE,
        })
      ),
  });
  const bank = useQuery({ queryKey: ["bank"], queryFn: () => getBank() });

  if (
    unSubmitted.isLoading ||
    unSubmitted.isFetching ||
    bank.isLoading ||
    bank.isFetching
  )
    return <Spinner className="self-center" />;

  if (unSubmitted.isError || bank.isError)
    return <h5 className="text-center">Đã có lỗi xảy ra. Vui lòng thử lại!</h5>;

  // console.log(unSubmitted.data.hocky);
  return (
    <Handle
      isRefetching={unSubmitted.isRefetching}
      hocky={unSubmitted.data.hocky}
      bank={bank.data.results}
      unSubmitted={unSubmitted.data.khoan
        .reduce(
          (total, curr) => [
            ...total,
            {
              ...curr,
              thieu:
                curr.soTienQuyDinh +
                curr.SoTienDaChi +
                curr.SoTienKyTruocChuyenSang +
                curr.SoTienThayDoi -
                curr.soTienMienGiam -
                curr.SoTienDaThu,
            },
          ],
          []
        )
        .filter((item) => item.thieu > 0)}
    />
  );
};

export default Content;

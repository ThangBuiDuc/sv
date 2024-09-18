import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {
  faUser as fauser1,
  faNoteSticky,
} from "@fortawesome/free-regular-svg-icons";
import {
  MdFamilyRestroom,
  MdShowChart,
  MdOutlineSmsFailed,
} from "react-icons/md";
import {
  BsTag,
  BsBook,
  BsCoin,
  BsCalendarCheck,
  BsCalendar2Check,
  BsFillPersonLinesFill,
  BsFillPersonCheckFill,
} from "react-icons/bs";
import { AiOutlineLineChart, AiOutlineCalendar } from "react-icons/ai";
// import {AiOutlineTrophy} from 'react-icons/ai'
import {
  MdAttachMoney,
  MdMoneyOff,
  MdOutlineScore,
  //MdMoneyOffCsred
} from "react-icons/md";
// import { GiMoneyStack } from "react-icons/gi";
import { BiChart } from "react-icons/bi";
import { RiErrorWarningLine, RiSurveyFill, RiSurveyLine } from "react-icons/ri";
// import { TbCrown } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
// import { IoLibraryOutline } from "react-icons/io5";
import { TbReportMoney } from "react-icons/tb";
import { GrScorecard } from "react-icons/gr";

export const sideBarData = [
  {
    title: "Học tập",
    icon: <BsBook />,
    path: "/study",
    subNav: [
      {
        title: "Chương trình đào tạo",
        path: "/study/program",
        icon: <AiOutlineLineChart />,
      },
      {
        title: "Điểm học tập",
        path: "/study/score",
        icon: <BiChart />,
      },
      {
        title: "Điểm tổng kết",
        path: "/study/avg",
        icon: <GrScorecard />,
      },
      // {
      //   title: "Điểm rèn luyện",
      //   path: "/study/trainscore",
      //   icon: <MdShowChart />,
      // },
      // {
      //     title:'Học bổng',
      //     path: '/study/scholarship',
      //     icon: <AiOutlineTrophy/>
      // },
      // {
      //   title: "Cảnh báo học vụ",
      //   path: "/study/warning",
      //   icon: <RiErrorWarningLine />,
      // },
      {
        title: "Nợ môn",
        path: "/study/owe",
        icon: <MdOutlineSmsFailed />,
      },
      // {
      //     title:'Đồ án tốt nghiệp',
      //     path : '/study/graduation',
      //     icon: <TbCrown/>
      // }
    ],
  },
  {
    title: "Tài chính",
    path: "/money",
    icon: <BsCoin />,
    subNav: [
      {
        title: "Khoản đã nộp",
        path: "/money/submitted",
        icon: <MdAttachMoney />,
      },
      {
        title: "Khoản còn thiếu",
        path: "/money/unSubmitted",
        icon: <MdMoneyOff />,
      },
      {
        title: "Môn học đã đăng ký",
        path: "/money/subject",
        icon: <TbReportMoney />,
      },
      // {
      //     title: 'Khoản còn thiếu kỳ phụ',
      //     path: '/money/unSubmittedSubSession',
      //     icon : <MdMoneyOffCsred/>
      // },
      // {
      //     title: 'Các khoản KSSV',
      //     path : '/money/dormitory',
      //     icon: <GiMoneyStack/>
      // }
    ],
  },
  {
    title: "Sơ yếu lý lịch",
    icon: <FontAwesomeIcon icon={faUser} />,
    path: "/resume",
    subNav: [
      {
        title: "Thông tin cá nhân",
        path: "/resume/userinformation",
        icon: <FontAwesomeIcon icon={fauser1} />,
      },
      {
        title: "Ngành học",
        path: "/resume/major",
        icon: <BsTag />,
      },
      {
        title: "Gia đình",
        path: "/resume/family",
        icon: <MdFamilyRestroom />,
      },
      {
        title: "Giấy tờ nhập học",
        path: "/resume/paper",
        icon: <FontAwesomeIcon icon={faNoteSticky} />,
      },
    ],
  },
  {
    title: "Lịch",
    icon: <SlCalender />,
    path: "/calendar",
    subNav: [
      // {
      //   title: "Lịch học",
      //   path: "/calendar/study",
      //   icon: <BsCalendarCheck />,
      // },
      {
        title: "Lịch thi",
        path: "/calendar/test",
        icon: <BsCalendar2Check />,
      },
      {
        title: "Thời khoá biểu chung",
        path: "/calendar/tkb",
        icon: <AiOutlineCalendar />,
      },
    ],
  },
  // {
  //     title:'Thư viện',
  //     icon : <IoLibraryOutline/>,
  //     path : '/library',
  //     subNav : [
  //         {
  //             title: 'Trạng thái mượn',
  //             path : '/library/search',
  //             icon : <TbReportSearch/>
  //         }
  //     ]

  // },
  {
    title: "Rèn luyện",
    icon: <MdOutlineScore />,
    path: "/trainscore",
    subNav: [
      {
        title: "Điểm rèn luyện",
        path: "/trainscore/legacy",
        icon: <MdShowChart />,
      },
      {
        title: "Tự đánh giá",
        path: "/trainscore/selftest",
        icon: <BsFillPersonLinesFill />,
      },
      {
        title: "Cán bộ đánh giá",
        path: "/trainscore/monitortest",
        icon: <BsFillPersonCheckFill />,
      },
    ],
  },
  {
    title: "Khảo sát",
    icon: <RiSurveyFill />,
    path: "/survey",
    subNav: [
      {
        title: "Phản hồi CTGD",
        path: "/survey/subjectSurvey",
        icon: <RiSurveyLine />,
      },
    ],
  },
];

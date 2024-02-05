import { Button, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import user1 from "../assets/images/users/user4.jpg";
import probg from "../assets/images/bg/download.jpg";

const navigation = [
  {
    title: "메인뷰",
    href: "/starter",
    icon: "bi bi-speedometer2",
  },
  {
    title: "공지사항",
    href: "/alerts",
    icon: "bi bi-bell",
  },
  {
    title: "노동자 관리",
    href: "/table",
    icon: "bi bi-layout-split",
  },
  {
    title: "일정 관리",
    href: "/cards",
    icon: "bi bi-card-text",
  },
/*  {
    title: "작업 허가",
    href: "/pdflist",
    icon: "bi bi-patch-check",
  },
  {
    title: "로그인",
    href: "/login",
    icon: "bi bi-textarea-resize",
  },*/
];
/*
 {
    title: "Breadcrumbs",
    href: "/breadcrumbs",
    icon: "bi bi-link",
  },
  {
    title: "Buttons",
    href: "/buttons",
    icon: "bi bi-hdd-stack",
  },

  {
    title: "Grid",
    href: "/grid",
    icon: "bi bi-columns",
  },
*/
const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  const reload = () =>{
    location.reload();
  }
  const location = useLocation();

  return (
    <div>
      <div className="d-flex align-items-center"></div>
      <div
        className="profilebg"
        style={{ background: `url(${probg}) no-repeat` }}
      >
        <div className="p-3 d-flex">
          <img src={user1} alt="user" width="50" className="rounded-circle" />
          <Button
            color="white"
            className="ms-auto text-white d-lg-none"
            onClick={() => showMobilemenu()}
          >
            <i className="bi bi-x"></i>
          </Button>
        </div>
        <div className="bg-dark text-white p-2 opacity-75">관리자</div>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ?  "active nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;

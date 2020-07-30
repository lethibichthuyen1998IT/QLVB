/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UpgradeToPro from "views/Upgrade.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";



import UserPage from "views/User.js";
import DanhMucNhanVien from "components/NhanVien/DanhMucNhanVien";
import DanhMucDonVi from "components/DonVi/DanhMucDonVi";
import DanhMucDoQuanTrong from "components/DoQuanTrong/DanhMucDoQuanTrong";
import DanhMucNoiPhatHanh from "components/NoiPhatHanh/DanhMucNoiPhatHanh";
import DanhMucLoaiVanBan from "components/LoaiVB/DanhMucLoaiVanBan";
import DanhMucLinhVuc from "components/LinhVuc/DanhMucLinhVuc";
import DanhMucChucNang from "components/ChucNang/DanhMucChucNang";
import LayVB from "components/VanBan/LayVB";
import AddVB from "components/VanBan/AddVB";
import Lichlamviecs from "components/Lichlamviec/Lichlamviecs";
import AddCongViec from "components/CongViec/AddCongViec";



var routes = [
  
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
    },

    {
        path: "/vanban/index",
        icon: "nc-icon nc-tile-56",
        name: "Văn bản",
        component: LayVB,
        layout: "/admin",
    },
    {
        path: "/vanban/themvb",
        icon: "nc-icon nc-tile-56",
        name: "Phát hành Văn bản",
        component: AddVB,
        layout: "/admin",
    },
  {
    path: "/ThemCV",
    name: "Thêm công việc",
      icon: "nc-icon nc-diamond",
      component: AddCongViec,
    layout: "/admin",
  },

  
  {
      path: "/Lichlamviec",
    name: "Lịch làm việc",
    icon: "nc-icon nc-tile-56",
      component: Lichlamviecs,
    layout: "/admin",
    },
    {
        path: "/nhanvien/index",
        name: "Nhân Viên",
        icon: "nc-icon nc-badge",
        component: DanhMucNhanVien,
        layout: "/admin",
    },
    {
        path: "/donvi/index",
        name: "Đơn Vị",
        icon: "nc-icon nc-tile-56",
        component: DanhMucDonVi,
        layout: "/admin",
    },
    {
        path: "/doquantrong/index",
        name: "Độ Quan Trọng",
        icon: "nc-icon nc-tile-56",
        component: DanhMucDoQuanTrong,
        layout: "/admin",
    },
    {
        path: "/noiphathanh/index",
        name: "Nơi phát hành",
        icon: "nc-icon nc-tile-56",
        component: DanhMucNoiPhatHanh,
        layout: "/admin",
    },
    {
        path: "/loaivanban/index",
        name: "Loại văn bản",
        icon: "nc-icon nc-tile-56",
        component: DanhMucLoaiVanBan,
        layout: "/admin",
    },
    {
        path: "/linhvuc/index",
        name: "Lĩnh Vực",
        icon: "nc-icon nc-tile-56",
        component: DanhMucLinhVuc,
        layout: "/admin",
    },
    {
        path: "/chucnang/index",
        name: "Chức Năng",
        icon: "nc-icon nc-tile-56",
        component: DanhMucChucNang,
        layout: "/admin",
    },

    {
        path: "/icons",
        name: "Icons",
        icon: "nc-icon nc-diamond",
        component: Icons,
        layout: "/admin",
    },

    {
        path: "/notifications",
        name: "Notifications",
        icon: "nc-icon nc-bell-55",
        component: Notifications,
        layout: "/admin",
    },
    {
        path: "/user-page",
        name: "User Profile",
        icon: "nc-icon nc-single-02",
        component: UserPage,
        layout: "/admin",
    },

   

];
export default routes;

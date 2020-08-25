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
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";



import UserPage from "views/User.js";

import DanhMucNhanVien  from "components/NhanVien/DanhMucNhanVien";
import DanhMucDonVi from "components/DonVi/DanhMucDonVi";
import DanhMucDoQuanTrong from "components/DoQuanTrong/DanhMucDoQuanTrong";
import DanhMucNoiPhatHanh from "components/NoiPhatHanh/DanhMucNoiPhatHanh";
import DanhMucLoaiVanBan from "components/LoaiVB/DanhMucLoaiVanBan";
import DanhMucLinhVuc from "components/LinhVuc/DanhMucLinhVuc";
import DanhMucChucNang from "components/ChucNang/DanhMucChucNang";
import DanhMucVaiTro from "components/VaiTro/DanhMucVaiTro";
import AddVB from "components/VanBan/AddVB";
import LayVB from "components/VanBan/LayVB";
import CongViec from "components/CongViec/CongViec";
import XuLyCongViec from "components/CongViec/XuLyCongViec";
var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
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
    name: "Thông tin cá nhân",
    icon: "nc-icon nc-single-02",
    component: UserPage,
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
        icon: "nc-icon nc-chart-pie-36",
        component: DanhMucDonVi,
        layout: "/admin",
    },
    {
        path: "/doquantrong/index",
        name: "Độ Quan Trọng",
        icon: "fas fa-exclamation-triangle",
        component: DanhMucDoQuanTrong,
        layout: "/admin",
    },
    {
        path: "/noiphathanh/index",
        name: "Nơi phát hành",
        icon: "nc-icon nc-istanbul",
        component: DanhMucNoiPhatHanh,
        layout: "/admin",
    },
    {
        path: "/loaivanban/index",
        name: "Loại văn bản",
        icon: "far fa-list-alt",
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
        icon: "fas fa-clipboard-list",
        component: DanhMucChucNang,
        layout: "/admin",
    },
    {
        path: "/vaitro/index",
        name: "Vai Trò",
        icon: "nc-icon nc-paper",
        component: DanhMucVaiTro,
        layout: "/admin",
    },
    {
        path: "/vanban/index",
        name: "Danh sách văn bản",
        icon: "far fa-file-alt",
        component: LayVB,
        layout: "/admin",
    },
    {
        path: "/vanban/create",
        name: "Tạo văn bản mới",
        icon: "fas fa-file-medical",
        component: AddVB,
        layout: "/admin",
    },
    {
        path: "/congviec/index",
        name: "Công việc",
        icon: "fas fa-file-medical",
        component: CongViec,
        layout: "/admin",
    },
    {
        path: "/congviec/xuly",
        name: "Xử lý công việc",
        icon: "fas fa-file-medical",
        component: CongViec,
        layout: "/admin",
    },
];
export default routes;

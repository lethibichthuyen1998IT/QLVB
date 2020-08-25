using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuanLy.DAL;
using QuanLy.DTO;
using QuanLy.Models;
using QuanLy.Services;

namespace QuanLy.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        QuanLyVanBanContext tb = new QuanLyVanBanContext();
        NhanVienDAL db = new NhanVienDAL();
        private IUserService _userService;
        private int id=0;
        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate(LoginDTO model)
        {
            var response = _userService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Sai tài khoản hoặc mật khẩu" });
            id = int.Parse(response.Idnv.ToString());
            return Ok(response);
        }

        
        [HttpPut("{id}")]
      
        public int Edit(Nhanvien employee)
        {
            Nhanvien nv = tb.Nhanvien.Find(employee.Idnv);
            nv.Manv = nv.Manv;
            nv.Username = nv.Username;
            nv.Password = nv.Password;
            nv.Iddonvi = nv.Iddonvi;
            nv.Idvaitro = nv.Idvaitro;
            nv.Hoten = employee.Hoten;
            nv.Sdt = employee.Sdt;
            nv.Diachi = employee.Diachi;
            nv.Ngaysinh = employee.Ngaysinh;
            return db.UpdateEmployee(nv.Idnv, nv);
        }

    }
}

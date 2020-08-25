using QuanLy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuanLy.DTO
{
    public class AuthenticateResponse
    {
        public int Idnv { get; set; }
        public int Iddonvi { get; set; }

        public string Idvaitro { get; set; }
        public string Manv { get; set; }
        public string Hoten { get; set; }
        public string Sdt { get; set; }
        public DateTime? Ngaysinh { get; set; }
        public string Diachi { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public bool? Daxoa { get; set; }
        public string Token { get; set; }


        public AuthenticateResponse(Nhanvien user, string token)
        {
            Idnv = user.Idnv;
            Manv = user.Manv;
            Idvaitro = user.Idvaitro;
            Iddonvi = user.Iddonvi;
            Sdt = user.Sdt;
            Hoten = user.Hoten;
            Diachi = user.Diachi;
            Ngaysinh = user.Ngaysinh;
            Username = user.Username;
            Password = user.Password;
            Daxoa = user.Daxoa;
            Token = token;
        }
    }
}

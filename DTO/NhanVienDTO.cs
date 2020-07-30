using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QuanLy.DTO
{
    public class NhanVienDTO
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
        public string Tendonvi { get; set; }
        public string Tenvaitro { get; set; }
    }
}

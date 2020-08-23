using System;
using System.Collections.Generic;

namespace QuanLy.Models
{
    public partial class Nhanvien
    {
        public Nhanvien()
        {
            Nvbutphe = new HashSet<Nvbutphe>();
            Quyenvb = new HashSet<Quyenvb>();
            Thanhphanthamdu = new HashSet<Thanhphanthamdu>();
            Vanban = new HashSet<Vanban>();
            Xulycongviec = new HashSet<Xulycongviec>();
        }

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

        public virtual Donvi IddonviNavigation { get; set; }
        public virtual Vaitro IdvaitroNavigation { get; set; }
        public virtual ICollection<Nvbutphe> Nvbutphe { get; set; }
        public virtual ICollection<Quyenvb> Quyenvb { get; set; }
        public virtual ICollection<Thanhphanthamdu> Thanhphanthamdu { get; set; }
        public virtual ICollection<Vanban> Vanban { get; set; }
        public virtual ICollection<Xulycongviec> Xulycongviec { get; set; }
    }
}

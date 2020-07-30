using System;
using System.Collections.Generic;

namespace QuanLy.Models
{
    public partial class Vaitro
    {
        public Vaitro()
        {
            Nhanvien = new HashSet<Nhanvien>();
            Quyen = new HashSet<Quyen>();
        }

        public string Idvaitro { get; set; }
        public string Tenvaitro { get; set; }

        public virtual ICollection<Nhanvien> Nhanvien { get; set; }
        public virtual ICollection<Quyen> Quyen { get; set; }
    }
}

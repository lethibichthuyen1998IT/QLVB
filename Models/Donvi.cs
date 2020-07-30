using System;
using System.Collections.Generic;

namespace QuanLy.Models
{
    public partial class Donvi
    {
        public Donvi()
        {
            Nhanvien = new HashSet<Nhanvien>();
        }

        public int Iddonvi { get; set; }
        public string Madonvi { get; set; }
        public string Tendonvi { get; set; }

        public virtual ICollection<Nhanvien> Nhanvien { get; set; }
    }
}

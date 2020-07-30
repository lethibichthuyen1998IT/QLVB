using System;
using System.Collections.Generic;

namespace QuanLy.Models
{
    public partial class Quyenvb
    {
        public string Idquyenvb { get; set; }
        public int Idnv { get; set; }
        public string Idvb { get; set; }
        public string Quyen { get; set; }
        public bool? Daxuly { get; set; }

        public virtual Nhanvien IdnvNavigation { get; set; }
        public virtual Vanban IdvbNavigation { get; set; }
    }
}

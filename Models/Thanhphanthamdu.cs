using System;
using System.Collections.Generic;

namespace QuanLy.Models
{
    public partial class Thanhphanthamdu
    {
        public string Idlich { get; set; }
        public int Idnv { get; set; }

        public virtual Lichlamviec IdlichNavigation { get; set; }
        public virtual Nhanvien IdnvNavigation { get; set; }
    }
}

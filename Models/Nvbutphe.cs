using System;
using System.Collections.Generic;

namespace QuanLy.Models
{
    public partial class Nvbutphe
    {
        public int Idnv { get; set; }
        public string Idbutphe { get; set; }

        public virtual Butphe IdbutpheNavigation { get; set; }
        public virtual Nhanvien IdnvNavigation { get; set; }
    }
}

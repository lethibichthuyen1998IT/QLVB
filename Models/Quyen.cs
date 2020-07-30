using System;
using System.Collections.Generic;

namespace QuanLy.Models
{
    public partial class Quyen
    {
        public string Idvaitro { get; set; }
        public string Idcn { get; set; }
        public bool? Trangthai { get; set; }

        public virtual Chucnang IdcnNavigation { get; set; }
        public virtual Vaitro IdvaitroNavigation { get; set; }
    }
}

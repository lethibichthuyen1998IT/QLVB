using System;
using System.Collections.Generic;

namespace QuanLy.Models
{
    public partial class Xulycongviec
    {
        public string Idcongviec { get; set; }
        public int Idnv { get; set; }
        public bool? Trangthaixuly { get; set; }

        public virtual Congviec IdcongviecNavigation { get; set; }
        public virtual Nhanvien IdnvNavigation { get; set; }
       
    }
    
}

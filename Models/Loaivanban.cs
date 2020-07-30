using System;
using System.Collections.Generic;

namespace QuanLy.Models
{
    public partial class Loaivanban
    {
        public Loaivanban()
        {
            Vanban = new HashSet<Vanban>();
        }

        public int Idloai { get; set; }
        public string Maloai { get; set; }
        public string Tenloai { get; set; }

        public virtual ICollection<Vanban> Vanban { get; set; }
    }
}

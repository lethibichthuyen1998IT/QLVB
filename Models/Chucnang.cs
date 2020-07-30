using System;
using System.Collections.Generic;

namespace QuanLy.Models
{
    public partial class Chucnang
    {
        public Chucnang()
        {
            Quyen = new HashSet<Quyen>();
        }

        public string Idcn { get; set; }
        public string Tencn { get; set; }

        public virtual ICollection<Quyen> Quyen { get; set; }
    }
}

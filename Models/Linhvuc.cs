using System;
using System.Collections.Generic;

namespace QuanLy.Models
{
    public partial class Linhvuc
    {
        public Linhvuc()
        {
            Congviec = new HashSet<Congviec>();
        }

        public string Idlv { get; set; }
        public string Tenlv { get; set; }

        public virtual ICollection<Congviec> Congviec { get; set; }
    }
}

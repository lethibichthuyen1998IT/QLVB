using System;
using System.Collections.Generic;

namespace QuanLy.Models
{
    public partial class Hoso
    {
        public Hoso()
        {
            Congviec = new HashSet<Congviec>();
        }

        public string Idhoso { get; set; }
        public string Tenhoso { get; set; }

        public virtual ICollection<Congviec> Congviec { get; set; }
    }
}

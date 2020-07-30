using System;
using System.Collections.Generic;

namespace QuanLy.Models
{
    public partial class Doquantrong
    {
        public Doquantrong()
        {
            Congviec = new HashSet<Congviec>();
        }

        public string Iddqt { get; set; }
        public string Tendqt { get; set; }

        public virtual ICollection<Congviec> Congviec { get; set; }
    }
}

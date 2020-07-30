using System;
using System.Collections.Generic;

namespace QuanLy.Models
{
    public partial class Noiphathanh
    {
        public Noiphathanh()
        {
            Vanban = new HashSet<Vanban>();
        }

        public string Idph { get; set; }
        public string Tenph { get; set; }

        public virtual ICollection<Vanban> Vanban { get; set; }
    }
}

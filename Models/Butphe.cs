using System;
using System.Collections.Generic;

namespace QuanLy.Models
{
    public partial class Butphe
    {
        public Butphe()
        {
            Nvbutphe = new HashSet<Nvbutphe>();
        }

        public string Idbutphe { get; set; }
        public string Noidungbutphe { get; set; }
        public DateTime? Ngaybutphe { get; set; }
        public string Idvb { get; set; }

        public virtual Vanban IdvbNavigation { get; set; }
        public virtual ICollection<Nvbutphe> Nvbutphe { get; set; }
    }
}

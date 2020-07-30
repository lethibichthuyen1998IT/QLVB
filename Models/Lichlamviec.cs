using System;
using System.Collections.Generic;

namespace QuanLy.Models
{
    public partial class Lichlamviec
    {
        public Lichlamviec()
        {
            Thanhphanthamdu = new HashSet<Thanhphanthamdu>();
        }

        public string Idlich { get; set; }
        public string Noidungcv { get; set; }
        public string Diadiem { get; set; }
        public DateTime? Ngaybd { get; set; }
        public string Giobd { get; set; }
        public string Giokt { get; set; }
        public string Thanhphankhac { get; set; }

        public virtual ICollection<Thanhphanthamdu> Thanhphanthamdu { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace QuanLy.Models
{
    public partial class Congviec
    {
        public Congviec()
        {
            Xulycongviec = new HashSet<Xulycongviec>();
        }

        public string Idcongviec { get; set; }
        public string Idlv { get; set; }
        public string Iddqt { get; set; }
        public string Idhoso { get; set; }
        public string Tieude { get; set; }
        public DateTime? Hanxuly { get; set; }
        public float? Tyleht { get; set; }
        public string Filedinhkem { get; set; }
        public DateTime? Ngaygiomo { get; set; }
        public DateTime? Ngaygioht { get; set; }

        public virtual Doquantrong IddqtNavigation { get; set; }
        public virtual Hoso IdhosoNavigation { get; set; }
        public virtual Linhvuc IdlvNavigation { get; set; }
        public virtual ICollection<Xulycongviec> Xulycongviec { get; set; }
    }
}

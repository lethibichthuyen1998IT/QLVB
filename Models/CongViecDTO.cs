using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuanLy.DTO
{
    public class CongViecDTO
    {
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
        public string Tendqt { get; set; }
        public string Tenhoso { get; set; }
        public string Tenlv { get; set; }
    }
}

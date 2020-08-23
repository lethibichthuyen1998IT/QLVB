using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QuanLy.Models
{
    public partial class VanBanDTO
    {
       [Key]
        public string Idvb { get; set; }
        public string Tenph { get; set; }
      
        public string Idph { get; set; }
        public string Hoten { get; set; }
        public string Tenloai { get; set; }
        public int Idloai { get; set; }
        public string Sovb { get; set; }
        public string Trichyeu { get; set; }
        public string File { get; set; }
        public DateTime? Ngayky { get; set; }
        public DateTime? Ngaygoi { get; set; }
        public DateTime? Ngaynhan { get; set; }
        public string Nguoiky { get; set; }
        public int? Idnv { get; set; }
        public virtual Loaivanban IdloaiNavigation { get; set; }
        public virtual Noiphathanh IdphNavigation { get; set; }
        public virtual Nhanvien IdnvNavigation { get; set; }
    }
}

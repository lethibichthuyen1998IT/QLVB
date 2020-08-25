using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuanLy.DTO;
using QuanLy.Models;
using QuanLy.DAL;

namespace QuanLy.Controllers
{
   
    [ApiController]
    public class CongViecController : ControllerBase
    {
        QuanLyVanBanContext db = new QuanLyVanBanContext();
        CongViecDAL dal = new CongViecDAL();
        [HttpGet]
        [Route("CongViec/Index")]
        public IEnumerable<CongViecDTO> Index()
        {
            var cv = from a in db.Congviec
                     join b in db.Doquantrong on a.Iddqt equals b.Iddqt
                     join c in db.Hoso on a.Idhoso equals c.Idhoso
                     join d in db.Linhvuc on a.Idlv equals d.Idlv
                     select new CongViecDTO()
                     {
                         Idcongviec = a.Idcongviec,
                         Iddqt = b.Iddqt,
                         Idlv = d.Idlv,
                         Idhoso = c.Idhoso,
                         Tendqt = b.Tendqt,
                         Tieude = a.Tieude,
                         Tenhoso = c.Tenhoso,
                         Tenlv = d.Tenlv,
                         Hanxuly = a.Hanxuly,
                         Tyleht = a.Tyleht,
                         Ngaygiomo = a.Ngaygiomo,
                         Ngaygioht = a.Ngaygioht
                     };                  
            return cv.ToList();
        }
        //Insert
        [HttpPost]
        [Route("CongViec/AddCongViec")]
        public int AddCongViec(Congviec cv)
        {
            try
            {
                db.Congviec.Add(cv);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        [HttpGet]
        [Route("CongViec/GetLinhVuc")]
        public List<Linhvuc> GetLinhVuc()
        {
            List<Linhvuc> lv = new List<Linhvuc>();
            lv = (from a in db.Linhvuc select a).ToList();
            return lv;
        }
        [HttpGet]
        [Route("CongViec/GetHoSo")]
        public List<Hoso> GetHoSo()
        {
            List<Hoso> hs = new List<Hoso>();
            hs = (from b in db.Hoso select b).ToList();
            return hs;
        }
        [HttpGet]
        [Route("CongViec/GetDoQuanTrong")]
        public List<Doquantrong> GetDoQuanTrong()
        {
            List<Doquantrong> dqt = new List<Doquantrong>();
            dqt = (from c in db.Doquantrong select c).ToList();
            return dqt;
        }

        [HttpPut("{id}")]
        [Route("CongViec/Edit/{id}")]
        public int Edit(Congviec cv)
        {
            Congviec cvs = db.Congviec.Find(cv.Idcongviec);
                cvs.Idlv = cv.Idlv;
                cvs.Iddqt = cv.Iddqt;
                cvs.Idhoso = cv.Idhoso;
                
                cvs.Hanxuly = cv.Hanxuly;
                cvs.Ngaygioht = cv.Ngaygioht;
                cvs.Ngaygiomo = cv.Ngaygiomo;
                cvs.Tieude = cv.Tieude;
               
                cvs.Filedinhkem = cv.Filedinhkem;
                db.Entry(cvs).State = EntityState.Modified;
                db.SaveChanges();
                return dal.UpdateCV(cvs.Idcongviec, cvs);
        }





        [HttpDelete]
        [Route("CongViec/Delete/{id}")]
        public int Delete(string id)
        {
            try
            {

                Congviec cv = db.Congviec.Find(id);
                if (cv != null)
                {

                    db.Congviec.Remove(cv);
                    db.SaveChanges();
                    return 1;
                }
                else
                {
                    return 0;
                }
            }
            catch
            {
                throw;
            }
        }


        [HttpPost]
        [Route("CongViec/XuLyCongViec")]
        public int XuLyCongViec(Xulycongviec xlcv)
        {
            try
            {
                db.Xulycongviec.Add(xlcv);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        [HttpGet]
        [Route("CongViec/GetNhanVien")]
        public List<Nhanvien> GetNhanVien()
        {
            List<Nhanvien> nv = new List<Nhanvien>();
            nv = (from d in db.Nhanvien select d).ToList();
            return nv;
        }
    }
}

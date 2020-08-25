using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuanLy.DAL;
using QuanLy.DTO;
using QuanLy.Models;

namespace QuanLy.Controllers
{
   
    [ApiController]
    public class XuLyCongViecController : ControllerBase
    {
        QuanLyVanBanContext db = new QuanLyVanBanContext();
        XuLyCongViecDAL dal = new XuLyCongViecDAL();
        [HttpGet]
        [Route("XuLyCongViec/Index")]
        public IEnumerable<XuLyCongViecDTO> Index()
        {
            var xlcv = from a in db.Xulycongviec
                     join b in db.Congviec on a.Idcongviec equals b.Idcongviec
                     join c in db.Nhanvien on a.Idnv equals c.Idnv
                   
                     select new XuLyCongViecDTO()
                     {
                         Idcongviec = b.Idcongviec,
                         Idnv = c.Idnv,
                         Trangthaixuly = a.Trangthaixuly,
                         Tieude = b.Tieude,
                         Hoten = c.Hoten
                     };
            return xlcv.ToList();
        }
        //Insert
        [HttpPost]
        [Route("XuLyCongViec/GiaoViec")]
        public int GiaoViec([FromBody] Xulycongviec xlcv)
        {
            db.Xulycongviec.Add(xlcv);
            try
            {
                if (ModelState.IsValid)
                {
                    db.SaveChanges();
                }
                return 1;
            }
            catch (DbUpdateException)
            {
                throw;
            }
        }


        [HttpGet]
        [Route("XuLyCongViec/GetCongViec")]
        public List<Congviec> GetCongViec()
        {
            List<Congviec> cv = new List<Congviec>();
            cv = (from a in db.Congviec select a).ToList();
            return cv;
        }

        [HttpGet]
        [Route("XuLyCongViec/GetNhanVien")]
        public List<Nhanvien> GetNhanVien()
        {
            List<Nhanvien> nv = new List<Nhanvien>();
            nv = (from d in db.Nhanvien select d).ToList();
            return nv;
        }

        [HttpDelete]
        [Route("XuLyCongViec/Delete/{idcongviec}/{idnv}")]
        public int Delete(string idcongviec, int idnv)
        {
            try
            {

                Xulycongviec cv = db.Xulycongviec.Find(idcongviec,idnv);
                if (cv != null)
                {

                    db.Xulycongviec.Remove(cv);
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
    }
}

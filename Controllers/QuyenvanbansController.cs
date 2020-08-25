using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices.ComTypes;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuanLy.Models;

namespace QuanLy.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class QuyenvanbansController : ControllerBase
    {
        QuanLyVanBanContext db = new QuanLyVanBanContext();


        [HttpGet("{id}")]
        public IEnumerable<int> NhanVien(int id)
        {

            var nv = from a in db.Nhanvien where a.Iddonvi == id select a.Idnv; 
            return nv.ToList();

        }
        [HttpGet]
        public IEnumerable<int> getAll()
        {

            var all = from a in db.Nhanvien select a.Idnv;
            return all.ToList();

        }



        [HttpPost]
        public int Create([FromBody] Quyenvb qvb)
        {
            var idvb = (from a in db.Vanban orderby a.Idvb descending select a.Idvb).FirstOrDefault();
            qvb.Idvb = idvb;
            db.Quyenvb.Add(qvb);
          
               db.SaveChanges();
              
                return 1;

         
        }

        [HttpPut("{idvb}/{idnv}")]
        public int SuaQuyen(Quyenvb q,string idvb,int idnv)
        {
            var idquyen = (from a in db.Quyenvb where (a.Idnv == idnv && a.Idvb == idvb) select a.Idquyenvb).FirstOrDefault();
            q.Idquyenvb = idquyen;
            q.Idvb = idvb;
            q.Idnv = idnv;
            db.Entry(q).State = EntityState.Modified;
            db.SaveChanges();
            return 1;
        }
    }
}

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuanLy.Models;

namespace QuanLy.Controllers
{
    [Route("[controller]")]
    [ApiController]
  
    public class VanbansController : ControllerBase
    {
      
        QuanLyVanBanContext db = new QuanLyVanBanContext();
     
        [HttpGet]
        public IEnumerable<VanBanDTO> Index()
        {
          
            var vb = from a in db.Vanban
                         join b in db.Loaivanban on a.Idloai equals b.Idloai
                         join c in db.Noiphathanh on a.Idph equals c.Idph
                         select new VanBanDTO()
                         {
                             Idvb = a.Idvb,
                             Idph = a.Idph,
                             Idloai = a.Idloai,
                             Tenloai = b.Tenloai,
                             Tenph = c.Tenph,
                             Sovb = a.Sovb,
                             Trichyeu = a.Trichyeu,
                             File = a.File,
                             Ngayky = a.Ngayky,
                             Ngaygoi = a.Ngaygoi,
                             Ngaynhan = a.Ngaynhan,
                             Nguoiky = a.Nguoiky

                         };
                return vb.ToList();
            
        }
        public string auto_id()
        {
           
                int id;
                string autoID = "VB";
                if (db.Vanban.Count() == 0) id = 0;
                else
                {
                    var maxID = db.Vanban.Max(x => x.Idvb);
                    id = int.Parse(maxID.Substring(2));
                }
                id++;
                switch (id.ToString().Length)
                {
                    case 1:
                        autoID += "00" + id;
                        break;
                    case 2:
                        autoID += "0" + id;
                        break;
                    default:
                        autoID += id;
                        break;
                }
                return autoID;
            }
        [HttpPost]
        public int ThemVB([FromBody] Vanban vb)
        {
            vb.Idvb = auto_id();
            db.Vanban.Add(vb);
            db.SaveChanges();
            return 1;
        }


[HttpPut("{id}")]
        public int SuaVB(Vanban vb)
        {
          
           
            try
            {
               
                db.Entry(vb).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
       

        [HttpDelete("{id}")]
        public int Delete(string id)
        {
            try
            {
                Vanban vb = db.Vanban.Find(id);
                db.Vanban.Remove(vb);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
      



    }
}


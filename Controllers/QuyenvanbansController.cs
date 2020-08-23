using System;
using System.Collections.Generic;
using System.Linq;
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
        public string auto_id()
        {
            int id;
            string autoID = "Q";
            if (db.Quyenvb.Count() == 0) id = 0;
            else
            {
                var maxID = db.Quyenvb.Max(x => x.Idquyenvb);
                id = int.Parse(maxID.Substring(1));
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
        public int Create([FromBody] Quyenvb qvb)
        {
            var idvb = (from a in db.Vanban orderby a.Idvb descending select a.Idvb).FirstOrDefault();
            qvb.Idquyenvb = auto_id();
            qvb.Idvb = idvb;
            db.Quyenvb.Add(qvb);
          
               db.SaveChanges();
              
                return 1;

         
        }
    }
}

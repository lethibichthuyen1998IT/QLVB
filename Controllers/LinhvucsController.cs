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
    public class LinhvucsController : ControllerBase
    {
        QuanLyVanBanContext tb = new QuanLyVanBanContext();
        public string Auto_id()
        {
            int id;
            string autoID = "LV";
            if (tb.Linhvuc.Count() == 0) id = 0;
            else
            {
                var maxID = tb.Linhvuc.Max(x => x.Idlv);
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

        [HttpGet]
        public IEnumerable<Linhvuc> Index()
        {
            try
            {
                return tb.Linhvuc.ToList();
            }
            catch
            {
                throw;
            }
        }

        [HttpPost]
        public int Create([FromBody] Linhvuc lv)
        {

            lv.Idlv = Auto_id();

            tb.Linhvuc.Add(lv);
            try
            {
                if (ModelState.IsValid)
                {
                    tb.SaveChanges();
                }
                return 1;

            }
            catch (DbUpdateException)
            {
                throw;
            }
        }

        [HttpGet("{id}")]

        public Linhvuc Details(string id)
        {
            return tb.Linhvuc.Find(id);
        }

        [HttpPut("{id}")]

        public int Edit(Linhvuc lv)
        {
            Linhvuc lvs = tb.Linhvuc.Find(lv.Idlv);

            lvs.Tenlv = lv.Tenlv;
            try
            {
                tb.Entry(lvs).State = EntityState.Modified;
                tb.SaveChanges();
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

                Linhvuc lv = tb.Linhvuc.Find(id);

                if (lv != null)
                {

                    tb.Linhvuc.Remove(lv);
                    tb.SaveChanges();
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

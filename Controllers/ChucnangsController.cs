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
    public class ChucnangsController : ControllerBase
    {
        QuanLyVanBanContext tb = new QuanLyVanBanContext();
        public string Auto_id()
        {
            int id;
            string autoID = "CN";
            if (tb.Chucnang.Count() == 0) id = 0;
            else
            {
                var maxID = tb.Chucnang.Max(x => x.Idcn);
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
        public IEnumerable<Chucnang> Index()
        {
            try
            {
                return tb.Chucnang.ToList();
            }
            catch
            {
                throw;
            }
        }

        [HttpPost]
        public int Create([FromBody] Chucnang lv)
        {

            lv.Idcn = Auto_id();

            tb.Chucnang.Add(lv);
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

        public Chucnang Details(string id)
        {
            return tb.Chucnang.Find(id);
        }

        [HttpPut("{id}")]

        public int Edit(Chucnang lv)
        {
            Chucnang lvs = tb.Chucnang.Find(lv.Idcn);

            lvs.Tencn = lv.Tencn;
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

                Chucnang lv = tb.Chucnang.Find(id);

                if (lv != null)
                {

                    tb.Chucnang.Remove(lv);
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

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
    public class NoiphathanhsController : ControllerBase
    {
        QuanLyVanBanContext tb = new QuanLyVanBanContext();
        public string Auto_id()
        {
            int id;
            string autoID = "PH";
            if (tb.Noiphathanh.Count() == 0) id = 0;
            else
            {
                var maxID = tb.Noiphathanh.Max(x => x.Idph);
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
        public IEnumerable<Noiphathanh> Index()
        {
            try
            {
                return tb.Noiphathanh.ToList();
            }
            catch
            {
                throw;
            }
        }

        [HttpPost]
        public int Create([FromBody] Noiphathanh nph)
        {

            nph.Idph = Auto_id();

            tb.Noiphathanh.Add(nph);
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

        public Noiphathanh Details(string id)
        {
            return tb.Noiphathanh.Find(id);
        }

        [HttpPut("{id}")]

        public int Edit(Noiphathanh nph)
        {
            Noiphathanh nphs = tb.Noiphathanh.Find(nph.Idph);
         
            nphs.Tenph = nph.Tenph;
            try
            {
                tb.Entry(nphs).State = EntityState.Modified;
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

                Noiphathanh nph = tb.Noiphathanh.Find(id);

                if (nph != null)
                {

                    tb.Noiphathanh.Remove(nph);
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

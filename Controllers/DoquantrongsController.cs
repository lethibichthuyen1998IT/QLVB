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
    public class DoquantrongsController : ControllerBase
    {
        QuanLyVanBanContext tb = new QuanLyVanBanContext();
        public string Auto_id()
        {
            int id;
            string autoID = "DQT";
            if (tb.Doquantrong.Count() == 0) id = 0;
            else
            {
                var maxID = tb.Doquantrong.Max(x => x.Iddqt);
                id = int.Parse(maxID.Substring(3));
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

        public IEnumerable<Doquantrong> Index()
        {
            try
            {
                return tb.Doquantrong.ToList();
            }
            catch
            {
                throw;
            }
        }

        [HttpPost]
        public int Create([FromBody] Doquantrong dqt)
        {

            dqt.Iddqt = Auto_id();

            tb.Doquantrong.Add(dqt);
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

        public Doquantrong Details(string id)
        {
            return tb.Doquantrong.Find(id);
        }

        [HttpPut("{id}")]

        public int Edit(Doquantrong dqt)
        {
            Doquantrong dqts = tb.Doquantrong.Find(dqt.Iddqt);
            dqts.Tendqt = dqt.Tendqt;
            try
            {
                tb.Entry(dqts).State = EntityState.Modified;
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

                Doquantrong dqt = tb.Doquantrong.Find(id);

                if (dqt != null)
                {

                    tb.Doquantrong.Remove(dqt);
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

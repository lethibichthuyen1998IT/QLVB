using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.Xml;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuanLy.Models;

namespace QuanLy.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class DonvisController : ControllerBase
    {
        QuanLyVanBanContext tb = new QuanLyVanBanContext();
        public string Auto_id()
        {
            int id;
            string autoID = "DV";
            if (tb.Donvi.Count() == 0) id = 0;
            else
            {
                var maxID = tb.Donvi.Max(x => x.Madonvi);
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

        public IEnumerable<Donvi> DonVi()
        {
            try
            {
                return tb.Donvi.ToList();
            }
            catch
            {
                throw;
            }
        }

        [HttpPost]
        public int Create([FromBody] Donvi dv)
        {

            dv.Madonvi = Auto_id();
            
            tb.Donvi.Add(dv);
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

        public Donvi Details(int id)
        {
            return tb.Donvi.Find(id);
        }

        [HttpPut("{id}")]

        public int Edit(Donvi dv)
        {
            Donvi dvi = tb.Donvi.Find(dv.Iddonvi);
            dvi.Madonvi = dvi.Madonvi;
            dvi.Tendonvi = dv.Tendonvi;
            try
            {
                tb.Entry(dvi).State = EntityState.Modified;
                tb.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        [HttpDelete("{id}")]

        public int Delete(int id)
        {
            try
            {

                Donvi dv = tb.Donvi.Find(id);
                
                if (dv != null)
                {
                     
                    tb.Donvi.Remove(dv);
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

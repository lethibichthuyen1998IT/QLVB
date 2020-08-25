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
    public class VaitrosController : ControllerBase
    {
        QuanLyVanBanContext tb = new QuanLyVanBanContext();
        public string Auto_id()
        {
            int id;
            string autoID = "VT";
            if (tb.Vaitro.Count() == 0) id = 0;
            else
            {
                var maxID = tb.Vaitro.Max(x => x.Idvaitro);
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
        public IEnumerable<Vaitro> VaiTro()
        {
            try
            {
                return tb.Vaitro.ToList();
            }
            catch
            {
                throw;
            }
        }

        [HttpPost]
        public int Create([FromBody] Vaitro vt)
        {

            vt.Idvaitro = Auto_id();

            tb.Vaitro.Add(vt);
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

        

        [HttpPut("{id}")]

        public int Edit(Vaitro vt)
        {
            Vaitro vts = tb.Vaitro.Find(vt.Idvaitro);

            vts.Tenvaitro = vt.Tenvaitro;
            try
            {
                tb.Entry(vts).State = EntityState.Modified;
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

                Vaitro vt = tb.Vaitro.Find(id);

                if (vt != null)
                {

                    tb.Vaitro.Remove(vt);
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

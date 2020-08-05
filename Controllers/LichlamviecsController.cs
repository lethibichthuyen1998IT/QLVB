using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuanLy.Models;
using System.Collections.Generic;
using System.Linq;

namespace QuanLy.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LichlamviecsController : ControllerBase
    {
        QuanLyVanBanContext tb = new QuanLyVanBanContext();

        [HttpGet]
        public IEnumerable<Lichlamviec> Lichlamviec()
        {
            try
            {
                return tb.Lichlamviec.ToList();
            }
            catch
            {
                throw;
            }
        }
        public string auto_id()
        {

            int id;
            string autoID = "LICH";
            if (tb.Lichlamviec.Count() == 0) id = 0;
            else
            {
                var maxID = tb.Lichlamviec.Max(x => x.Idlich);
                id = int.Parse(maxID.Substring(4));
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
        public int Create([FromBody] Lichlamviec llv)
        {

            //on r... chay
            llv.Idlich = auto_id();
            tb.Lichlamviec.Add(llv);
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

        public int Edit(string id, Lichlamviec lichlamviec)
        {
           
            try
            {
                lichlamviec.Idlich = id;
                tb.Entry(lichlamviec).State = EntityState.Modified;
                tb.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

        [HttpGet("{id}")]

        public int GetLichlamviec(string id)
        {
           

                Lichlamviec llv = tb.Lichlamviec.Find(id);
            if (llv == null)
            {
                return 0;
            }

            return 1;
        }


        [HttpDelete("{id}")]

        public int Delete(string id)
        {
            try
            {

                Lichlamviec llv = tb.Lichlamviec.Find(id);

                if (llv != null)
                {
                    tb.Lichlamviec.Remove(llv);
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


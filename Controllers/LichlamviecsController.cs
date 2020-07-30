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

        //[HttpGet("{id}")]

        //public Donvi Details(int id)
        //{
        //    return tb.Donvi.Find(id);
        //}

        [HttpPut("{id}")]

        public int Edit(Lichlamviec llv)
        {
          
            Lichlamviec lichlv = tb.Lichlamviec.Find(llv.Idlich);
            lichlv.Noidungcv = llv.Noidungcv;
            lichlv.Diadiem = llv.Diadiem;
            lichlv.Ngaybd = llv.Ngaybd;
            lichlv.Giobd = llv.Giobd;
            lichlv.Giokt= llv.Giokt;
            lichlv.Thanhphankhac = llv.Thanhphankhac;

            try
            {
                tb.Entry(lichlv).State = EntityState.Modified;
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
    

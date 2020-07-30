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
    public class LoaivanbansController : ControllerBase
    {
        QuanLyVanBanContext tb = new QuanLyVanBanContext();
        public string Auto_id()
        {
            int id;
            string autoID = "LOAI";
            if (tb.Loaivanban.Count() == 0) id = 0;
            else
            {
                var maxID = tb.Loaivanban.Max(x => x.Maloai);
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

        [HttpGet]

        public IEnumerable<Loaivanban> Index()
        {
            try
            {
                return tb.Loaivanban.ToList();
            }
            catch
            {
                throw;
            }
        }

        [HttpPost]
        public int Create([FromBody] Loaivanban vb)
        {

            vb.Maloai = Auto_id();

            tb.Loaivanban.Add(vb);
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

        public Loaivanban Details(int id)
        {
            return tb.Loaivanban.Find(id);
        }

        [HttpPut("{id}")]

        public int Edit(Loaivanban vb)
        {
            Loaivanban vbs = tb.Loaivanban.Find(vb.Idloai);
            vbs.Maloai = vbs.Maloai;
            vbs.Tenloai = vb.Tenloai;
            try
            {
                tb.Entry(vbs).State = EntityState.Modified;
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

                Loaivanban loaivb = tb.Loaivanban.Find(id);

                if (loaivb != null)
                {

                    tb.Loaivanban.Remove(loaivb);
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

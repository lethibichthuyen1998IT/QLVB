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
    public class QuyensController : ControllerBase
    {
        QuanLyVanBanContext tb = new QuanLyVanBanContext();
        [HttpGet]
        public IEnumerable<Quyen> Index()
        {
            try
            {
                return tb.Quyen.ToList();
            }
            catch
            {
                throw;
            }
        }

        [HttpPost]
        public int Create([FromBody] Quyen q)
        {


            q.Trangthai = true;
            tb.Quyen.Add(q);
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

        [HttpDelete("{idvt}/{idcn}")]

        public int Delete(string idvt, string idcn)
        {
            try
            {

                Quyen q = tb.Quyen.Find(idvt, idcn);

                if (q != null)
                {

                    tb.Quyen.Remove(q);
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

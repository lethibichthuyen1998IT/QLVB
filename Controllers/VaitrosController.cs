using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuanLy.Models;

namespace QuanLy.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class VaitrosController : ControllerBase
    {
        QuanLyVanBanContext tb = new QuanLyVanBanContext();
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
    }
}

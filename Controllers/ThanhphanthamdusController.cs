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
    [Route("api/[controller]")]
    [ApiController]
    public class ThanhphanthamdusController : ControllerBase
    {
        private readonly QuanLyVanBanContext _context;

        public ThanhphanthamdusController(QuanLyVanBanContext context)
        {
            _context = context;
        }

        // GET: api/Thanhphanthamdus
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Thanhphanthamdu>>> GetThanhphanthamdu()
        {
            return await _context.Thanhphanthamdu.ToListAsync();
        }

        // GET: api/Thanhphanthamdus/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Thanhphanthamdu>> GetThanhphanthamdu(string id)
        {
            var thanhphanthamdu = await _context.Thanhphanthamdu.FindAsync(id);

            if (thanhphanthamdu == null)
            {
                return NotFound();
            }

            return thanhphanthamdu;
        }

        // PUT: api/Thanhphanthamdus/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutThanhphanthamdu(string id, Thanhphanthamdu thanhphanthamdu)
        {
            if (id != thanhphanthamdu.Idlich)
            {
                return BadRequest();
            }

            _context.Entry(thanhphanthamdu).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ThanhphanthamduExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Thanhphanthamdus
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Thanhphanthamdu>> PostThanhphanthamdu(Thanhphanthamdu thanhphanthamdu)
        {
            _context.Thanhphanthamdu.Add(thanhphanthamdu);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ThanhphanthamduExists(thanhphanthamdu.Idlich))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetThanhphanthamdu", new { id = thanhphanthamdu.Idlich }, thanhphanthamdu);
        }

        // DELETE: api/Thanhphanthamdus/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Thanhphanthamdu>> DeleteThanhphanthamdu(string id)
        {
            var thanhphanthamdu = await _context.Thanhphanthamdu.FindAsync(id);
            if (thanhphanthamdu == null)
            {
                return NotFound();
            }

            _context.Thanhphanthamdu.Remove(thanhphanthamdu);
            await _context.SaveChangesAsync();

            return thanhphanthamdu;
        }

        private bool ThanhphanthamduExists(string id)
        {
            return _context.Thanhphanthamdu.Any(e => e.Idlich == id);
        }
    }
}

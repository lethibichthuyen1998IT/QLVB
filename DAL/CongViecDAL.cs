using Microsoft.EntityFrameworkCore;
using QuanLy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuanLy.DAL
{

    public class CongViecDAL
    {
        QuanLyVanBanContext db = new QuanLyVanBanContext();
        public int UpdateCV(string id, Congviec cv)
        {
            try
            {
                db.Entry(cv).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }

    }
}

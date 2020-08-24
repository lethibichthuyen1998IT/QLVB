using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuanLy.DAL;
using QuanLy.DTO;
using QuanLy.Models;

namespace QuanLy.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class NhanviensController : ControllerBase
    {
        QuanLyVanBanContext tb = new QuanLyVanBanContext();
        NhanVienDAL db = new NhanVienDAL();
        
      

        [HttpGet]
        public IEnumerable<NhanVienDTO> Index()
        {
            try
            {
                var nv = from a in tb.Nhanvien
                         join b in tb.Vaitro on a.Idvaitro equals b.Idvaitro
                         join c in tb.Donvi on a.Iddonvi equals c.Iddonvi
                         where a.Daxoa == false || a.Daxoa == null
                         select new NhanVienDTO()
                         {
                             Idnv = a.Idnv,
                             Iddonvi = a.Iddonvi,
                             Idvaitro = b.Idvaitro,
                             Manv = a.Manv,
                             Hoten = a.Hoten,
                             Sdt = a.Sdt,
                             Ngaysinh = a.Ngaysinh,
                             Diachi = a.Diachi,
                             Username = a.Username,
                             Password = a.Password,
                             Daxoa = a.Daxoa,
                             Tendonvi = c.Tendonvi,
                             Tenvaitro = b.Tenvaitro
                         };
                return nv.ToList();
            }
            catch (DbUpdateException)
            {
                throw;
            }
        }

        [HttpPost]
        public int Create([FromBody]Nhanvien nv)
        {
           
            nv.Manv = db.Auto_id();
            tb.Nhanvien.Add(nv);
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

        public Nhanvien Details(int id)
        {
            return db.GetEmployeeData(id);
        }

        [HttpPut("{id}")]
        public int Edit(Nhanvien employee)
        {
            Nhanvien nv = tb.Nhanvien.Find(employee.Idnv);
            nv.Manv = nv.Manv;
            nv.Username = nv.Username;
            nv.Password = nv.Password;
            nv.Iddonvi = employee.Iddonvi;
            nv.Idvaitro = employee.Idvaitro;
            nv.Hoten = employee.Hoten;
            nv.Sdt = employee.Sdt;
            nv.Diachi = employee.Diachi;
            nv.Ngaysinh = employee.Ngaysinh;
            return db.UpdateEmployee(nv.Idnv,nv);
        }

        [HttpDelete("{id}")]

        public int Delete(int id)
        {
            try
            {

                Nhanvien emp = tb.Nhanvien.Find(id);
                if (emp != null)
                {
                    emp.Daxoa = true;
                    tb.Entry(emp).State = EntityState.Modified;
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


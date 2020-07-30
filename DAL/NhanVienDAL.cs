using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using QuanLy.DTO;
using QuanLy.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuanLy.DAL
{
    public class NhanVienDAL
    {

        QuanLyVanBanContext db = new QuanLyVanBanContext();
        public string Auto_id()
        {
            int id;
            string autoID = "NV";
            if (db.Nhanvien.Count() == 0) id = 0;
            else
            {
                var maxID = db.Nhanvien.Max(x => x.Manv);
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

        public IEnumerable<Donvi> GetDonVi()
        {
            var a = from dv in db.Donvi select dv;
            return a.ToList();
        }
        public IEnumerable<Vaitro> GetVaiTro()
        {
            return db.Vaitro.ToList();
        }
        public IEnumerable<NhanVienDTO> GetAllEmployees()
        {
            var nv = from a in db.Nhanvien
                     join b in db.Vaitro on a.Idvaitro equals b.Idvaitro
                     join c in db.Donvi on a.Iddonvi equals c.Iddonvi
                     where a.Daxoa == false || a.Daxoa == null
                     select new NhanVienDTO()
                     {
                         Idnv = a.Idnv,
                         Iddonvi = a.Iddonvi,
                         Tendonvi = c.Tendonvi,
                         Tenvaitro = b.Tenvaitro,
                         Idvaitro = b.Idvaitro,
                         Manv = a.Manv,
                         Sdt = a.Sdt,
                         Ngaysinh = a.Ngaysinh,
                         Daxoa = a.Daxoa,
                         Diachi = a.Diachi,
                         Hoten = a.Hoten,
                         Username = a.Username,
                         Password = a.Password
                     };
            return nv.ToList();

        }
        //To Add new employee record     
        public int AddEmployee(Nhanvien nv)
        {
            try
            {
                nv.Manv = Auto_id();
                db.Nhanvien.Add(nv);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //To Update the records of a particluar employee    
        public int UpdateEmployee(int id, Nhanvien nv)
        {
            try
            {
                db.Entry(nv).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        //Get the details of a particular employee    
        public Nhanvien GetEmployeeData(int id)
        {
            try
            {
                Nhanvien employee = db.Nhanvien.Find(id);
                return employee;
            }
            catch
            {
                throw;
            }
        }
        //To Delete the record of a particular employee    
        public int DeleteEmployee(int id)
        {
            try
            {

                Nhanvien emp = db.Nhanvien.Find(id);
                if (emp != null)
                {
                    emp.Daxoa = true;
                    db.Entry(emp).State = EntityState.Modified;
                    db.SaveChanges();
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

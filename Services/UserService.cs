using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using QuanLy.DTO;
using QuanLy.Helpers;
using QuanLy.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace QuanLy.Services
{
   
        public interface IUserService
        {
            AuthenticateResponse Authenticate(LoginDTO model);
            IEnumerable<Nhanvien> GetAll();
            Nhanvien GetById(int id);
        }

        public class UserService : IUserService
        {
            QuanLyVanBanContext db = new QuanLyVanBanContext();
            // users hardcoded for simplicity, store in a db with hashed passwords in production applications
            

            private readonly AppSettings _appSettings;

            public UserService(IOptions<AppSettings> appSettings)
            {
                _appSettings = appSettings.Value;
            }

            public AuthenticateResponse Authenticate(LoginDTO model)
            {
                var user = db.Nhanvien.SingleOrDefault(x => x.Username.Trim() == model.Username && x.Password.Trim() == model.Password);

                // return null if user not found
                if (user == null) return null;
                if (user.Daxoa == true) return null;
                // authentication successful so generate jwt token
                var token = generateJwtToken(user);

                return new AuthenticateResponse(user, token);
            }

            public IEnumerable<Nhanvien> GetAll()
            {
                return db.Nhanvien.ToList();
            }

            public Nhanvien GetById(int id)
            {
                return db.Nhanvien.FirstOrDefault(x => x.Idnv == id);
            }

            // helper methods

            private string generateJwtToken(Nhanvien user)
            {
                // generate token that is valid for 7 days
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[] { new Claim("idnv", user.Idnv.ToString()) }),
                    Expires = DateTime.UtcNow.AddDays(7),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }

        
    }
}

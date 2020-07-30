//using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.Mvc.Filters;
//using Microsoft.Extensions.Configuration;
//using Microsoft.IdentityModel.Tokens;
//using QuanLy.DTO;
//using QuanLy.Models;
//using System;
//using System.Collections.Generic;
//using System.IdentityModel.Tokens.Jwt;
//using System.Linq;
//using System.Security.Claims;
//using System.Text;
//using System.Threading.Tasks;

//namespace QuanLy.User
//{
//    public class UserService : IUserService
//    {
//        private readonly UserManager<Nhanvien> _userManager;
//        private readonly SignInManager<Nhanvien> _signInManager;
//        private readonly RoleManager<Chucnang> _roleManager;
//        private readonly IConfiguration _config;
//        public UserService(UserManager<Nhanvien> userManager, SignInManager<Nhanvien> signInManager, RoleManager<Chucnang> roleManager, IConfiguration config)
//        {
//            _userManager = userManager;
//            _signInManager = signInManager;
//            _roleManager = roleManager;
//            _config = config;
//        }
//        public async Task<string> Authenticate(LoginDTO request)
//        {
//            var user = await _userManager.FindByNameAsync(request.Username);
//            if (user == null)
//                return null;
//            var result = await _signInManager.PasswordSignInAsync(user, request.Password, false, true);
//            if (!result.Succeeded)
//            {
//                return null;
//            }
//            var roles = _userManager.GetRolesAsync(user);
//            var claims = new[]
//            {
//                new Claim(ClaimTypes.GivenName, user.Hoten),
//                new Claim(ClaimTypes.Role, string.Join(":",roles))
//            };
//            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Tokens:Key"]));
//            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
//            var token = new JwtSecurityToken(
//                _config["Tokens:Issuer"],
//                _config["Tokens:Issuer"],
//                claims,
//                expires: DateTime.Now.AddHours(3),
//                signingCredentials: creds);
//            return new JwtSecurityTokenHandler().WriteToken(token);
//        }
//    }
//}

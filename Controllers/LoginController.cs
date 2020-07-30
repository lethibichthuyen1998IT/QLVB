//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;

//using QuanLy.DTO;
//using QuanLy.User;

//namespace QuanLy.Controllers
//{
//    [Authorize]
//    [ApiController]
//    public class LoginController : ControllerBase
//    {
//        private readonly IUserService _userService;
//        public LoginController(IUserService userService)
//        {
//            _userService = userService;
//        }
//        [Route("Login/Index")]
//        [HttpPost("authenticate")]
//        public async Task<IActionResult> Authenticate([FromForm] LoginDTO request)
//        {
//            if (!ModelState.IsValid)
//                return BadRequest(ModelState);
//            var resultToken = await _userService.Authenticate(request);
//            if (string.IsNullOrEmpty(resultToken))
//            {
//                return BadRequest("Username or password is incorrect.");
//            }
//            return Ok(new { token = resultToken });
//        }
//    }
//}

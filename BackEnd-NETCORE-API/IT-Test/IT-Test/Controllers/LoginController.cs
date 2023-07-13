using IT_Test.Constants;
using IT_Test.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace IT_Test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _config;

        public LoginController(IConfiguration config) 
        {
            _config = config;
        }

        [HttpPost]
        public IActionResult Login(LoginUser userLogin) 
        {
            var user = Authenticate(userLogin);

            if (user != null) 
            {
                var Token = Generate(user);
                return Ok(Token);
            }

            return NotFound("User Not Found");
        }

        private LoginUser Authenticate(LoginUser userLogin) 
        {
            var currentUser = UserConstant.Users.FirstOrDefault(user => user.Username.ToLower() == userLogin.Username.ToLower() 
                && user.Password == userLogin.Password);

            if (currentUser != null) 
            {
                return currentUser;
            }
            return null;
        }
        
        private string Generate(LoginUser user) 
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Username)
            };

            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddMinutes(1),
                // expires: DateTime.UtcNow.AddSeconds(10),
                signingCredentials: credentials
                ) ;

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}

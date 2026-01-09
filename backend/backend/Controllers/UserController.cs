using backend.Dtos.UserDtos;
using backend.Models;
using backend.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly IUserService _userService;
        private readonly IEmailService _emailService;
        private readonly IConfiguration _configuration;

        public UserController(UserManager<User> userManager, SignInManager<User> signInManager, IUserService userService, IEmailService emailService, IConfiguration configuration)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            _userService = userService;
            _emailService = emailService;
            _configuration = configuration;
        }


        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register(RegisterDto registerDto)
        {
            var userExits = await userManager.FindByEmailAsync(registerDto.Email);
            if (userExits != null)
            {
                return BadRequest(new { message = "Email already exists" });
            }

            var user = new User
            {
                UserName = registerDto.Username,
                Email = registerDto.Email,
                Role = "User"
            };

            var result = await userManager.CreateAsync(user, registerDto.Password);
            if (!result.Succeeded)
            {
                return BadRequest(new { message = "User creation failed! Please check user details and try again." });
            }
            var token = _userService.GenerateJwtToken(user);
            return Ok(new
            {
                token,
                user = new
                {
                    user.Id,
                    user.UserName,
                    user.Email,
                    role = user.Role
                },
                message = "User created successfully",
                success = true
            });
        }

        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            var user = await userManager.FindByEmailAsync(loginDto.Email);
            if (user == null)
            {
                return BadRequest(new { message = "Invalid login attempt" });
            }
            var result = await signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (!result.Succeeded)
            {
                return BadRequest(new { message = "Invalid login attempt" });
            }
            var token = _userService.GenerateJwtToken(user);
            return Ok(new
            {
                token,
                user = new
                {
                    id = user.Id,
                    userName = user.UserName,
                    email = user.Email,
                    role = user.Role
                },
                message = "Login successful",
                success = true,
            });
        }

        [HttpGet("Profile")]
        [Authorize]
        public async Task<IActionResult> GetProfile()
        {
            var userEmail = User.Identity?.Name;
            if (string.IsNullOrEmpty(userEmail))
            {
                return BadRequest(new { message = "Invalid token" });
            }

            var user = await userManager.FindByEmailAsync(userEmail);
            if (user == null)
            {
                return BadRequest(new {success = false, message = "User not found" });
            }

            return Ok(new
            {
                success = true,
                user = new
                {
                    user.Id,
                    user.UserName,
                    user.Email,
                    user.Role
                }
            });
        }

        [HttpPost("Forgot-Password")]
        [AllowAnonymous]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordDto dto)
        {
            var user = await userManager.FindByEmailAsync(dto.Email);
            if (user == null)
                return BadRequest(new { message = "User not found" });

            var token = await userManager.GeneratePasswordResetTokenAsync(user);

            var frontendUrl = _configuration["FrontendUrl"] ?? "http://localhost:3000";
            var resetUrl = $"{frontendUrl}/resetpassword/{Uri.EscapeDataString(token)}";

            var body = $@"
        <h3>Password Reset</h3>
        <p>Click the link below to reset your password:</p>
        <a href='{resetUrl}'>Reset Password</a>
        <p><strong>This link will expire in 1 hour.</strong></p>
        <p>If you did not request this password reset, please ignore this email.</p>
        ";

            await _emailService.SendEmailAsync(
                user.Email,
                "Reset Your Password",
                body
            );

            return Ok(new { success = true, message = "Password reset email sent" });
        }


        [HttpPost("Reset-Password")]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPassword(ResetPasswordDto dto)
        {
            if (string.IsNullOrEmpty(dto.Token) ||
                string.IsNullOrEmpty(dto.NewPassword))
            {
                return BadRequest(new { message = "Invalid request" });
            }

            var decodedToken = Uri.UnescapeDataString(dto.Token);
            
            var users = userManager.Users.ToList();
            User? user = null;
            
            foreach (var u in users)
            {
                var isValidToken = await userManager.VerifyUserTokenAsync(
                    u, 
                    userManager.Options.Tokens.PasswordResetTokenProvider, 
                    "ResetPassword", 
                    decodedToken);
                if (isValidToken)
                {
                    user = u;
                    break;
                }
            }
            
            if (user == null)
                return BadRequest(new { message = "Invalid or expired token" });

            var result = await userManager.ResetPasswordAsync(
                user,
                decodedToken,
                dto.NewPassword
            );

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(new {success = true, message = "Password reset successful" });
        }
    }
}
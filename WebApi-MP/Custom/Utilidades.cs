using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using WebApi_MP.Models;

namespace WebApi_MP.Custom
{
    public class Utilidades
    {
        private readonly IConfiguration _configurarion;
        public Utilidades(IConfiguration configurarion)
        {
           _configurarion = configurarion;
        }

        public string encriptarSHA256(string texto)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {   

                //Computar hash
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(texto));

                //Convertir el array de bytes a string
                StringBuilder builder = new StringBuilder();
                for(int i = 0;i<bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }

        public string generarJWT(Usuario modelo)
        {
            //Crear la informacion del usuario para token
            var userClaims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,modelo.Doc.ToString()),
                new Claim(ClaimTypes.Role, modelo.Rol.NombreRol),
                 new Claim(ClaimTypes.Name, $"{modelo.Nombre} {modelo.Apellido}")
            };

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configurarion["jwt:key"]!));
            var credentials = new SigningCredentials(securityKey,SecurityAlgorithms.HmacSha256Signature);


            //Crear detalle del token

            var jwtConfig = new JwtSecurityToken(
                claims:userClaims,
                expires:DateTime.UtcNow.AddMinutes(10),
                signingCredentials:credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(jwtConfig);
        
        }


    }
}

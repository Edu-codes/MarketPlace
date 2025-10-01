using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;
using WebApi_MP.Custom;
using WebApi_MP.Models;
using WebApi_MP.Models.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace WebApi_MP.Controllers
{
    [Route("api/[controller]")]


    /*[AllowAnonymous]*/ //<-- para permitir el ingreso sin Ninguna Autorizacion como TOker
    [ApiController]
    public class AccesoController : ControllerBase
    {
        private readonly MarketPlace2Context _marketPlace2Context;
        private readonly Utilidades _utilidades;

        public AccesoController(MarketPlace2Context marketPlace2Context, Utilidades utilidades)
        {
            _marketPlace2Context = marketPlace2Context;
            _utilidades = utilidades;
        }

        [HttpPost]
        [Route("Registrarse")]

        public async Task<IActionResult> Registrarse(UsuarioDTO objeto)
        {

            var modeloUsuario = new Usuario
            {
                Doc = objeto.Doc,
                Nombre = objeto.Nombre,
                Apellido = objeto.Apellido,
                Email = objeto.Email,
                Direccion = objeto.Direccion,
                Pass = _utilidades.encriptarSHA256(objeto.Pass!),
                Telefono = objeto.Telefono

            };
            var usuarioExiste = await _marketPlace2Context.Usuarios.AnyAsync(u => u.Doc == modeloUsuario.Doc);


            var userRol = new UserRole
            {
               Doc = objeto.Doc,
               RolId = 2,       
            };

            if (usuarioExiste)
            {
                return Conflict(new { status = 409, mensaje = "El usuario ya tiene una cuenta registrada" });
            }

            try
            {
                _marketPlace2Context.Usuarios.Add(modeloUsuario);
                _marketPlace2Context.UserRoles.Add(userRol);

                await _marketPlace2Context.SaveChangesAsync();
                return Ok(new {status=200, mensaje = "Usuario registrado exitosamente" });
            }
            catch (Exception ex)
            {
                return BadRequest(new {status=400, mensaje = "Error al registrar usuario", error = ex.Message });
            }
        }

        [HttpPost]
        [Route("Login")]

        public async Task<IActionResult> Login(LoginDTO objeto)
        {

            var usuarioEncontrado = await _marketPlace2Context.Usuarios
           .Include(u => u.UserRoles)
               .ThenInclude(ur => ur.Rol)
           .Where(u =>
               u.Doc == objeto.Doc &&
               u.Pass == _utilidades.encriptarSHA256(objeto.Password))
           .FirstOrDefaultAsync();

            if (usuarioEncontrado == null)
            {
                return StatusCode( StatusCodes.Status200OK, new { isSuccess = false, token = "" });
            }
            else
            {
                var token = _utilidades.generarJWT(usuarioEncontrado);
                var roles = usuarioEncontrado.UserRoles.Select(ur => ur.Rol.NombreRol).ToList();
                var userData = new UsuarioDTO
                {
                    Doc = usuarioEncontrado.Doc,
                    Nombre = usuarioEncontrado.Nombre,
                    Apellido = usuarioEncontrado.Apellido,
                    Email = usuarioEncontrado.Email,
                    Direccion = usuarioEncontrado.Direccion,
                    Telefono = usuarioEncontrado.Telefono,
                    Roles = roles
                };


                return StatusCode(StatusCodes.Status200OK, new { isSuccess = true, token, user = userData });

            }
        }
    }
}

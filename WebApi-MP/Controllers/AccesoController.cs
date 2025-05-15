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
        private readonly MarketPlaceContext _marketPlaceContext;
        private readonly Utilidades _utilidades;

        public AccesoController(MarketPlaceContext marketPlaceContext, Utilidades utilidades)
        {
            _marketPlaceContext = marketPlaceContext;
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
                Direccion = objeto.Direccion,
                Pass = _utilidades.encriptarSHA256(objeto.Pass!),
                Telefono = objeto.Telefono,
                RolId = 2

            };
            var usuarioExiste = await _marketPlaceContext.Usuarios.AnyAsync(u => u.Doc == modeloUsuario.Doc);

            if (usuarioExiste)
            {
                return Conflict(new { status = 409, mensaje = "El usuario ya tiene una cuenta registrada" });
            }

            try
            {
                _marketPlaceContext.Usuarios.Add(modeloUsuario);
                await _marketPlaceContext.SaveChangesAsync();
                return Ok(new {status=200, mensaje = "Usuario registrado exitosamente" });
            }
            catch (Exception ex)
            {
                return BadRequest(new {status=400, mensaje = "Error al registrar usuario", error = ex.Message });
            }
        }

        [HttpPost]
        [Route("Login")]

        public async Task<IActionResult>Login(LoginDTO objeto)
        {
            var usuarioEncontrado = await _marketPlaceContext.Usuarios
                .Include(u => u.Rol)
                .Where(u =>
                u.Doc == objeto.Doc &&
                u.Pass == _utilidades.encriptarSHA256(objeto.Password)
                ).FirstOrDefaultAsync();

            if (usuarioEncontrado == null)
            {
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = false, token = "" });
            }
            else
            {
                
                var token = _utilidades.generarJWT(usuarioEncontrado);

                var userData = new UsuarioDTO
                {
                    Doc = usuarioEncontrado.Doc,
                    Nombre = usuarioEncontrado.Nombre,
                    Apellido = usuarioEncontrado.Apellido,
                    Direccion = usuarioEncontrado.Direccion,
                    Telefono = usuarioEncontrado.Telefono,
                    RolId = usuarioEncontrado.Rol.NombreRol
                };


                return StatusCode(StatusCodes.Status200OK, new { isSuccess = true, token, user = userData});

            }
        }
    }
}

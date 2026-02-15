
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using WebApi_MP.Custom;
using WebApi_MP.Models;
using WebApi_MP.Models.DTOs;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace WebApi_MP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TiendaController : ControllerBase
    {
        private readonly MarketPlace2Context _marketPlace2Context;

        public TiendaController(MarketPlace2Context marketPlace2Context)
        {
            _marketPlace2Context = marketPlace2Context;
        }

        [HttpGet]
        [Route("Lista")]

        public async Task<IActionResult> Lista()
        {
            var lista = await _marketPlace2Context.Tiendas
                .Include(x => x.TipoDocumentoNavigation)

                .Select(x => new TiendaDTO

                {
                    IdTienda = x.IdTienda,
                    TipoDocumento = x.TipoDocumento,
                    Nombre = x.Nombre,
                    Direccion = x.Direccion,
                    Barrio = x.Barrio,
                    Telefono = x.Telefono,
                    Ciudad = x.Ciudad,
                    Estado = x.Estado,
                    Codigo = x.TipoDocumentoNavigation.Nombre

                }).ToListAsync();
            if (lista == null || !lista.Any())
            {
                return NotFound("No hay ningúna tienda en la base de datos.");
            }

            return Ok(lista);
        }


        //Busca una tienda x id
        [HttpGet("{id}")]
        public async Task<ActionResult> GetTiendaId(int id)
        {
            var tienda = await _marketPlace2Context.Tiendas
                .Include(t => t.TipoDocumentoNavigation)
                .Where(t => t.IdTienda == id)
                .Select(t => new
                { 
                    t.IdTienda,
                    t.TipoDocumento,
                    t.Nombre,
                    t.Direccion,
                    t.Barrio,
                    t.Telefono,
                    t.Ciudad,
                    t.Estado,
                    CodigoTipoDocumento  = t.TipoDocumentoNavigation.Codigo
                })
                .FirstOrDefaultAsync();

            if (tienda == null)
            {
                return NotFound(new { mensaje = "Tienda no encontrada" });
            }

            return Ok(tienda);
        }

        //Registrar tienda  
        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Route("RegistroTienda")]

        public async Task<IActionResult> RegistroTienda(TiendaDTO objeto)
        {
            var modeloTienda = new Tienda
            {
                IdTienda = objeto.IdTienda,
                TipoDocumento = objeto.TipoDocumento,
                Nombre = objeto.Nombre,
                Direccion = objeto.Direccion,
                Barrio = objeto.Barrio,
                Telefono = objeto.Telefono,
                Ciudad = objeto.Ciudad,
                Estado = objeto.Estado,
            };

            try
            {
                _marketPlace2Context.Tiendas.Add(modeloTienda);
                await _marketPlace2Context.SaveChangesAsync();
                return Ok(new { mensaje = "Tienda registrado exitosamente" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = "Error al registrar Tienda", error = ex.Message });
            }
        }

        //actualiza las tiendas
        [Authorize(Roles = "Admin")]
        [HttpPut]
        [Route("ActualizarTienda/{idTienda}")]
        public async Task<IActionResult> ActualizarTienda(int IdTienda, TiendaUpdateDTO objeto)
        {
            var tiendaExistente = await _marketPlace2Context.Tiendas.FindAsync(IdTienda);

            if (tiendaExistente == null)
            {
                return NotFound(new { mensaje = "Tienda no encontrada" });
            }

            // Actualizar los campos permitidos
            tiendaExistente.TipoDocumento = objeto.TipoDocumento;
            tiendaExistente.Nombre = objeto.Nombre;
            tiendaExistente.Direccion = objeto.Direccion;
            tiendaExistente.Barrio = objeto.Barrio;
            tiendaExistente.Telefono = objeto.Telefono;
            tiendaExistente.Ciudad = objeto.Ciudad;
            tiendaExistente.Estado = objeto.Estado;


            try
            {
                await _marketPlace2Context.SaveChangesAsync();
                return Ok(new { mensaje = "Tienda actualizado exitosamente" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = "Error al actualizar tienda", error = ex.Message });
            }
        }


        [HttpDelete]
        [Route("EliminarTienda")]
        public async Task<IActionResult> EliminarTienda(int id)
        {
            try
            {
                var tienda = await _marketPlace2Context.Tiendas.FindAsync(id);

                if (tienda == null)
                {
                    return NotFound(new { mensaje = "Tienda no encontrada" });
                }

                _marketPlace2Context.Tiendas.Remove(tienda);
                await _marketPlace2Context.SaveChangesAsync();

                return Ok(new
                {
                    isSuccess = true,
                    mensaje = "Tienda eliminada correctamente"
                });
            }
            catch (DbUpdateException ex)
            {
                // Suele ocurrir si la tienda tiene relaciones (FK) con otras tablas
                return Conflict(new
                {
                    mensaje = "No se puede eliminar la tienda porque está relacionada con otros registros",
                    detalle = ex.Message
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    mensaje = "Ocurrió un error al eliminar la tienda",
                    detalle = ex.Message
                });
            }
        }

    }
}

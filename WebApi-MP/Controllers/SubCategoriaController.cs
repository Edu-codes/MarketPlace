using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi_MP.Models;
using WebApi_MP.Models.DTOs;

namespace WebApi_MP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubCategoriaController : ControllerBase
    {

        private readonly MarketPlaceContext _marketPlaceContext;

        public SubCategoriaController(MarketPlaceContext marketPlaceContext)
        {
            _marketPlaceContext = marketPlaceContext;
        }

        [HttpPost]
        [Route("CrearSubCategoria")]

        public async Task<IActionResult> CrearSubCat(SubCategoriaDTO objeto)
        {
            var modeloSubCat = new Subcategoria
            {
                Nombre = objeto.NombreSubCat,
                IdCat = objeto.idCat,
            };

            try
            {
                _marketPlaceContext.Add(modeloSubCat);
                await _marketPlaceContext.SaveChangesAsync();

                return Ok(new { mensaje = "SubCategoria registrada exitosamente" });
            }
            catch (Exception ex) 
            {
                return BadRequest(ex.Message);
            
            }
        }


        [HttpGet]
        [Route("Lista")]

        public async Task<IActionResult> Lista()
        {
            var lista = await _marketPlaceContext.Subcategorias
                .Include(x => x.IdCatNavigation)
                .Select(x => new SubCategoriaDTO
                {
                    Id = x.Id,
                    NombreSubCat = x.Nombre,
                    idCat = x.IdCat,
                    NombreCat = x.IdCatNavigation.NombreCat
                }).ToListAsync();

            if(lista == null || !lista.Any())
            {
                return NotFound();
            }
            return Ok(lista);
            
        }


        [HttpPut]
        [Route("ActualizarSubCat/{id}")]

        public async Task<IActionResult> ActualizarSubCat(int id, SubCategoriaDTO objeto)
        {
            var SubCatRegistrada = await _marketPlaceContext.Subcategorias.FindAsync(id);

            if (SubCatRegistrada == null)
            {
                return NotFound("SubCategoria no encontrado");
            }

            SubCatRegistrada.Nombre = objeto.NombreSubCat;
            SubCatRegistrada.IdCat = objeto.idCat;


            try
            {
                await _marketPlaceContext.SaveChangesAsync();
                return Ok(new { mensaje = "SubCategoria Actualizada Correctamente" });
            }
            catch(Exception ex)
            {
                return BadRequest(new {mensaje = "Error al Actualizar SubCategoria"});
            }
        }

        [HttpDelete]
        [Route("ElimiarSubCat/{id}")]

        public async Task<IActionResult> EliminarSubCat(int id)
        {
            var SubCat = await _marketPlaceContext.Subcategorias.FindAsync(id);

            if(SubCat == null){
                return NotFound("No se encontro esta Subcategoria para eliminar");
            }

            _marketPlaceContext.Subcategorias.Remove(SubCat);
            await _marketPlaceContext.SaveChangesAsync();

            return NoContent();
            
            
        }
    }
}

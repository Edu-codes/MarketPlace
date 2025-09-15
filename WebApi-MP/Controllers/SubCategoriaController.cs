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

        private readonly MarketPlace2Context _marketPlace2Context;

        public SubCategoriaController(MarketPlace2Context marketPlace2Context)
        {
            _marketPlace2Context = marketPlace2Context;
        }

        [HttpPost]
        [Route("CrearSubCategoria")]

        public async Task<IActionResult> CrearSubCat(SubCategoriaDTO objeto)
        {
            var modeloSubCat = new SubCategoria
            {
                NombreSubCat = objeto.NombreSubCat,
                CategoriaId = objeto.CategoriaId,
            };

            try
            {
                _marketPlace2Context.Add(modeloSubCat);
                await _marketPlace2Context.SaveChangesAsync();

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
            var lista = await _marketPlace2Context.SubCategorias
                .Include(x => x.Categoria)
                .Select(x => new SubCategoriaDTO
                {
                    Id = x.Id,
                    NombreSubCat = x.NombreSubCat,
                    CategoriaId = x.Categoria.Id,
                    NameCategoria = x.Categoria.NombreCat,
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
            var SubCatRegistrada = await _marketPlace2Context.SubCategorias.FindAsync(id);

            if (SubCatRegistrada == null)
            {
                return NotFound("SubCategoria no encontrado");
            }

            SubCatRegistrada.NombreSubCat = objeto.NombreSubCat;
            SubCatRegistrada.CategoriaId = objeto.CategoriaId;


            try
            {
                await _marketPlace2Context.SaveChangesAsync();
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
            var SubCat = await _marketPlace2Context.SubCategorias.FindAsync(id);

            if(SubCat == null){
                return NotFound("No se encontro esta Subcategoria para eliminar");
            }

            _marketPlace2Context.SubCategorias.Remove(SubCat);
            await _marketPlace2Context.SaveChangesAsync();

            return NoContent();
            
            
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi_MP.Models;
using WebApi_MP.Models.DTOs;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi_MP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase
    {

        private readonly MarketPlace2Context _marketPlace2Context;

        public CategoriaController(MarketPlace2Context marketPlace2Context)
        {
            _marketPlace2Context = marketPlace2Context;

        }


        // GET: api/<CategoriaController>
        [HttpGet]
        [Route ("Lista")]
        public async Task<IActionResult> Lista()
        {
            var Lista = await _marketPlace2Context.Categorias
                .Select(c => new CategoriaDTO
                {
                    Id = c.Id,
                    NombreCat = c.NombreCat,
                })
                .ToListAsync();

            if (Lista == null || !Lista.Any()) 
            { 
                return NotFound("No hay listado de categorias");
            }

            return Ok(Lista);
        }

        // POST api/<CategoriaController>
        [HttpPost]
        [Route("CrearCategoria")]
        public async Task<IActionResult>CrearCat(CategoriaDTO objeto)
        {
            var modeloCategoria = new Categoria
            {
                NombreCat = objeto.NombreCat,
            };

            try
            {
                _marketPlace2Context.Categorias.Add(modeloCategoria);
                await _marketPlace2Context.SaveChangesAsync();
                return Ok(new { mensaje = "Categoria registrada exitosamente" });
            }
            catch (Exception ex) 
            {

                return BadRequest(new { mensaje = "Error al registrar Categoria", error = ex.Message });

            }


        }

        // PUT api/<CategoriaController>/5
        [HttpPut]
        [Route("ActualizarCategoria/{id}")]
         
        public async Task<IActionResult> ActualizarCat(int id, CategoriaDTO objeto)
        {
            var categoria = await _marketPlace2Context.Categorias.FindAsync(id);

            if (categoria == null) {
                return NotFound("categoria no encontrada");
            }

            categoria.Id = objeto.Id;
            categoria.NombreCat = objeto.NombreCat;


            try
            {
                await _marketPlace2Context.SaveChangesAsync();
                return Ok(new {mensaje = "Se a actualizado la categoria correctamente"});

            }
            catch (Exception ex)
            {
                return BadRequest(new {mensaje = "No se acutalizo la categora"});

            }
        }
        

        // DELETE api/<CategoriaController>/5
        [HttpDelete]
        [Route("EliminarCat")]
        public async Task<IActionResult> EliminarCat(int id)
        {

            var tieneProductos = await _marketPlace2Context.Productos.AnyAsync(p => p.SubCategoriaId == id);
            if (tieneProductos)
            {
                return BadRequest("No se puede eliminar la categoría porque tiene productos asociados.");
            }

            var categoria = await _marketPlace2Context.Categorias.FindAsync(id);

            if (categoria == null)
            {
                return NotFound("Categoria no encontrada");
            }



            _marketPlace2Context.Categorias.Remove(categoria);
            await _marketPlace2Context.SaveChangesAsync();

            
            return Ok(new { mensaje = "categoria Eliminada" });


        }
    }
}

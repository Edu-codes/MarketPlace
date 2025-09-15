using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi_MP.Models;
using Microsoft.AspNetCore.Authorization;
using WebApi_MP.Custom;
using WebApi_MP.Models.DTOs;
using Microsoft.AspNetCore.Identity;

namespace WebApi_MP.Controllers
{
    [Route("api/[controller]")]
    //[Authorize]
    [ApiController]
    public class ProductoController : ControllerBase
    {

        private readonly MarketPlace2Context _marketPlace2Context;

        public ProductoController(MarketPlace2Context marketPlace2Context)
        {
            _marketPlace2Context = marketPlace2Context;

        }



        [HttpGet]
        [Route("Lista")]

        public async Task<IActionResult> Lista()
        {
            var lista = await _marketPlace2Context.Productos
                .Include(p => p.SubCategoria)
                .Include(p => p.UniMed)
                .Include(p => p.Estado)

                .Select(p => new ProductoDTO
                {
                    Referencia = p.Referencia,
                    NombrePro = p.NombrePro,
                    Precio = p.Precio,
                    Stock = p.Stock,
                    NameSubCategoria = p.SubCategoria.NombreSubCat,
                    SubCategoriaId = p.SubCategoria.Id,
                    IdCategoria = p.SubCategoria.Categoria.Id,
                    UniMedId = p.UniMed.Id,
                    NameCategoria = p.SubCategoria.Categoria.NombreCat,
                    NameUniMed = p.UniMed.NombreUniMed,
                    EstadoId = p.Estado!.Id,
                    NameEstado = p.Estado!.Nombre,
                    Descripcion = p.Descripcion,
                })
                .ToListAsync();


            if (lista == null || !lista.Any())
            {
                return NotFound("No hay ningún producto en la base de datos.");
            }

            return Ok(lista);
        }

        // GET api/<ProductController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Producto>> GetProductoId(int id)
        {

            var producto = await _marketPlace2Context.Productos.FindAsync(id);

            if (producto == null)
            {
                return NotFound();
            }

            //var dto = new ProductoDTO
            //{
            //    NombrePro = producto.NombrePro
            //};

            return producto;
        }


        [HttpGet]
        [Route("ProductoPorSubCategoria")]

        public async Task<ActionResult<Producto>> ProductoPorSubCategoria(int subcatId)
        {
            var producto = _marketPlace2Context.Productos
                .Include(p => p.SubCategoria)
                .Include(p => p.UniMed)
                .Include(p => p.Estado)
                .Where(u => u.SubCategoriaId == subcatId)
                .Select(u => new ProductoDTO
                {
                    Referencia = u.Referencia,
                    NombrePro = u.NombrePro,
                    Precio = u.Precio,
                    Stock = u.Stock,
                    NameSubCategoria = u.SubCategoria!.NombreSubCat,
                    NameUniMed = u.UniMed.NombreUniMed,
                    EstadoId = u.Estado!.Id,
                    NameEstado = u.Estado!.Nombre,
                    Descripcion = u.Descripcion,
                });

            if (!producto.Any())
                return NotFound("No hay productos en esta subcategoria");
            return Ok(producto);
        }


        //[HttpGet]
        //[Route("ProductoPorCategoria")]
        //public async Task<ActionResult<IEnumerable<ProductoDTO>>> ProductoPorCategoria(int idCat)
        //{
        //    var producto = await _marketPlace2Context.Productos
        //        .Where(u => u.SubCategoriaId == idCat)
        //        .Select(u => new ProductoDTO
        //        {
        //            NombrePro = u.NombrePro,
        //            Precio = u.Precio,
        //            Cantidad = u.Cantidad,
        //            NombreCat = u.IdCatNavigation.NombreCat,
        //            UnidadMedida = u.Unidad.Nombre,
        //            NombreSubCat = u.Subcat.Nombre


        //        }).ToListAsync();

        //    if (!producto.Any())
        //        return NotFound("No hay productos para esa categoría.");

        //    return Ok(producto);

        //}

        [HttpGet("buscar")]
        public async Task<ActionResult<IEnumerable<UsuarioDTO>>> BuscarPorNombre([FromQuery] string nombrePro)
        {
            if (string.IsNullOrWhiteSpace(nombrePro))
                return BadRequest("Debes proporcionar un nombre.");

            var productos = await _marketPlace2Context.Productos
                .Where(u => u.NombrePro.Contains(nombrePro))
                .Select(u => new ProductoDTO
                {
                    NombrePro = u.NombrePro,
                    Referencia = u.Referencia
                })
                .ToListAsync();

            if (productos.Count == 0)
                return NotFound("No se encontraron productos con ese nombre.");

            return Ok(productos);
        }

        // POST api/<ProductoController>
        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Route("RegistroProducto")]

        public async Task<IActionResult> RegistroProducto(ProductoDTO objeto)
        {
            var modeloProducto = new Producto
            {
                NombrePro = objeto.NombrePro,
                Precio = objeto.Precio,
                Stock = objeto.Stock,
                SubCategoriaId = objeto.SubCategoriaId,
                UniMedId = objeto.UniMedId,
                EstadoId = objeto.EstadoId,
                Descripcion = objeto.Descripcion
            };

            try
            {
                _marketPlace2Context.Productos.Add(modeloProducto);
                await _marketPlace2Context.SaveChangesAsync();
                return Ok(new { mensaje = "Producto registrado exitosamente" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = "Error al registrar Producto", error = ex.Message });
            }

        }
        [Authorize(Roles = "Admin")]
        [HttpPut]
        [Route("ActualizarProducto/{Referencia}")]
        public async Task<IActionResult> ActualizarProducto(string referencia, ProductoUpdateDTO objeto)
        {
            var productoExistente = await _marketPlace2Context.Productos.FindAsync(referencia);

            if (productoExistente == null)
            {
                return NotFound(new { mensaje = "Producto no encontrado" });
            }

            // Actualizar los campos permitidos
            productoExistente.NombrePro = objeto.NombrePro;
            productoExistente.Precio = objeto.Precio;
            productoExistente.Stock = objeto.Stock;
            productoExistente.SubCategoriaId = objeto.SubCategoriaId;
            productoExistente.UniMedId = objeto.UniMedId;
            productoExistente.EstadoId = objeto.EstadoId;
            productoExistente.Descripcion = objeto.Descripcion;

            try
            {
                await _marketPlace2Context.SaveChangesAsync();
                return Ok(new { mensaje = "Producto actualizado exitosamente" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = "Error al actualizar producto", error = ex.Message });
            }
        }

        [HttpDelete]
        [Route("EliminarProducto")]
        public async Task<IActionResult> EliminarProducto(int id)
        {
            var producto = await _marketPlace2Context.Productos.FindAsync(id);

            if (producto == null)
            {
                return NotFound();
            }

            _marketPlace2Context.Productos.Remove(producto);
            await _marketPlace2Context.SaveChangesAsync();

            return NoContent(); // 204
        }

    }
}

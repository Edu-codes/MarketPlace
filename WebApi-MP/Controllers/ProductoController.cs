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

        private readonly MarketPlaceContext _marketPlaceContext;

        public ProductoController(MarketPlaceContext marketPlaceContext)
        {
            _marketPlaceContext = marketPlaceContext;

        }



        [HttpGet]
        [Route("Lista")]

        public async Task<IActionResult> Lista()
        {
            var lista = await _marketPlaceContext.Productos
                .Include(p => p.Subcat)
                .Include(p => p.Unidad)
                .Include(p => p.IdCatNavigation)
                .Select(p => new ProductoDTO
                {
                    Id = p.Id,
                    NombrePro = p.NombrePro,
                    Precio = p.Precio,
                    Cantidad = p.Cantidad,
                    IdCat = p.IdCat,
                    UnidadId = p.UnidadId,
                    SubcatId = p.SubcatId,
                    NombreCat = p.IdCatNavigation.NombreCat,
                    UnidadMedida = p.Unidad.Nombre,
                    NombreSubCat = p.Subcat.Nombre
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

            var producto = await _marketPlaceContext.Productos.FindAsync(id);

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
            var producto = _marketPlaceContext.Productos
                                .Include(p => p.Subcat)
                .Include(p => p.Unidad)
                .Include(p => p.IdCatNavigation)
                .Where(u => u.SubcatId == subcatId)
                .Select(u => new ProductoDTO
                {
                    NombrePro = u.NombrePro,
                    Precio = u.Precio,
                    Cantidad = u.Cantidad,
                    NombreCat = u.IdCatNavigation.NombreCat,
                    UnidadMedida = u.Unidad.Nombre,
                    NombreSubCat = u.Subcat.Nombre
                });

            if (!producto.Any())
                return NotFound("No hay productos en esta subcategoria");
            return Ok(producto);
        }


        [HttpGet]
        [Route("ProductoPorCategoria")]
        public async Task<ActionResult<IEnumerable<ProductoDTO>>> ProductoPorCategoria(int idCat)
        {
            var producto = await _marketPlaceContext.Productos
                .Where(u => u.IdCat == idCat)
                .Select(u => new ProductoDTO
                {
                    NombrePro = u.NombrePro,
                    Precio = u.Precio,
                    Cantidad = u.Cantidad,
                    NombreCat = u.IdCatNavigation.NombreCat,
                    UnidadMedida = u.Unidad.Nombre,
                    NombreSubCat = u.Subcat.Nombre


                }).ToListAsync();

            if (!producto.Any())
                return NotFound("No hay productos para esa categoría.");

            return Ok(producto);

        }

        [HttpGet("buscar")]
        public async Task<ActionResult<IEnumerable<UsuarioDTO>>> BuscarPorNombre([FromQuery] string nombrePro)
        {
            if (string.IsNullOrWhiteSpace(nombrePro))
                return BadRequest("Debes proporcionar un nombre.");

            var productos = await _marketPlaceContext.Productos
                .Where(u => u.NombrePro.Contains(nombrePro))
                .Select(u => new ProductoDTO
                {
                    NombrePro = u.NombrePro,
                    Id = u.Id
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
                Cantidad = objeto.Cantidad,
                IdCat = objeto.IdCat,
                UnidadId = objeto.UnidadId,
                SubcatId = objeto.SubcatId
            };

            try
            {
                _marketPlaceContext.Productos.Add(modeloProducto);
                await _marketPlaceContext.SaveChangesAsync();
                return Ok(new { mensaje = "Producto registrado exitosamente" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { mensaje = "Error al registrar Producto", error = ex.Message });
            }

        }
        [Authorize(Roles = "Admin")]
        [HttpPut]
        [Route("ActualizarProducto/{id}")]
        public async Task<IActionResult> ActualizarProducto(int id, ProductoDTO objeto)
        {
            var productoExistente = await _marketPlaceContext.Productos.FindAsync(id);

            if (productoExistente == null)
            {
                return NotFound(new { mensaje = "Producto no encontrado" });
            }

            // Actualizar los campos
            productoExistente.NombrePro = objeto.NombrePro;
            productoExistente.Precio = objeto.Precio;
            productoExistente.Cantidad = objeto.Cantidad;
            productoExistente.IdCat = objeto.IdCat;
            productoExistente.UnidadId = objeto.UnidadId;
            productoExistente.SubcatId = objeto.SubcatId;

            try
            {
                await _marketPlaceContext.SaveChangesAsync();
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
            var producto = await _marketPlaceContext.Productos.FindAsync(id);

            if (producto == null)
            {
                return NotFound();
            }

            _marketPlaceContext.Productos.Remove(producto);
            await _marketPlaceContext.SaveChangesAsync();

            return NoContent(); // 204
        }

    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi_MP.Models;
using WebApi_MP.Models.DTOs;


namespace WebApi_MP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UnidadesMedidumController : ControllerBase
    {

        private readonly MarketPlaceContext _marketPlaceContext;

        public UnidadesMedidumController (MarketPlaceContext marketPlaceContext)
        {
            _marketPlaceContext = marketPlaceContext;
        }

        [HttpGet]
        [Route("Lista")]

        public async Task<IActionResult> Lista()
        {
            var lista = await _marketPlaceContext.UnidadesMedida
                .Select(x => new UnidadesMedidumDTO
                {
                    Id = x.Id,
                    NombreUnidadMedida = x.Nombre,
                }).ToListAsync();

            if(lista == null || !lista.Any()){
                return NotFound("No hay Unidades de Medida");
            }

            return Ok(lista);
        }
    }
}

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

        private readonly MarketPlace2Context _marketPlace2Context;

        public UnidadesMedidumController (MarketPlace2Context marketPlace2Context)
        {
            _marketPlace2Context = marketPlace2Context;
        }

        [HttpGet]
        [Route("Lista")]

        public async Task<IActionResult> Lista()
        {
            var lista = await _marketPlace2Context.UnidadesMedida
                .Select(x => new UnidadesMedidumDTO
                {
                    Id = x.Id,
                    NombreUnidadMedida = x.NombreUniMed,
                }).ToListAsync();

            if(lista == null || !lista.Any()){
                return NotFound("No hay Unidades de Medida");
            }

            return Ok(lista);
        }
    }
}

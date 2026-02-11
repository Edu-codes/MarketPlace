using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi_MP.Data;

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

        public async Task<IActionResult>Lista()
        {
            var lista = await _marketPlace2Context.Tiendas
                .Include(x => x.
        }
    }
}

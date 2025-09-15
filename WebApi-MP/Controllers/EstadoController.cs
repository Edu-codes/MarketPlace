using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi_MP.Models;
using WebApi_MP.Models.DTOs;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApi_MP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstadoController : ControllerBase
    {
        private readonly MarketPlace2Context _marketPlace2Context;

        public EstadoController(MarketPlace2Context marketPlace2Context)
        {
            _marketPlace2Context = marketPlace2Context;
        }

        // GET: api/<EstadoController>
        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista() {
        
            var lista = await _marketPlace2Context.Estados
                .Select(p => new EstadoDTO 
                {
                    Id = p.Id,
                    Nombre = p.Nombre
                } 
                ).ToListAsync();

            if (!lista.Any() || lista == null)
            {
                return NotFound("no hay ningun estado registrado");
            }

            return Ok(lista);
        
        }

        // GET api/<EstadoController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<EstadoController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<EstadoController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<EstadoController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

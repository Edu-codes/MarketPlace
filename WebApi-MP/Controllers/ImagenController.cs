using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi_MP.Models;
using WebApi_MP.Models.DTOs;

namespace WebApi_MP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagenController : ControllerBase
    {
        private readonly MarketPlace2Context _marketPlace2Context;


        public ImagenController(MarketPlace2Context marketPlace2Context)
        {

            _marketPlace2Context = marketPlace2Context;

        }

        [HttpGet]
        [Route("Lista")]

        public async Task<IActionResult> Lista()
        {

            var Lista = await _marketPlace2Context.Fotos
                .Select(f => new FotoDTO
                {
                    Id = f.Id,
                    ImageableId = f.ImageableId,
                    ImageableType = f.ImageableType,
                    EstadoId= f.EstadoId,
                    Ruta = f.Ruta
                }).ToListAsync();

            if (Lista == null)
            {
                return NotFound("No hay ninguna imagen");
            }

            return Ok(Lista);

        }

        [HttpPost]
        [Route("nuevaFoto")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> nuevaFoto([FromForm] FotoUploadDTO dto)
        {
            if (dto.File == null || dto.File.Length == 0)
                return BadRequest("Archivo no válido");

            var fileName = $"{Guid.NewGuid()}_{Path.GetFileName(dto.File.FileName)}";
            var folderPath = Path.Combine("wwwroot", "uploads", dto.ImageableType, dto.ImageableId ?? "undefined");
            Directory.CreateDirectory(folderPath);

            var filePath = Path.Combine(folderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await dto.File.CopyToAsync(stream);
            }

            var rutaRelativa = $"/uploads/{dto.ImageableType}/{dto.ImageableId}/{fileName}";

            var modeloFoto = new Foto
            {
                ImageableId = dto.ImageableId,
                ImageableType = dto.ImageableType,
                Ruta = rutaRelativa,
                EstadoId = null
            };

            _marketPlace2Context.Fotos.Add(modeloFoto);
            await _marketPlace2Context.SaveChangesAsync();

            return Ok(new { mensaje = "Foto registrada exitosamente", ruta = rutaRelativa });
        }

        [HttpGet]
        [Route("FotoPorId")]

        public async Task<IActionResult> FotoID(string Id)
        {
            var foto = await _marketPlace2Context.Fotos
                .Where(f => f.ImageableId == Id)
                .Select(f => new FotoDTO
                {
                    Id = f.Id,
                    ImageableId = f.ImageableId,
                    ImageableType = f.ImageableType,
                    Ruta = f.Ruta
                }).ToListAsync();

            return Ok(foto);
        }


        [HttpDelete]
        [Route("DeleteImagen/{id}")]

        public async Task<IActionResult> EliminarImagen(int id)
        {

            var imagen = await _marketPlace2Context.Fotos.FindAsync(id);
            if (imagen == null)
            {
                return NotFound("No hay una imagen con ese aid");
            }

            _marketPlace2Context.Remove(imagen);
            await _marketPlace2Context.SaveChangesAsync();


            return Ok(new { mensaje = "Imagen eliminada" });
        }

        [HttpPut]
        [Route("AsignarImagen/{id}")]

        public async Task<IActionResult> AsignarImagen(int id, FotoDTO objeto)
        {
            var fotoId = await _marketPlace2Context.Fotos.FindAsync(id);

            fotoId.EstadoId = 3;

            try
            {

                await _marketPlace2Context.SaveChangesAsync();
                return Ok(new { message = "Imagen asiganada correctamente" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Error al asignar imagen", error = ex.Message });
            }
        }
    };

}

using Microsoft.AspNetCore.Mvc;

namespace WebApi_MP.Models.DTOs
{
    public class FotoUploadDTO
    {

        [FromForm(Name = "file")]
        public IFormFile File { get; set; } = null!;

        [FromForm(Name = "imageableId")]
        public string? ImageableId { get; set; }

        [FromForm(Name = "imageableType")]
        public string ImageableType { get; set; } = null!;
    }
}

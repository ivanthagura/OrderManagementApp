using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class WebsiteController : Controller
    {
        public IActionResult Index()
        {
            return PhysicalFile(System.IO.Path.Combine(Directory.GetCurrentDirectory(),
                "wwwroot", "index.html"), "text/HTML");
        }
    }
}
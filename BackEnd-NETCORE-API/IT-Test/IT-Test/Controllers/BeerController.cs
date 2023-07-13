using IT_Test.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace IT_Test.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BeerController : ControllerBase
    {
        [HttpGet]
        [Authorize]
        public IActionResult Get() 
        {
            var beerList = BeerConstant.APIBeers();

            return Ok(beerList);
        }
    }
}

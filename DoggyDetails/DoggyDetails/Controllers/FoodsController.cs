using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DoggyDetails.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodsController : ControllerBase
    {

        [HttpGet]
        [Route("getFoodsForThisPet/{petID}")]
        public void GetFoodsForThisPet(int petID)
        {
            // do stuff
        }

        [HttpPost]
        [Route("createNewFood/{foodDetails}")]
        public void CreateNewFood(string foodDetails)
        {
            // do stuff
        }

        [HttpPut]
        [Route("editFood/{foodDetails}")]
        public void EditFood(string foodDetails)
        {
            // do stuff
        }

        [HttpDelete]
        [Route("delete/{foodID}")]
        public void DeleteFood(int foodID)
        {
            // do stuff
        }
    }
}

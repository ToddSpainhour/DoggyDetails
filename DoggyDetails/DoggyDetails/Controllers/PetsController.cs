using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DoggyDetails.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PetsController : ControllerBase
    {

        [HttpGet]
        [Route("getPet/{petID}")]
        public void GetPet(int petID)
        {
           // do stuff
        }

        [HttpPost]
        [Route("createNewPet/{petDetails}")]
        public void CreateNewPet(string petDetails)
        {
            // do stuff
        }

        [HttpPut]
        [Route("editPet/{petDetails}")]
        public void EditPet(string petDetails)
        {
            // do stuff
        }

        [HttpDelete]
        [Route("delete/{PetID}")]
        public void DeletePet(int petID)
        {
            // do stuff
        }
    }
}

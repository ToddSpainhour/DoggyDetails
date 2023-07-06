using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DoggyDetails.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExercisesController : ControllerBase
    {

        [HttpGet]
        [Route("getExercisesForThisPet/{petID}")]
        public void GetExercisesForThisPet(int petID)
        {
            // do stuff
        }

        [HttpPost]
        [Route("addNewExercise/{exerciseDetails}")]
        public void AddNewExercise(string exerciseDetails)
        {
            // do stuff
        }

        [HttpPut]
        [Route("editExercise/{exerciseDetails}")]
        public void EditFood(string exerciseDetails)
        {
            // do stuff
        }

        [HttpDelete]
        [Route("deleteExercise/{exerciseID}")]
        public void DeleteExercise(int exerciseID)
        {
            // do stuff
        }
    }
}

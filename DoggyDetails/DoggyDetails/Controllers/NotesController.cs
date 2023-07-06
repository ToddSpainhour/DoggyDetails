using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DoggyDetails.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {

        [HttpGet]
        [Route("getNotesForThisPet/{petID}")]
        public void GetNotesForThisPet(int petID)
        {
            // do stuff
        }

        [HttpPost]
        [Route("addNewNote/{noteDetails}")]
        public void AddNewNote(string noteDetails)
        {
            // do stuff
        }

        [HttpPut]
        [Route("editNote/{noteDetails}")]
        public void EditNote(string noteDetails)
        {
            // do stuff
        }

        [HttpDelete]
        [Route("deleteNote/{noteID}")]
        public void DeleteNote(int noteID)
        {
            // do stuff
        }
    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DoggyDetails.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicinesController : ControllerBase
    {


        [HttpGet]
        [Route("getMedicinesForThisPet/{petID}")]
        public void GetMedicinesForThisPet(int petID)
        {
            // do stuff
        }

        [HttpPost]
        [Route("addNewMedicine/{medicineDetails}")]
        public void AddNewMedicine(string medicineDetails)
        {
            // do stuff
        }

        [HttpPut]
        [Route("editMedicine/{medicineDetails}")]
        public void EditMedicine(string medicineDetails)
        {
            // do stuff
        }

        [HttpDelete]
        [Route("deleteMedicine/{medicineID}")]
        public void DeleteMedicine(int medicineID)
        {
            // do stuff
        }
    }
}

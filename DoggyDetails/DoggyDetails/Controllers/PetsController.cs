using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DoggyDetails.Models;
using System.Data;
using System.Data.SqlClient;

namespace DoggyDetails.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PetsController : ControllerBase
    {
        public readonly IConfiguration _configuration;
        public PetsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [Route("getPet/{petID}")]
        public void GetPet(int petID)
        {
           // do stuff
        }

        [HttpPost]
        [Route("createNewPet/{petDetails}")]
        public void CreateNewPet([FromBody]Pet petDetails)
        {
            Pet newPet = new Pet();


            newPet.OwnerID = petDetails.OwnerID;
            newPet.Name = petDetails.Name;
            newPet.Type = petDetails.Type;

            using var con = new SqlConnection(_configuration.GetConnectionString("DoggyDetailsConnectionString").ToString());

            try
            {
                var queryString = @"insert into Pet
                                    values (@OwnerID, @Name, @Type);";

                var command = new SqlCommand(queryString, con);

                var ownerID = new SqlParameter("@OwnerID", newPet.OwnerID);
                var name = new SqlParameter("@Name", newPet.Name);
                var type = new SqlParameter("Type", newPet.Type);

                command.Parameters.Add(ownerID);
                command.Parameters.Add(name);
                command.Parameters.Add(type);

                con.Open();
                var returnefValue = command.ExecuteNonQuery();
                con.Close();

                //return returnefValue;

            }
            catch (Exception ex)
            {
                Console.WriteLine($"Oh, no! SOmething went wrong in the CreateNewet method! Error Info: {ex}");
                throw;
            }
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

            var petToDelete = petID;
            using var con = new SqlConnection(_configuration.GetConnectionString("DoggyDetailsConnectionString").ToString());

            try
            {
                var queryString = @"delete from Pet" +
                    "               where PetID = @PetID;";

                var command = new SqlCommand(queryString, con);
                var petIDToDelete = new SqlParameter("@PetID", petToDelete);
                command.Parameters.Add(petIDToDelete);

                con.Open();
                command.ExecuteNonQuery();
                con.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Oh, no! SOmething went wrong in the DeletePet method. Error Info: {ex}");
                throw;
            }
        }
    }
}

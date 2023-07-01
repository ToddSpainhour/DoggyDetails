using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using DoggyDetails.Models;
using Newtonsoft.Json;
using System.Linq;

namespace DoggyDetails.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OwnersController : ControllerBase
    {
        public readonly IConfiguration _configuration;
        public OwnersController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        [Route("GetAllOwners")]
        public string GetOwners()
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("DoggyDetailsConnectionString").ToString());
            SqlDataAdapter da = new SqlDataAdapter("select * from Owner", con);
            DataTable dt = new DataTable();
            da.Fill(dt);
            List<Owner> ownerList = new List<Owner>();
            Response response = new Response();
            if (dt.Rows.Count > 0)
            {
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Owner owner = new Owner();
                    owner.OwnerID = Convert.ToInt32(dt.Rows[i]["OwnerID"]);
                    owner.FirstName = Convert.ToString(dt.Rows[i]["FirstName"]);
                    owner.LastName = Convert.ToString(dt.Rows[i]["LastName"]);
                    owner.AccountEmail = Convert.ToString(dt.Rows[i]["AccountEmail"]);
                    owner.AccountPassword = Convert.ToString(dt.Rows[i]["AccountPassword"]);
                    ownerList.Add(owner);
                }
            }
            if (ownerList.Count > 0)
            {
                return JsonConvert.SerializeObject(ownerList);
            }
            else
            {
                response.StatusCode = 100;
                response.ErrorMessage = "No Data Found";
                return JsonConvert.SerializeObject(response);
            }
        }

        // check username availability
        [HttpGet]
        [Route("UsernameAvailability/{userEnteredUsername}")]
        public string CheckUsernameAvailability(string userEnteredUsername)
        {
            // accept argument from frontend (username)
            // pass that argument into query
            // if any query results > 0, username IS NOT available
            // if query results == 0, username IS available
            // how to stop query if a result is found??

            var db = new SqlConnection(_configuration.GetConnectionString("DoggyDetailsConnectionString").ToString());
            SqlDataAdapter da = new SqlDataAdapter("select * from Owner", con);

        }
    }
}

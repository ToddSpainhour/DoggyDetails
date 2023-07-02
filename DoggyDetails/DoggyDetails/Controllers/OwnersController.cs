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
            using var con = new SqlConnection(_configuration.GetConnectionString("DoggyDetailsConnectionString").ToString());

            var queryString = @"select case when exists 
                (select AccountEmail from[Owner]
                where AccountEmail = @ueun)
                then cast(0 as bit)
                else cast(1 as bit)
                end";

            var command = new SqlCommand(queryString, con);
            var parameter = new SqlParameter("@ueun", userEnteredUsername);
            command.Parameters.Add(parameter);
            IDbDataAdapter runQueryAndGetResults = new SqlDataAdapter(command);
            DataSet ds = new DataSet();
            runQueryAndGetResults.Fill(ds);
            var result = ds.Tables[0].Rows[0];
            var isUserNameAvailable = result.Field<bool>(0).ToString();

            if (isUserNameAvailable ==  "False")
            {
                return "False";
            } 
            else if (isUserNameAvailable == "True")
            {
                return "True";
            } else
            {
                return "False";
            }
        }
    }
}

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using DoggyDetails.Models;
using Newtonsoft.Json;
using System.Text.Json;
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

        [HttpPost]
        [Route("createNewOwner/{newOwner}")]
        public object CreateNewOwner([FromBody]Owner newOwner)
        {
            Owner newOwnerToInsert = new Owner();

            newOwnerToInsert.FirstName = newOwner.FirstName;
            newOwnerToInsert.LastName = newOwner.LastName;
            newOwnerToInsert.AccountEmail = newOwner.AccountEmail;
            newOwnerToInsert.AccountPassword = newOwner.AccountPassword;

            using var con = new SqlConnection(_configuration.GetConnectionString("DoggyDetailsConnectionString").ToString());

            var queryString = @"insert into [Owner]
                                values(@FirstName, @LastName, @AccountEmail, @AccountPassword) 
                                SELECT SCOPE_IDENTITY();";

            var command = new SqlCommand(queryString, con);

            var firstName = new SqlParameter("@FirstName", newOwnerToInsert.FirstName);
            var lastName = new SqlParameter("@LastName", newOwnerToInsert.LastName);
            var accountEmail = new SqlParameter("@AccountEmail", newOwnerToInsert.AccountEmail);
            var accountPassword = new SqlParameter("@AccountPassword", newOwnerToInsert.AccountPassword);

            command.Parameters.Add(firstName);
            command.Parameters.Add(lastName);
            command.Parameters.Add(accountEmail);
            command.Parameters.Add(accountPassword);

            con.Open();
            var returnedOwnerID = command.ExecuteScalar();
            con.Close();

            return returnedOwnerID;
        }

        [HttpPost]
        [Route("login/{loginInfo}")]

        public int OwnerLogin([FromBody] Owner loginInfo)
        {
            Owner owner = new Owner();

            owner.AccountEmail = loginInfo.AccountEmail;
            owner.AccountPassword = loginInfo.AccountPassword;

            using var con = new SqlConnection(_configuration.GetConnectionString("DoggyDetailsConnectionString").ToString());

            var queryString = @"select case when exists 
                                (select [Owner].AccountEmail from [Owner]
                                where @AccountEmail = @AccountEmail AND AccountPassword = @AccountPassword)
                                then (select OwnerID from Owner where AccountEmail = @AccountEmail AND AccountPassword = @AccountPassword)
                                else (0)
                                end";

            var command = new SqlCommand(queryString, con);

            var accountEmail = new SqlParameter("@AccountEmail", owner.AccountEmail);
            var accountPassword = new SqlParameter("@AccountPassword", owner.AccountPassword);

            command.Parameters.Add(accountEmail);
            command.Parameters.Add(accountPassword);

            con.Open();
            var returnedOwnerID = command.ExecuteScalar();
            con.Close();

            if (returnedOwnerID == DBNull.Value)
            {
                returnedOwnerID = 0;
            } 

            var ownerID = Convert.ToInt32(returnedOwnerID);
            return ownerID;
        }
    }
}

namespace DoggyDetails.Models
{
    public class Pet
    {
        public int PetID { get; set; }

        public int OwnerID { get; set; }

        public string? Name { get; set; }

        public string? Type { get; set; }
    }
}

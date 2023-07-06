namespace DoggyDetails.Models
{
    public class Note
    {
        public int NoteID { get; set; }

        public int? PetID { get; set; }

        public string? Message { get; set; }
    }
}

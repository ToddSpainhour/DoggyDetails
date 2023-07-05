namespace DoggyDetails.Models
{
    public class Exercise
    {
        public int ExerciseID { get; set; }
        public int? PetID { get; set; }
        public string? Type { get; set; }
        public float? Distance { get; set; }
        public DateTime? TimeStamp { get; set; }
    }
}

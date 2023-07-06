namespace DoggyDetails.Models
{
    public class Food
    {
        public int FoodID { get; set; }

        public int? PetID { get; set; }

        public string? FoodName { get; set; }

        public int? MealsPerDay { get; set; }

        public float? Amount { get; set; }

        public bool? CompletedMeal { get; set; }

        public DateTime? Timestamp { get; set; }
    }
}

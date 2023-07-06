namespace DoggyDetails.Models
{
    public class Medicine
    {
        public int MedicineID { get; set; }

        public int? PetID { get; set; }

        public string? MedicineName { get; set; }

        public decimal? Dosage { get; set; }

        public bool? TakenWithFood { get; set; }

        public int? TimesTakenPerDay { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }
    }
}

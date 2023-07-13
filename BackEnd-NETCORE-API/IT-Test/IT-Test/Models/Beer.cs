using Newtonsoft.Json;

namespace IT_Test.Models
{
    public class Beer
    {
        [JsonProperty(PropertyName = "id")]
        public int id { get; set; }
        [JsonProperty(PropertyName = "name")]
        public string name { get; set; }
        [JsonProperty(PropertyName = "description")]
        public string description { get; set; }
    }
}

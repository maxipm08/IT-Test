using IT_Test.Models;
using RestSharp;

namespace IT_Test.Constants
{
    public class BeerConstant
    {
        private const string URL = "https://api.punkapi.com/v2/beers";

        public static List<Beer> beers = new List<Beer>()
        {
            new Beer() { id = 1, name = "Buzz", description = "A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once."},
            new Beer() { id = 2, name = "Trashy Blonde", description = "A titillating, neurotic, peroxide punk of a Pale Ale. Combining attitude, style, substance, and a little bit of low self esteem for good measure."}
        };

        public static List<Beer> APIBeers()
        {
            var client = new RestClient(URL);
            var response = client.Execute<List<Beer>>(new RestRequest());
            return response.Data;
        }
    }
};

using IT_Test.Models;

namespace IT_Test.Constants
{
    public class UserConstant
    {
        public static List<LoginUser> Users = new List<LoginUser>() 
        {
            new LoginUser() { Username = "root", Password = "password" }
        };
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Dashboard.WebApi.Services
{
    public class AuthenticationService
    {
        public static bool TempAuth(string tmpPassword)
        {
            return string.Equals(tmpPassword, "$%T3sl@");
        }
    }
}
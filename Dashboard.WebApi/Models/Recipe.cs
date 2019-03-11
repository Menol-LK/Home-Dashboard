using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Dashboard.WebApi.Models
{
    public class Menu
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
    }
}
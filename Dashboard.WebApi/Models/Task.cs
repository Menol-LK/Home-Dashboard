using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Dashboard.WebApi.Models
{
    public class Task
    {
        public int Id { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime DueDateTime { get; set; }
    } 
}
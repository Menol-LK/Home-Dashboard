namespace Dashboard.WebApi.Migrations
{
    using Dashboard.WebApi.Models;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<Dashboard.WebApi.Models.DashboardWebApiContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(Dashboard.WebApi.Models.DashboardWebApiContext context)
        {

            context.Tasks.AddOrUpdate(t=>t.Id,
                new Task { Id = 1, Description = "Task 1", CreatedDateTime = DateTime.Now } ,
                new Task { Id = 2, Description = "Task 2", CreatedDateTime = DateTime.Now.Subtract(new TimeSpan(10, 0,0,0)) },
                new Task { Id = 2, Description = "Task 2", CreatedDateTime = DateTime.Now.Subtract(new TimeSpan(20, 0,0,0)) } 
                );
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
        }
    }
}

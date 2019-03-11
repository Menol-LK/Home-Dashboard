using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Dashboard.WebApi.Models;
using System.Web.Http.Cors;
using Dashboard.WebApi.Repository;
using Dashboard.WebApi.Services;

namespace Dashboard.WebApi.Controllers
{
    [EnableCorsAttribute("http://localhost:50301,http://dashboard.privatedomain.com", "*", "*")]
    public class TasksController : ApiController
    {
        private TaskRepositoryJSONFile repo = new TaskRepositoryJSONFile();

        // GET api/Task
        //[Authorize()]
        public IEnumerable<Task> GetTasks()
        {
            return repo.GetTasks().OrderBy(t => t.DueDateTime);
        }

        // GET api/Task/5
        [ResponseType(typeof(Task))]
        public IHttpActionResult GetTask(int id)
        {
            Task task = null;
            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }

        // PUT api/Task/5
        public IHttpActionResult PutTask(int id, Task task)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            //if (id != task.Id)
            //{
            //    return BadRequest();
            //}

            //db.Entry(task).State = EntityState.Modified;

            //try
            //{
            //    db.SaveChanges();
            //}
            //catch (DbUpdateConcurrencyException)
            //{
            //    if (!TaskExists(id))
            //    {
            //        return NotFound();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

            return StatusCode(HttpStatusCode.NotImplemented);
        }

        // POST api/Task
        [ResponseType(typeof(Task))]
        public IEnumerable<Task> AddNewTask(string password, Task task)
        {
            if (!AuthenticationService.TempAuth(password))
            {
                throw new WebException("Unauthorised");
            }

            if (!ModelState.IsValid)
            {
                throw new WebException("model invalid");
            }


            repo.AddTask(task);

            return getOrderedListOfTasks(true);
        }

        // DELETE api/Task/5
        public IHttpActionResult DeleteTask(string password, int id)
        {
            if (!password.Equals("$um3ejaM"))
            {
                return Unauthorized();
            }

            repo.DeleteTask(id);

            return Ok<IEnumerable<Task>>(getOrderedListOfTasks(true));
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                
            }
            base.Dispose(disposing);
        }

        private bool TaskExists(int id)
        {
            throw new NotImplementedException();
        }

        private IEnumerable<Task> getOrderedListOfTasks(bool forceRefresh = false)
        {
            return repo.GetTasks(forceRefresh).OrderBy(t => t.DueDateTime);
        }
    }
}
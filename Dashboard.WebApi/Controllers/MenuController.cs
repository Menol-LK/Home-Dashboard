using Dashboard.WebApi.Models;
using Dashboard.WebApi.Repository;
using Dashboard.WebApi.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Dashboard.WebApi.Controllers
{
    [EnableCorsAttribute("http://localhost:50301,http://dashboard.privatedomain.com", "*", "*")]
    public class MenusController : ApiController
    {
        MenuRepositoryJSONFile repo = new MenuRepositoryJSONFile();

        //GET: api/Menu
        public IEnumerable<Menu> Get()
        {
            var tmp = repo.GetMenus();
            if (tmp?.Count == 0)
            {
                repo.AddTestItems();
            }

            return repo.GetMenus();
        }
        
        // POST: api/Menu
        public IHttpActionResult Post([FromUri] string password, Menu menu)
        {
            if (!AuthenticationService.TempAuth(password))
            {
                return Unauthorized();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            repo.AddMenu(menu);


            //return CreatedAtRoute("DefaultApi", new { id = task.Id }, task);
            return StatusCode(HttpStatusCode.Created);
        }

        public IHttpActionResult Save([FromUri] string password, IEnumerable<Menu> menus)
        {
            if (!AuthenticationService.TempAuth(password))
            {
                return Unauthorized();
            }

            return Ok<IEnumerable<Menu>>(repo.UpdateRange(menus));
        }

        // PUT: api/Menu/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Menu/5
        public void Delete(int id)
        {
        }
    }
}

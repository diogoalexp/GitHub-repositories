using GerenciarRecursos.Modelo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Ateliware.API.Controllers
{
    public class FavotiresController : ApiController
    {

        
        [HttpPost, Route("api/Favorites/Add")]
        public bool Add([FromBody]EDados dados)
        {
            var result = dados.id;

            return result > 0;
        }


        [HttpGet, Route("api/Favorites/Get")]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}

using Ateliware.Core;
using Ateliware.Model;
using System.Web.Http;

namespace Ateliware.API.Controllers
{
    public class FavoritesController : ApiController
    {
        private readonly IRepository _repository;

        public FavoritesController(IRepository repository)
        {
            _repository = repository;
        }

        [HttpPost, Route("api/Favorites/Add")]
        public string Add([FromBody]EDados dados)
        {
            if (_repository.addDados(dados))
             return "Sucessfully inserted!";            
            else            
                return "You favorites are at maximum of 5 records for " + dados.language + " please, remove a record before insert a new one.";
            
        }

        [HttpPost, Route("api/Favorites/Remove")]
        public bool Remove([FromBody]EDados dados)
        {
            return _repository.removeDados(dados);            
        }


        [HttpGet, Route("api/Favorites/Get")]
        public EDados[] Get()
        {            
            return _repository.getDados();
        }

    }
}

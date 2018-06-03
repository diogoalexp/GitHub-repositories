using Ateliware.Core;
using Ateliware.DAL;
using Ateliware.Model;

namespace Ateliware.Core
{
    public class Repository : IRepository
    {
        private readonly IRepositoryDAL _repositoryDAL;
        
        public Repository(IRepositoryDAL repositoryDAL)
        {
            _repositoryDAL = repositoryDAL;
        }
        public EDados[] getDados()
        {
            return _repositoryDAL.getDados();

        }

        public bool addDados(EDados dados)
        {
            if (_repositoryDAL.languageCount(dados.language) >= 5)
                return false;

             return  _repositoryDAL.addDados(dados);
        }

        public bool removeDados(EDados dados)
        {
            return _repositoryDAL.removeDados(dados);
        }
    }
}

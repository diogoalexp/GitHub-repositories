using Ateliware.Model;

namespace Ateliware.DAL
{
    public interface IRepositoryDAL
    {
        EDados[] getDados();
        bool addDados(EDados dados);
        int languageCount(string language);
        bool removeDados(EDados dados);
    }
}

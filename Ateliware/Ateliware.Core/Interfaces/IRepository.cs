using Ateliware.Model;

namespace Ateliware.Core
{
    public interface IRepository
    {
        EDados[] getDados();
        bool addDados(EDados dados);
        bool removeDados(EDados dados);
    }
}

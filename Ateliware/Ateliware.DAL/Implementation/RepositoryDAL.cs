using Ateliware.DAL;
using Ateliware.Model;
using System;
using System.Linq;


namespace Ateliware.DAL
{
    public class RepositoryDAL : IRepositoryDAL
    {
        private readonly IDataContextFactory _context;

        public RepositoryDAL(DataContextFactory _context)
        {
            this._context = _context;
        }

        public EDados[] getDados()
        {
            using (var context = _context.Create())
            {
                return (from af in context.ateliware_favorite
                        select new EDados
                        {
                            key = af.ateliware_favorite_id,
                            id = af.id,
                            name = af.nome,
                            language = af.language,
                            updatedBy = af.update_date

                        }).ToArray();
            }
        }

        public bool addDados(EDados dados)
        {
            using (var context = _context.Create())
            {
                var dadosDB = new ateliware_favorite
                {
                    id = dados.id,
                    nome = dados.name,
                    language = dados.language,
                    update_date = DateTime.Now
                };

                context.ateliware_favorite.Add(dadosDB);
                context.SaveChanges();
            }
            return true;
        }

        public bool removeDados(EDados dados)
        {
            using (var context = _context.Create())
            {
                var favorite = (
                    from af in context.ateliware_favorite
                    where af.ateliware_favorite_id.Equals(dados.key)
                    select af
                ).FirstOrDefault();

                if (favorite != null)
                {
                    context.ateliware_favorite.Remove(favorite);
                    context.SaveChanges();
                    return true;
                }
                return false;
            }
        }

        public int languageCount(string language)
        {
            using (var context = _context.Create())
            {
                return (from af in context.ateliware_favorite
                        where af.language.Equals(language)
                        select af
                        ).Count();
            }
        }
    }
}

namespace Ateliware.DAL
{
   public class DataContextFactory : IDataContextFactory
    {        
        public diogoalexpEntities Create()
        {
            return  new diogoalexpEntities();
        }
    }
}

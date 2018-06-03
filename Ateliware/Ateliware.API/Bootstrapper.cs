using Ateliware.Core;
using Ateliware.DAL;
using Unity;
using Unity.Lifetime;

namespace Ateliware.Negocio
{
    public class Bootstrapper
    {
        private static IUnityContainer container;

        public static IUnityContainer BuildUnityContainer()
        {
            container = new UnityContainer();

            RegisterTypes();

            return container;
        }

        public static T Resolve<T>()
        {
            return container.Resolve<T>();
        }

        private static void RegisterTypes()
        {
            RegisterType<IDataContextFactory, DataContextFactory>();
            RegisterType<IRepositoryDAL, RepositoryDAL>();
            RegisterType<IRepository, Repository>();
        }

        private static void RegisterType<TDef, TType>() where TType : TDef
        {
            container.RegisterType<TDef, TType>(new ContainerControlledLifetimeManager());
        }

    }
}
using Ateliware.Core;
using Microsoft.Practices.Unity;
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
            //RegisterType<IDataContextFactory, DataContextFactory>();
        }

        private static void RegisterType<TDef, TType>() where TType : TDef
        {
            container.RegisterType<TDef, TType>(new ContainerControlledLifetimeManager());
        }

    }
}
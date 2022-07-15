using ltgraph.domain.Models.Graph.EventTypes;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;

namespace ltgraph.Utilities.ModelBinders.Providers
{
    public class GraphEventBinderProvider : IModelBinderProvider
    {
        public IModelBinder? GetBinder(ModelBinderProviderContext context)
        {
            if (context.Metadata.ModelType == typeof(List<GraphEvent>))
            {
                return new BinderTypeModelBinder(typeof(GraphEventBinder));
            }

            return null;
        }
    }
}
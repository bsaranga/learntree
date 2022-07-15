using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace ltgraph.Utilities.ModelBinders
{
    public class GraphEventBinder : IModelBinder
    {
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            var modelName = bindingContext.ModelName;
            return Task.CompletedTask;
        }
    }
}
namespace ltgraph.infrastructure.ExtensionMethods
{
    public static class LINQExtensions
    {
        static public IEnumerable<T> Descendants<T>(this IEnumerable<T> source, Func<T, IEnumerable<T>> descendBy)
        {
            if (source != null)
            {
                foreach (T value in source)
                {
                    yield return value;

                    if (descendBy(value) != null)
                    {
                        foreach (T child in descendBy(value).Descendants<T>(descendBy))
                        {
                            yield return child;
                        }
                    }
                }
            }
        }
    }
}
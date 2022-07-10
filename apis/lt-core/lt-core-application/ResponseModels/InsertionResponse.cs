namespace lt_core_application.ResponseModels
{
    /// <summary>
    /// ReturnEntity is only provided when Insertion fails and a return entity is queryable.
    /// </summary>
    /// <typeparam name="T">
    /// Insertion type
    /// </typeparam>
    public class InsertionResponse<T> where T : class
    {
        public bool InsertionSucceded { get; set; }
        public bool InsertionErrored { get; set; }
        public T? ReturnEntity { get; set; }
    }
}
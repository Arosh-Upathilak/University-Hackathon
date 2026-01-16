namespace backend.Service
{
    public interface ICloudinaryService
    {
        Task  DeleteCloudinaryImage (string imageURL);
        public string GetPublicID(string imageURL);
    }
}
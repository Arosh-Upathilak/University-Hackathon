using backend.Models;
using System.IO;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.Extensions.Options;


namespace backend.Service
{
    public class CloudinaryService : ICloudinaryService
    {
        private readonly Cloudinary _cloudinary;
        public CloudinaryService(IOptions<CloudinarySettings> cloudinarysettings)
        {
            var settings = cloudinarysettings.Value;
                var account = new Account(
                    settings.CloudinaryCloudName,
                    settings.CloudinaryApiKey,
                    settings.CloudinaryApiSecret
                );
            
            _cloudinary = new Cloudinary(account);
        }

        public async Task  DeleteCloudinaryImage (string imageURL)
        {
            if (imageURL == null){
                return;
            }
            var result = await _cloudinary.DestroyAsync(
                new DeletionParams(GetPublicID(imageURL))
            );

            if (result.Result != "ok" && result.Result != "not found")
            {
                throw new Exception("Cloudinary delete failed");
            }
        }

        public string GetPublicID(string imageURL)
        {
            if (string.IsNullOrWhiteSpace(imageURL))
                return null;
            var uri = new Uri(imageURL);
            string publicId = Path.GetFileNameWithoutExtension(uri.AbsolutePath);
            return publicId;
        }
    }
}
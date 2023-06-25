from rest_framework import serializers
from PIL import Image
from .services import background_removal

class UploadImageSerializer(serializers.Serializer):
    image = serializers.ImageField()

    def validate_image(self, image):
        # Image validation
        
        # Open the uploaded image using Pillow
        
        try:
            img = Image.open(image)
            print(img)


            processed_image = background_removal.remove_background(img)
            print(f'processed image: {processed_image}')
            

            return processed_image
            
        except Exception as e:
            print('Image is invalid')
            #raise serializers.ValidationError(f'Invalid image: {e}')


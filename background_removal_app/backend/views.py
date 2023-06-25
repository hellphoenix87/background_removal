from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from PIL import Image
from io import BytesIO
import base64
from .services import background_removal
from .image_serializer import UploadImageSerializer


class ImageUploadView(viewsets.ViewSet):
    serializer_class = UploadImageSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)


        if serializer.is_valid():
            #print(f'Serializer is {serializer.validate_image(serializer.validated_data["image"])}')
            # Retrieve the uploaded image from the serializer
            validated_image = serializer.validated_data['image']
            print(validated_image)

            
            # Create a memory buffer to store the processed image
            processed_image_buffer = BytesIO()
            
            # Save the processed image to the memory buffer
            validated_image.save(processed_image_buffer, format='PNG')
            
            # Encode the processed image as Base64
            processed_image_base64 = base64.b64encode(processed_image_buffer.getvalue()).decode('utf-8')
            
            # Return the processed image
            return Response({'result': processed_image_base64})
        else:
            # Return any validation errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from django.shortcuts import render
from django.http import JsonResponse
from PIL import Image
from io import BytesIO
import base64
from .services import background_removal


# Create your views here.

def upload_image(request):
    if request.method == 'POST' and request.FILES['image']:
        
        # Save the uploaded image to a temporary location
        uploaded_image = request.FILES['image']
        
        # Open the uploaded image using Pillow
        image = Image.open(uploaded_image)
        
        # Process uploaded image
        processed_image = background_removal.remove_background(image)
        
        # Memory buffer to store the processed image
        processed_image_buffer = BytesIO()
        
        # Save processed image to memory buffer
        processed_image.save(processed_image_buffer, format='PNG')
        
        # Encode the processed image as Base64
        processed_image_base64 = base64.b64encode(processed_image_buffer.getvalue()).decode('utf-8')
        
        # Return the processed image
        return JsonResponse({'result': processed_image_base64})
    else:
        return JsonResponse({'error': 'No image was uploaded.'})
    

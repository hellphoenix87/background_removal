from rembg import remove
from PIL import Image

def remove_background(image: Image.Image):

    
    # Remove background
    result = remove(image)
    
    return result
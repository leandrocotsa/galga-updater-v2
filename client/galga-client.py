import requests
import time
import os
import hashlib
import platform
import subprocess

SERVER_URL = "https://galga-updater-v2.onrender.com/latest-image"
IMAGE_PATH = "./latest-image.jpg" 

def calculate_saved_image_hash(image_path):
    with open(image_path, "rb") as f:
        return hashlib.md5(f.read()).hexdigest()
    
def first_display_image():
        displayImage(IMAGE_PATH)
        print("Displaying image for the first time.")

def displayImage(image_path):

    print("Displaying image...")
    os_type = platform.system()
    if os_type == "Darwin":
        print("This is macOS.")
        subprocess.run(["osascript", "-e", 'quit app "Preview"'])
        time.sleep(0.5)  # Adding a short delay to ensure Preview is closed
        os.system(f"open {image_path}")
    elif os_type == "Linux":
        print(f"This is {os_type}.")
        os.system(f"feh --fullscreen {IMAGE_PATH}")
    else:
         print(f"{os_type} not supported.")
    

def fetch_and_save_image():
    try:
        print("Fetching latest image...")
        response = requests.get(SERVER_URL, timeout=10)
        response.raise_for_status()

        if os.path.exists(IMAGE_PATH):
            current_hash = hashlib.md5(response.content).hexdigest()
            saved_hash = calculate_saved_image_hash(IMAGE_PATH)

            if current_hash == saved_hash:
                print("The image is the same as the saved one. Skipping display.")
                return  # Skip display if the image is the same
            
        with open(IMAGE_PATH, "wb") as f:
            f.write(response.content)  
        print(f"Image saved at {IMAGE_PATH}")

        displayImage(IMAGE_PATH)

    except requests.exceptions.RequestException as e:
        print(f"Error fetching image: {e}")
    except Exception as e:
        print(f"Error processing image: {e}")

# Run every 10 seconds
first_display_image()
while True:
    fetch_and_save_image()
    time.sleep(10)  

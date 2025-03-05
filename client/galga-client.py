import requests
import time
import os
import hashlib
import platform
import subprocess

IMAGE_PATH = "./latest-image.jpg" 
FETCH_PERIODICITY = 10 # In seconds

# Fetch API key from the system environment variable
API_KEY = os.getenv("API_KEY")
SERVER_URL = os.getenv("SERVER_URL")

if not API_KEY:
    raise ValueError("API_KEY environment variable is not set.")

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
        subprocess.Popen(["feh", "--fullscreen", "--hide-pointer", "--borderless", "--auto-zoom", IMAGE_PATH])
    else:
        print(f"{os_type} not supported.")
    

def fetch_and_save_image():
    try:
        print("Fetching latest image...")

        # Add API key to the headers
        headers = {"x-api-key": API_KEY}

        # Send the request with the API key in the headers
        response = requests.get(SERVER_URL, headers=headers, timeout=10)
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


first_display_image()
while True:
    fetch_and_save_image()
    time.sleep(FETCH_PERIODICITY)

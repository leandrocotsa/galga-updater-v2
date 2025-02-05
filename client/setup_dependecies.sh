#!/bin/bash

# Update and upgrade the system
echo "Updating and upgrading the system..."
sudo apt-get update && sudo apt-get upgrade -y

# Install Python 3 and pip
echo "Installing Python 3 and pip..."
sudo apt-get install -y python3 python3-pip

# Install necessary Python dependencies using requirements.txt
echo "Installing Python dependencies from requirements.txt..."
pip3 install -r requirements.txt

# Install image viewing tool 'feh' for Linux (Raspberry Pi OS)
echo "Installing feh for image display..."
sudo apt-get install -y feh

# Ensure subprocess module is available (should be by default)
echo "Checking if subprocess module is available..."
python3 -c "import subprocess" || echo "Subprocess module is already installed"

echo "All dependencies are installed! You can now run your script."

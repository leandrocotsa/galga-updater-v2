# Galga Updater v2

<p align="center">
  <img src="https://github.com/leandrocotsa/galga-updater-v2/blob/main/imgs/the-frame.jpg?raw=true" width="700" />
</p>

This is the second iteration of this project, designed to keep my sister updated about her dog while I'm taking care of her during my sister’s work hours. She constantly asks me—almost every hour—how her dog is doing, so I built this to save her from needing to ask.

The goal of this project is to remotely send and display a canvas with photos and/or text. With this setup, I can send her visual updates on how Galga (her dog) is doing.

This project can also be used to send remote messages to loved ones. It’s a cool little device to have on a desk! It’s built to work over the internet, allowing you to send messages from anywhere as long as there's an internet connection.

## Setup

### Material I used


<p align="center">
  <img src="https://github.com/leandrocotsa/galga-updater-v2/blob/main/imgs/components.jpg?raw=true" width="500" />
</p>

- Raspberry Pi Zero 2w
- 5inch Display for Raspberry Pi, DPI Interface (this one: https://www.waveshare.com/5inch-lcd-for-pi.htm?amazon)
- 3D printed frame (available inside the `/3d-models` directory of this repo)

<p align="center">
  <img src="https://github.com/leandrocotsa/galga-updater-v2/blob/main/imgs/wiring.jpg?raw=true" width="500" />
</p>

## How to run
### Server side
The server side of this project is essentially composed of a node app that serves the html form through which the user can send the image updates. The app also exposes the endpoints to update the latest image and fetch the latest image. 

To host your Node app you can use a free tier from cloud platforms like [Render](https://render.com/), as it is enough for this purpose, and you should deploy the app inside the `/server` directory.
Make sure you deploy it with these environment variables filled:

| Env Variable | Purpose |
| ------ | ------ |
| API_BASE_URL | The url in which your node app is deployed (to be injected in the HTML page) |
| API_KEY | The Api Key for authenticating the upload image request (to be filled in the html form and used by the client to authenticate) |

To run the app locally just go inside the `/server` directory and run:

```sh
npm install
node ./app.js
```
Then you can access the form via `localhost:3000`.

<p align="center">
  <img src="https://github.com/leandrocotsa/galga-updater-v2/blob/main/imgs/webpage.jpg?raw=true" />
</p>


### Client side
The client is the device that will display the images. For this I used the Raspberry Pi Zero attached to a display. All the dependencies needed to run the client on Linux can be installed by running the created script for this purpose inside the `/client` directory:

```sh
./setup_dependecies.sh
```
You also need to set a couple environment variables on your device:

| Env Variable | Purpose |
| ------ | ------ |
| SERVER_URL | The url in which your node app is deployed |
| API_KEY | The Api Key for authenticating the fetching of the latest image |

Then you can run the application:
```sh
python ./galga-client.py
```
The application will fetch the images from the node app and display them in the screen. It will periodically check for new images (every 5 minutes).

<p align="center">
  <img src="https://github.com/leandrocotsa/galga-updater-v2/blob/main/imgs/preview.jpg?raw=true" width="700" />
</p>

Additionally, if you want to make this run everytime you turn on the client device you can create a system service for that purpose. For more info on that check this tutorial: [link](https://hackernoon.com/how-to-run-scripts-on-boot-in-linux-using-systemd)

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>

# Galga Updater v2


This is the second iteration on my project that serves to give my sister updates about her dog that I look over when she's working. My sister keeps asking me almost hourly about how is her dog doing, so I built this so she doesn't need to ask.

The purpose of this project is to remotely being able to send and display a canvas with photos and/or text. With this project I'm able to send her visual updates of how is Galga (her dog).

This project can also be used to send remote messages to your loved ones, it's a cool thing to have in the desk. It's build to work over the internet, so you can send messages from anywhere, as long as there is an internet connection.

## Setup

### Material I used

- Raspberry Pi Zero 2w
- 5inch Display for Raspberry Pi, 800×480, DPI Interface (this one: https://www.waveshare.com/5inch-lcd-for-pi.htm?amazon)
- 3D printed frame (link to the stl file)

## How to run
### Server side
The server side of this project is essentially composed of a node app that serves the html form in which the user can send the image updates and has the endpoints to update the latest image and fetch the latest image. 
To host your Node app you can use free a free tier from cloud platoforms like [Render](https://render.com/), as it is enough for this purpose, and you should deploy the app inside the /server directory.
Make sure you deploy it with these environment variables filled:

| Env Variable | Purpose |
| ------ | ------ |
| API_BASE_URL | The url in which your node app is deployed (to be injected in the HTML page) |
| API_KEY | The Api Key for authenticating the upload image request (to be filled in the html form and used by the client to authenticate) |

### Client side
The client is the device that will display the images. For this I've the Raspberry Pi Zero attached to a display. All the dependencies needed to run the client on Linux can be installed by running the created script for this purpose:

```sh
./setup_dependecies.sh
```
Then you can run the application:
```sh
python ./galga-client.py
```

Additionally, if you want to make this to run everytime you turn on the client device you can create a system service for that purpose. For more info on that check this tutorial: [link](https://hackernoon.com/how-to-run-scripts-on-boot-in-linux-using-systemd)

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>

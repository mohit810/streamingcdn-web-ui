# This is Web UI for `Webrtc -> HLS` Project

In this module you will find 2 web pages for the [Webrtc -> HLS](https://github.com/mohit810/streamingcdn) Project. 
1) Broadcasting Page 
2) Viewer Page ( Broadcast watcher )

### Run Application

#### Steps to follow for using this project
1) Install Golang
2) Download the project using Git command `git clone https://github.com/mohit810/streamingcdn-web-ui` 
3) To start the server use the command `go run main.go`

* Congratulations!! Now the server is up and running.

### Start a publisher

* Open [localhost:8000/broadcast](http://localhost:8000/broadcast) and Paste the streamKey(this is the streamKey which will be used by the viewers to watch the stream).
* Click `Publish a Broadcast` and now you don't have to do anything.
* Communicating with the server is done by the js itself.  
* If you want to know the request that is sent to server via `POST` method, refer to the screenshot attached below. The `Webrtc -> HLS server` will respond with an offer as a response to the `POST`.

![](https://github.com/mohit810/streamingcdn-web-ui/blob/master/Screenshot.png)

### Start a publisher

* Open [localhost:8000/viewer](http://localhost:8000/viewer) and Past the streamKey that the Broadcaster used for starting the stream.

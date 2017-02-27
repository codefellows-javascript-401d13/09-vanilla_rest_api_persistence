# Vanilla Javascript API router w/File Server persistance

This app creates an HTTP server that handles GET, POST, and DELETE to a server-level persistance layer.

# System Requirements

  - Terminal.app on macOS or equivalent
  - node.js and npm package manager installed


### Installation

Clone the repository to your local server
```sh
https://github.com/zcrumbo/09-vanilla_rest_api_persistence.git
```

Install the dependencies -

```sh
$ npm i
```
[HTTPie](https://httpie.org/) will be required to run the HTTP requests from your terminal window. You will need to install this with [Homebrew][1] on macOS. It is also easier to see the results of all operations by running mocha tests with the command
```sh
$ mocha
```

Start the server

```sh
$ node server.js
```


### Connecting

If you are using HTTPie, in your terminal window, type the following commands, where '3000' would be replaced with your local environment PORT variable, if configured. Commands can only be sent to the api/bike endpoint
```sh
$  http POST :3000/api/bike name='test name' content='test content' #creates a new bike object and writes it to the fileserver, and returns a unique id
$ http GET localhost:8000/api/bike?id=sample-id #returns the name and content of a stored bike object
$ DELETE localhost:8000/api/bike?id=sample-id #deletes the bike file from server storage
```

[1]:https://brew.sh/


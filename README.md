# P2P-Chat 
This is a chat application based on P2P network with no-one tracking the messages in between. It is a fully secured 
as one else can view the messages between a peer connection. This is built on npm modules mostly written by mafintosh.

###Usage:
For user one to open the connection
```
node peer.js <user1> <user2>
```

Then for user2 to connect to this:
```
node peer.js <user2> <user1>
```

Also works for group messaging, just simply put your name as arg[2] and add other usernames from arg[3].
Example:
```
node peer.js <your name> <otheruser1> <otheruser2> <otheruser3>
```
:warning: Username is the unique thing and no two users can have same username at an instance, error message will thrown if that happens


:point_right: This runs on NodeJS, so make sure you have it and NPM too

Run this commands to install the packages if they aren't working well
```
npm install lookup-multicast-dns
npm install fully-connected-topology
npm install duplex-json-stream
npm install stream-set
npm install hash-to-port
npm install register-multicast-dns
```

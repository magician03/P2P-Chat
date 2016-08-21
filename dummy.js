const spawn = require('child_process').spawn;
args = ['peer1.js', 'hello', 'bar'];

function initThing () {
	const ls = spawn('node', args);
	ls.stdout.pipe(process.stdout);
	ls.stderr.pipe(process.stdout);

	ls.stdout.on('data', (data) => {
		var x = `${data}`;
		x = x.split('>');
		var username = x[0];
		var message = x.slice(1, x.length).join('>');

		if (username == 'new_peer') {
			var peerElem = document.createElement('div');
			peerElem.innerHTML = message.split('.')[0];

			document.getElementById('peer-box').appendChild(peerElem);
		} else {
			var msgElem = document.createElement('div');
			msgElem.setAttribute('class', 'message');
			msgElem.innerHTML = "<span class='sender-name'>"+username+"</span><br> "+message;

			document.getElementById('chat-window').appendChild(msgElem);
		  // document.write(`${data}`);
		}
	});

	ls.stderr.on('data', (data) => {
	  document.write(`stderr: ${data}`);
	});	

	ls.on('close', (code) => {
	  document.write(`child process exited with code ${code}`);
	});
	
}

initThing();
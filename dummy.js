const spawn = require('child_process').spawn;
const ls = spawn('node', ['peer1.js', 'hello', 'bye']);
ls.stdout.pipe(process.stdout);
ls.stderr.pipe(process.stdout);
console.log(ls);

function initThing () {
	ls.stdout.on('data', (data) => {
		  document.write(`stdout: ${data}`);
	});

	ls.stderr.on('data', (data) => {
		  document.write(`stderr: ${data}`);
	});	

	ls.on('close', (code) => {
		  document.write(`child process exited with code ${code}`);
	});
	
}

document.getElementById('mybtn').onclick = function() {
	initThing();
}

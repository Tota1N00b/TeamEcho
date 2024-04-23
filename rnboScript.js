const audioContext = new (window.AudioContext || window.webkitAudioContext)();

const bufferId = "theFile";

const audioButton = document.getElementById("audio-button");

audioButton.addEventListener("click", async () => {
	
	const patcherRequest = new Request("assets/echoGrain.export.json");
	const patcherResponse = await fetch(patcherRequest);
	const patcher = await patcherResponse.json();

	// Create the device
	device = await RNBO.createDevice({ context: audioContext, patcher: patcher });

	// Load our sample as an ArrayBuffer;
	const fileResponse = await fetch("assets/drone.wav");
	const arrayBuf = await fileResponse.arrayBuffer();

	// Decode the received Data as an AudioBuffer
	const audioBuf = await audioContext.decodeAudioData(arrayBuf);

	// Set the DataBuffer on the device
	await device.setDataBuffer(bufferId, audioBuf);

	// Connect the device to the audio out
	device.node.connect(audioContext.destination);

	audioContext.resume()

	//declaring parameters

	const grainChord = device.parametersById.get("chord");
	const grainVol = device.parametersById.get("volume");
	const grainRate = device.parametersById.get("grainRate");
	const grainLengthMin = device.parametersById.get("grainLengthMin");
	const grainStart = device.parametersById.get("startCenterValue");
	const grainJitter = device.parametersById.get("startJitter");
	const delayLength = device.parametersById.get("delayLengthMs");
	const delayDryWet = device.parametersById.get("delayDryWet");
	const delayRamp = device.parametersById.get("delayRampMs");

	//changes the interactivity on mobile, gives the delay a longer interpolation time

	if(window.innerWidth <= 750){
		delayRamp.value = 1000;
	}
	else{
		delayRamp.value = 20;
	}

	grainChord.value = 6;
	grainVol.value = 0.8;
	grainRate.value = 10;
	delayDryWet.value = 0.8;

	//change parameters according to mouse, a little goofy on mobile

	addEventListener("mousemove", (event) => {
		let normMouseX = event.clientX / window.innerWidth;
		let normMouseY = event.clientY / window.innerHeight;

		grainStart.value = normMouseX;
		grainLengthMin.value = 5 + mouseY * 60;
		grainJitter.value = 1- normMouseY;
		delayLength.value = normMouseX * 200;
	});

  }, {once: true});

//runs only once to be sure it doesn't instantiate more rnbo objects

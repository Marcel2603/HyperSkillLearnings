function initHandler() {
	const keys = [...document.querySelectorAll("kbd").values()]
		.map(kbd => kbd.textContent.toUpperCase());
	document.addEventListener("keydown", (event) => {
		const key = event.key.toUpperCase();
		if (keys.includes(key)) {
			let audio = new Audio(`assets/${key}.mp3`);
			audio.play();
		} else {
			console.warn("Unbound key was pressed");
		}
	});
}

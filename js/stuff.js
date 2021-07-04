// basically for functions that make stuff easier

// get the total amount of upgrades
function getUps() {
	return Object.keys(layers).map(layer => player[layer].upgrades.length).reduce((a,b) => a+b, 0)
}

// get the total amount of achievements
function getAchs() {
	return Object.keys(layers).map(layer => player[layer].achievements.length).reduce((a,b) => a+b, 0)
}
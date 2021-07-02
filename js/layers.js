// =======
// LAYER 1
// =======

// EGG POINTS

addLayer("e", {
	name: "Egg", // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: "E", // This appears on the layer's node. Default is the id with the first letter capitalized
	position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	startData() { return {
		unlocked: true,
		points: new Decimal(0),
	} },
	color: "#F2AD18",
	requires: new Decimal(10), // Can be a function that takes requirement increases into account
	resource: "egg points", // Name of prestige currency
	baseResource: "points", // Name of resource prestige is based on
	baseAmount() { return player.points }, // Get the current amount of baseResource
	type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent() { return 0.5 },
	row: 0, // Row the layer is in on the tree (0 is the first row)
	layerShown() { return true; },
	gainMult() { // Calculate the multiplier for main currency from bonuses
		mult = new Decimal(1);
		return mult;
	},
	gainExp() { // Calculate the exponent on main currency from bonuses
		return new Decimal(1);
	},
	hotkeys: [
		{ key: "ctrl+s", description: "Ctrl+S: Save the game", onPress() {
            save(true);
        } },
		{ key: "e", description: "E: Reset for egg points", onPress() {
			if (canReset(this.layer)) doReset(this.layer);
		} },
	],
	upgrades: {
		11: {
			title: "Start",
    		description: "Get 1 point per second.",
    		cost: new Decimal(10),
		}
    },
});
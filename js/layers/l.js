addLayer('l', {
	name: 'light', // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: 'L', // This appears on the layer's node. Default is the id with the first letter capitalized
	position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	startData() { return {
		unlocked: false,
		points: new Decimal(0),
		best: new Decimal(0),
		total: new Decimal(0),
		resets: new Decimal(0),
	} },
	color: '#ede974',
	requires() { // Can be a function that takes requirement increases into account // its now
		cost = new Decimal(15);
		return cost;
	},
	onPrestige() {
		player[this.layer].resets = player[this.layer].resets.add(1);
	},
	doReset(reset) {
		keep = [];
		if (layers[reset].row > this.row) layerDataReset('l', keep);
	},
	canBuyMax() { return false },
	roundUpCost: true,
	tabFormat: defaultTab('l'),
	resource: 'light', // Name of prestige currency
	baseResource: 'multipliers', // Name of resource prestige is based on
	baseAmount() { return player.m.points }, // Get the current amount of baseResource
	type: 'static', // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent() {
		exp = 1.5;
		return exp;
	},
	base() { return 1.2 },
	row: 2, // Row the layer is in on the tree (0 is the first row)
	layerShown() { return player.b.unlocked },
	gainMult() { // Calculate the multiplier for main currency from bonuses
		mult = new Decimal(1);
		return mult;
	},
	gainExp() { // Calculate the exponent on main currency from bonuses
		return new Decimal(1);
	},
	effBase() {
		base = new Decimal(2);
		return base;
	},
	effect() {
		mult = tmp.l.effBase.pow(player.l.points);
		return mult;
	},
	effectDescription() {
		return `which are doing stuff`;
	},
	hotkeys: [
		{ key: 'l', description: 'L: Reset for light', onPress() { if (canReset(this.layer)) doReset(this.layer) }, unlocked() { return player[this.layer].unlocked } },
	],
});
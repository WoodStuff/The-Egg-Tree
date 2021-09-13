addLayer('b', {
	name: 'bar', // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: 'B', // This appears on the layer's node. Default is the id with the first letter capitalized
	position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	startData() { return {
		unlocked: false,
		points: new Decimal(0),
		best: new Decimal(0),
		total: new Decimal(0),
		resets: new Decimal(0),
		pieces: new Decimal(0),
		pps: new Decimal(0),
	} },
	color: '#e02655',
	requires() { // Can be a function that takes requirement increases into account // its now
		cost = new Decimal('5e17');
		return cost;
	},
	onPrestige() {
		player[this.layer].unlocked = true;
		player[this.layer].resets = player[this.layer].resets.add(1);
	},
	doReset(reset) {
		keep = [];
		if (!(layers[reset].row < this.row)) player.b.pieces = new Decimal(0);
		if (layers[reset].row > this.row) layerDataReset('b', keep);
	},
	tabFormat() { return [
		'main-display',
		'prestige-button',
		'resource-display',
		['display-text', `You have ${format(player.b.pieces)} bar pieces, which are multiplying point gain by ${format(tmp.b.peffect)}x` ],
		'milestones',
		'upgrades',
		'achievements',
	] },
	resource: 'bar points', // Name of prestige currency
	baseResource: 'points', // Name of resource prestige is based on
	baseAmount() { return player.points }, // Get the current amount of baseResource
	type: 'normal', // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent() { return 0.25 },
	row: 2, // Row the layer is in on the tree (0 is the first row)
	layerShown() { return hasUpgrade('e', 33) || player.b.unlocked; },
	gainMult() { // Calculate the multiplier for main currency from bonuses
		mult = new Decimal(1);

		return mult;
	},
	gainExp() { // Calculate the exponent on main currency from bonuses
		return new Decimal(1);
	},
	effect() {
		eff = player[this.layer].points.pow(2);
		return eff;
	},
	effectDescription() {
		return `which are producing ${format(tmp.b.effect)} bar pieces per second`;
	},
	hotkeys: [
		{ key: 'b', description: 'B: Reset for bar points', onPress() {
			if (canReset(this.layer)) doReset(this.layer);
		} },
	],
	peffect() {
		eff = player.b.pieces.add(1).pow(0.25);
		
		return eff;
	},
	update(diff) {
		player.b.pieces = player.b.pieces.plus(tmp.b.effect.times(diff));
	},
	milestones: {
		0: {
			requirementDescription: '1 bar point',
			effectDescription: 'Point gain x3, and keep multiplier and chicken milestones on bar reset',
			done() { return player.b.best.gte(1) },
		},
		1: {
			requirementDescription: '2 bar points',
			effectDescription: 'You can buy max Multipliers and Chickens',
			done() { return player.b.best.gte(2) },
		},
	},
});
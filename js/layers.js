function parseName(name, id, layer) {
	var left = id - 1;
	var up = id - 10;
	if (left.toString().includes(0)) {
		left = false;
	}
	if (up.toString().includes(0)) {
		up = false;
	}
	return (hasUpgrade(layer, left) || hasUpgrade(layer, up)) ? name : '???'
}
function parseDesc(desc, id, layer) {
	var left = id - 1;
	var up = id - 10;
	if (left.toString().includes(0)) {
		left = false;
	}
	if (up.toString().includes(0)) {
		up = false;
	}
	return (hasUpgrade(layer, left) || hasUpgrade(layer, up)) ? desc : 'Locked!'
}
function parseCost(cost, id, layer) {
	var left = id - 1;
	var up = id - 10;
	if (left.toString().includes(0)) {
		left = false;
	}
	if (up.toString().includes(0)) {
		up = false;
	}
	return (hasUpgrade(layer, left) || hasUpgrade(layer, up)) ? cost : big
}
const big = new Decimal('e90000000')

addLayer('b', {
	name: 'basic', // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: 'B', // This appears on the layer's node. Default is the id with the first letter capitalized
	position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	startData() { return {
		unlocked: true,
		points: new Decimal(0),
	}},
	color: '#FFBF00',
	requires: new Decimal(10), // Can be a function that takes requirement increases into account
	resource: 'basic points', // Name of prestige currency
	baseResource: 'points', // Name of resource prestige is based on
	baseAmount() { return player.points }, // Get the current amount of baseResource
	type: 'normal', // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent: 0.5, // Prestige currency exponent
	gainMult() { // Calculate the multiplier for main currency from bonuses
		mult = new Decimal(1);
		return mult;
	},
	gainExp() { // Calculate the exponent on main currency from bonuses
		return new Decimal(1);
	},
	row: 0, // Row the layer is in on the tree (0 is the first row)
	hotkeys: [
		{ key: 'b', description: 'B: Reset for basic points', onPress() { if (canReset(this.layer) && false) doReset(this.layer) } },
	],
	layerShown() { return true },
	tabFormat() {
		return [
		false ? 'main-display' : '',
		false ? 'prestige-button' : '',
		['display-text', '<h1>Upgrades</h1>'],
		'blank',
		'upgrades']
	},
	upgrades: {
		11: {
			title: 'Beginning',
			description: 'Generate 1 point per second',
			cost: new Decimal(5),
			currencyDisplayName: 'points',
			currencyInternalName: 'points',
		},
		12: {
			title() {
				return parseName('Self-Boost', 12, 'b');
			},
			description() {
				return parseDesc('Gain more points based on points', 12, 'b');
			},
			cost() {
				return parseCost(new Decimal(5), 12, 'b');
			},
			currencyDisplayName: 'points',
			currencyInternalName: 'points',
		}
	}
})
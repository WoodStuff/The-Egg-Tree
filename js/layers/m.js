addLayer('m', {
	name: 'Multipliers', // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: 'M', // This appears on the layer's node. Default is the id with the first letter capitalized
	position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	startData() { return {
		unlocked: false,
		points: new Decimal(0),
		resets: new Decimal(0),
	} },
	color: '#495FBA',
	requires() { // Can be a function that takes requirement increases into account // its now
		cost = new Decimal(100);
		return cost;
	},
	onPrestige() {
		player[this.layer].resets = player[this.layer].resets.add(1);
	},
	tabFormat: defaultTab('m'),
	resource: 'multipliers', // Name of prestige currency
	baseResource: 'egg points', // Name of resource prestige is based on
	baseAmount() { return player.e.points }, // Get the current amount of baseResource
	type: 'static', // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent() {
		exp = 1.3;
		return exp;
	},
	base() { return 5 },
	row: 1, // Row the layer is in on the tree (0 is the first row)
	layerShown() { return player.e.unlocked; },
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
		mult = tmp.m.effBase.pow(player.m.points);
		return mult;
	},
	effectDescription() {
		return `which are multiplying point gain by ${format(tmp[this.layer].effect)}x`;
	},
	hotkeys: [
		{ key: 'm', description: 'M: Reset for multipliers', onPress() { if (canReset(this.layer)) doReset(this.layer); }, unlocked() { return player[this.layer].unlocked; } },
	],
	milestones: {
		0: {
			requirementDescription: '3 multipliers',
			effectDescription: 'Keep egg upgrades on multiplier reset',
			done() { return player.m.points.gte(3) }
		}
	},
	upgrades: {
		11: {
			title: 'Egg Motivation',
			description: 'Total multipliers boost egg point production at a reduced rate',
			cost: new Decimal(2),
			unlocked: true,
			effect() {
				return player[this.layer].total.add(1).pow(0.35);
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + 'x'; }, // Add formatting to the effect
		},
		12: {
			title: 'Egg Create',
			description: 'Multipliers boost chicken effect',
			cost: new Decimal(5),
			unlocked: true,
			effect() {
				return player[this.layer].points.add(1).pow(0.15);
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + 'x'; }, // Add formatting to the effect
		},
	},
});
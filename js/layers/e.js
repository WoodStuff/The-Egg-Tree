// =======
// LAYER 1
// =======

// EGG POINTS

addLayer('e', {
	name: 'Egg', // This is optional, only used in a few places, If absent it just uses the layer id.
	symbol: 'E', // This appears on the layer's node. Default is the id with the first letter capitalized
	position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
	startData() { return {
		unlocked: false,
		points: new Decimal(0),
		resets: new Decimal(0),
		achs: {
			14: false,
		},
	} },
	color: '#F2AD18',
	requires() { // Can be a function that takes requirement increases into account // its now
		cost = new Decimal(5);
		if (hasUpgrade('c', 12)) cost = new Decimal(2);
		return cost;
	},
	onPrestige() {
		player[this.layer].unlocked = true;
		player[this.layer].resets = player[this.layer].resets.add(1);
	},
	doReset(reset) {
		keep = [];
		if (hasMilestone('m', 0) && reset == 'm') keep.push('upgrades');
		if (hasMilestone('c', 0) && reset == 'c') keep.push('upgrades');
		if (layers[reset].row > this.row) layerDataReset('e', keep);
	},
	tabFormat: defaultTab('e'),
	resource: 'egg points', // Name of prestige currency
	baseResource: 'points', // Name of resource prestige is based on
	baseAmount() { return player.points }, // Get the current amount of baseResource
	type: 'normal', // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
	exponent() { return 0.5 },
	row: 0, // Row the layer is in on the tree (0 is the first row)
	layerShown() { return true; },
	branches: ['m', 'c'],
	gainMult() { // Calculate the multiplier for main currency from bonuses
		mult = new Decimal(1);
		if (player.c.unlocked) mult = mult.times(layers.c.effect()); // Multiplier Bonus
		if (hasUpgrade('m', 11)) mult = mult.times(upgradeEffect('m', 11)); // Egg Motivation

		if (hasUpgrade('e', 22)) mult = mult.times(upgradeEffect('e', 22)); // Point Softening
		return mult;
	},
	gainExp() { // Calculate the exponent on main currency from bonuses
		return new Decimal(1);
	},
	hotkeys: [
		{ key: 'ctrl+s', description: 'Ctrl+S: Save the game', unlocked: true, onPress() {
			save(true);
		} },
		{ key: '-', description: '-: Toggle info mode', unlocked: true, onPress() {
			player.info = !player.info;
		} },
		{ key: 'e', description: 'E: Reset for egg points', onPress() {
			if (canReset(this.layer)) doReset(this.layer);
		} },
	],
	upgrades: {
		11: {
			title: 'Start',
			description: 'Get 1 point per second',
			cost: new Decimal(1),
		},
		12: {
			title: 'Egg Power',
			description: 'Gain more points based on egg points',
			cost: new Decimal(2),
			unlocked() {
				return hasUpgrade('e', 11);
			},
			effect() {
				return player[this.layer].points.add(1).pow(0.5);
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + 'x'; }, // Add formatting to the effect
		},
		13: {
			title: 'Triple Generators',
			description: 'Get 3x more points per second',
			cost: new Decimal(10),
			unlocked() {
				return hasUpgrade('e', 11);
			},
		},
		21: {
			title: 'Self-Synergy',
			description: 'Gain more points based on points',
			cost: new Decimal(15),
			unlocked() {
				return hasUpgrade('e', 13);
			},
			effect() {
				return player.points.add(1).pow(0.25);
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + 'x'; }, // Add formatting to the effect
		},
		22: {
			title: 'Point Softening',
			description: 'Gain more egg points based on points',
			cost: new Decimal(50),
			unlocked() {
				return hasUpgrade('e', 12) && hasUpgrade('e', 21);
			},
			effect() {
				return player.points.add(1).pow(0.15);
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + 'x'; }, // Add formatting to the effect
		},
		23: {
			title: 'Secondary Power',
			description: 'Gain more points based amount of upgrades from all layers bought',
			cost: new Decimal(500),
			unlocked() {
				return hasUpgrade('e', 22);
			},
			effect() {
				return Math.pow(getUps(), 0.75);
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id)) + 'x'; }, // Add formatting to the effect
			onPurchase() {
				player[this.layer].achs[14] = true;
			}
		},
	},
	achievements: {
		11: {
			name: 'Starting out',
			tooltip() {
				return `Get 10 egg points\nCurrently: ${player[this.layer].points}`;
			},
			image: 'https://media.discordapp.net/attachments/478214127945383936/860595705672630282/starting_out_tet.png',
			done() {
				return player.e.points.gte(10);
			},
		},
		12: {
			name: 'Yolkmaker',
			tooltip() { 
				return `Reset egg layer 50 times\nCurrently: ${player[this.layer].resets}`;
			},
			image: 'https://cdn.discordapp.com/attachments/478214127945383936/860834255319728128/yolkmaker_tet.png',
			done() {
				return player.e.resets.gte(50);
			},
		},
		13: {
			name: 'A new dimension',
			tooltip() {
				return `Unlock a new layer`;
			},
			image: 'https://media.discordapp.net/attachments/478214127945383936/861583068564291614/a_new_dimension_tet.png',
			done() {
				return player.m.unlocked || player.c.unlocked;
			},
		},
		14: {
			name: 'Optimize',
			tooltip() {
				return `Get the first 6 egg upgrades`;
			},
			image: 'https://cdn.discordapp.com/attachments/478214127945383936/862785941964849203/optimize_tet.png',
			done() {
				return player.e.achs[14];
			},
		},
	},
});
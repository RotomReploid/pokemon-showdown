export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	acroom: { // Weakens ice and fire moves
		num: 0,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Air Conditioned Room",
		pp: 10,
		priority: 0,
		flags: {mirror: 1, metronome: 1},
		pseudoWeather: 'acroom',
		secondary: null,
		target: "all",
		type: "Flying",
		zMove: {boost: {spd: 1}},
		contestType: "Cool",
	},
	cozyroom: {
		num: 0,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Cozy Room",
		pp: 10,
		priority: 0,
		flags: {mirror: 1, metronome: 1},
		pseudoWeather: 'cozyroom',
		secondary: null,
		target: "all",
		type: "Normal",
		zMove: {effect: 'heal'},
		contestType: "Cute",
	},
	lockedroom: { // Prevents switching out and in
		num: 0,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Locked Room",
		pp: 10,
		priority: 0,
		flags: {mirror: 1, metronome: 1},
		pseudoWeather: 'lockedroom',
		secondary: null,
		target: "all",
		type: "Steel",
		zMove: {boost: {spe: 1}},
		contestType: "Clever",
	},
	mudkiproom: { // Boosts Mudkip on entry
		num: 0,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Mudkip Room",
		pp: 10,
		priority: 0,
		flags: {mirror: 1, metronome: 1},
		pseudoWeather: 'mudkiproom',
		secondary: null,
		target: "all",
		type: "Water",
		zMove: {boost: {atk: 1, def: 1, spa: 1, spd: 1, spe: 1}},
		contestType: "Cute",
	},
	smogroom: { // Poisons
		num: 0,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Smog Room",
		pp: 10,
		priority: 0,
		flags: {mirror: 1, metronome: 1},
		pseudoWeather: 'smogroom',
		secondary: null,
		target: "all",
		type: "Poison",
		zMove: {effect: 'heal'},
		contestType: "Tough",
	},
	smokeroom: { // Lowers accuracy
		num: 0,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Smoke Room",
		pp: 10,
		priority: 0,
		flags: {mirror: 1, metronome: 1},
		pseudoWeather: 'smokeroom',
		secondary: null,
		target: "all",
		type: "Fire",
		zMove: {boost: {accuracy: 1}},
		contestType: "Beautiful",
	},

	// non-room moves
	// i have to make gay pokemon are you kidding me
	// you are a National Merit Scholarship Semifinalist my guy
	// TODO: Make gay pokemon. (Yes, seriously.)
	attract: {
		inherit: true,
		onTryImmunity(target, source, move) {
			
		},
		condition: {
			noCopy: true, // doesn't get copied by Baton Pass
			onStart(pokemon, source, effect) {
				if (!(pokemon.gender === 'M' && source.gender === 'F') && !(pokemon.gender === 'F' && source.gender === 'M')) {
					this.debug('incompatible gender');
					return false;
				}
				if (!this.runEvent('Attract', pokemon, source)) {
					this.debug('Attract event failed');
					return false;
				}

				if (effect.name === 'Cute Charm') {
					this.add('-start', pokemon, 'Attract', '[from] ability: Cute Charm', `[of] ${source}`);
				} else if (effect.name === 'Destiny Knot') {
					this.add('-start', pokemon, 'Attract', '[from] item: Destiny Knot', `[of] ${source}`);
				} else {
					this.add('-start', pokemon, 'Attract');
				}
			},
			onUpdate(pokemon) {
				if (this.effectState.source && !this.effectState.source.isActive && pokemon.volatiles['attract']) {
					this.debug(`Removing Attract volatile on ${pokemon}`);
					pokemon.removeVolatile('attract');
				}
			},
			onBeforeMovePriority: 2,
			onBeforeMove(pokemon, target, move) {
				this.add('-activate', pokemon, 'move: Attract', '[of] ' + this.effectState.source);
				if (this.randomChance(1, 2)) {
					this.add('cant', pokemon, 'Attract');
					return false;
				}
			},
			onEnd(pokemon) {
				this.add('-end', pokemon, 'Attract', '[silent]');
			},
		}
	}
}
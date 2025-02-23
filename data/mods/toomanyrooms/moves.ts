export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	acroom: { // Weakens ice and fire moves
		num: 0,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Air Conditioned Room",
		pp: 10,
		priority: 6,
		flags: {mirror: 1, metronome: 1},
		pseudoWeather: 'acroom',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Air Conditioned Room');
					return 7;
				}
				return 5;
			},
			onBasePower(basePower, source, target, move) {
				if (['Fire', 'Ice'].includes(move.type)) {
					return this.chainModify(0.5);
				}
			},
			onFieldStart(field, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-fieldstart', 'move: Air Conditioned Room', '[of] ' + source, '[persistent]');
				} else {
					this.add('-fieldstart', 'move: Air Conditioned Room', '[of] ' + source);
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 5,
			onFieldEnd() {
				this.add('-fieldend', 'move: Air Conditioned Room');
			},
		},
		secondary: null,
		target: "all",
		type: "Flying",
		zMove: {boost: {spd: 1}},
		contestType: "Clever",
	},
	cozyroom: {
		num: 0,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Cozy Room",
		pp: 10,
		priority: 6,
		flags: {mirror: 1, metronome: 1},
		pseudoWeather: 'cozyroom',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Cozy Room');
					return 7;
				}
				return 5;
			},
			onStart(target, source, sourceEffect) {
				
			},
			onResidual(target, source, effect) {
				
			},
			onFieldStart(field, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-fieldstart', 'move: Cozy Room', '[of] ' + source, '[persistent]');
				} else {
					this.add('-fieldstart', 'move: Cozy Room', '[of] ' + source);
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 5,
			onFieldEnd() {
				this.add('-fieldend', 'move: Cozy Room');
			},
		},
		secondary: null,
		target: "all",
		type: "Normal",
		zMove: {boost: {spd: 1}},
		contestType: "Cute",
	},
	lockedroom: { // Prevents switching out and in
		num: 0,
		accuracy: true,
		basePower: 0,
		category: "Status",
		name: "Locked Room",
		pp: 10,
		priority: 6,
		flags: {mirror: 1, metronome: 1},
		pseudoWeather: 'lockedroom',
		condition: {
			duration: 5,
			durationCallback(source, effect) {
				if (source?.hasAbility('persistent')) {
					this.add('-activate', source, 'ability: Persistent', '[move] Locked Room');
					return 7;
				}
				return 5;
			},
			onDragOut(pokemon, source, move) {
				return !pokemon.runImmunity('trapped');
			},
			onModifyMove(move, pokemon, target) {
				if (move.id === 'beatup') {
					move.multihit = 1;
				}
			},
			onSwitchIn(pokemon) {
				if (pokemon.runImmunity('trapped')) {
					pokemon.addVolatile('outside');
				}
			},
			onTrapPokemon(pokemon) {
				pokemon.tryTrap();
			},
			onFieldStart(field, source) {
				if (source?.hasAbility('persistent')) {
					this.add('-fieldstart', 'move: Locked Room', '[of] ' + source, '[persistent]');
				} else {
					this.add('-fieldstart', 'move: Locked Room', '[of] ' + source);
				}
			},
			onFieldResidualOrder: 27,
			onFieldResidualSubOrder: 5,
			onFieldEnd() {
				this.add('-fieldend', 'move: Locked Room');
			},
		},
		secondary: null,
		target: "all",
		type: "Rock",
		zMove: {boost: {spd: 1}},
		contestType: "Clever",
	},
}
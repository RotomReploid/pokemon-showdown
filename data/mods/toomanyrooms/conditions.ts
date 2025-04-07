export const Conditions: import('../../../sim/dex-conditions').ModdedConditionDataTable = {
	outside: {
		name: "Outside",
		onInvulnerability(target, source, move) {
			if ((source.getVolatile('outside') && source.isAlly(target)) || move.type === 'Ghost') return;
			return false;
		},
		onBeforeMove(pokemon, target, move) {
			if (pokemon.isAlly(target) || move.type === 'Ghost') return;
			this.add('cant', pokemon, 'condition: Outside');
			return false;
		},
		onImmunity(type, pokemon) {
			if (type == 'trapped') return;
		},
	},

	// Rooms

	acroom: {
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
	cozyroom: {
		duration: 5,
		durationCallback(source, effect) {
			if (source?.hasAbility('persistent')) {
				this.add('-activate', source, 'ability: Persistent', '[move] Cozy Room');
				return 7;
			}
			return 5;
		},
		onResidual(target) {
			if (target.status || !target.runStatusImmunity('slp')) return;
			target.addVolatile('yawn');
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
	lockedroom: {
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
			if (move.id === 'beatup' && !pokemon.getVolatile('outside')) {
				move.multihit = move.allies?.filter((pokemon) => pokemon.types.includes('Ghost')).length;
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
	mudkiproom: {
		onFieldStart(field, source) {
			this.add('-fieldstart', 'move: Locked Room', '[of] ' + source);
			this.effectState.mudkip = 1;
		},
		onFieldRestart(field, source) {
			if (this.effectState.mudkip >= 6) return false;
			this.add('-fieldstart', 'move: Locked Room', '[of] ' + source);
			this.effectState.mudkip++;
		},
		onSwitchIn(pokemon) {
			if (pokemon.baseSpecies.baseSpecies === 'Mudkip' && pokemon.isGrounded()) {
				this.boost({
					atk: this.effectState.mudkip,
					def: this.effectState.mudkip,
					spa: this.effectState.mudkip,
					spd: this.effectState.mudkip,
					spe: this.effectState.mudkip
				}, pokemon)
			}
		},
	},
}
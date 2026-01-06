export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	adhd: {
		onStart(pokemon) {
			if (this.randomChance(1, 2)) {
				pokemon.abilityState.attentionSpan = 'geeked';
			} else {
				pokemon.abilityState.attentionSpan = 'lockedin';
				pokemon.abilityState.choiceLock = "";
			}
		},
		onEnd(pokemon) {
			pokemon.abilityState.attentionSpan = '';
			pokemon.abilityState.choiceLock = "";
		},
		onBeforeMove(pokemon, target, move) {
			if (move.isZOrMaxPowered || move.id === 'struggle') return;
			if (pokemon.abilityState.choiceLock && pokemon.abilityState.choiceLock !== move.id) {
				// Fails unless ability is being ignored (these events will not run), no PP lost.
				this.addMove('move', pokemon, move.name);
				this.attrLastMove('[still]');
				this.debug("Disabled by ADHD");
				this.add('-fail', pokemon);
				return false;
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.abilityState.choiceLock || move.isZOrMaxPowered || move.id === 'struggle') return;
			pokemon.abilityState.choiceLock = move.id;
		},
		onDisableMove(pokemon) {
			if (pokemon.abilityState.attentionSpan === 'lockedin') {
				if (!pokemon.abilityState.choiceLock) return;
				if (pokemon.volatiles['dynamax']) return;
				for (const moveSlot of pokemon.moveSlots) {
					if (moveSlot.id !== pokemon.abilityState.choiceLock) {
						pokemon.disableMove(moveSlot.id, false, this.effectState.sourceEffect);
					}
				}
			} else if (pokemon.abilityState.attentionSpan === 'geeked') {
				if (pokemon.lastMove && pokemon.lastMove.id !== 'struggle') pokemon.disableMove(pokemon.lastMove.id);
			}
		},
		flags: {},
		name: "Attention Defecit Hyperactive Disorder",
		num: 0,
	},
	autism: {
		onStart(pokemon) {
			pokemon.abilityState.choiceLock = "";
		},
		onBeforeMove(pokemon, target, move) {
			if (move.isZOrMaxPowered || move.id === 'struggle') return;
			if (pokemon.abilityState.choiceLock && pokemon.abilityState.choiceLock !== move.id) {
				// Fails unless ability is being ignored (these events will not run), no PP lost.
				this.addMove('move', pokemon, move.name);
				this.attrLastMove('[still]');
				this.debug("Disabled by Autism");
				this.add('-fail', pokemon);
				return false;
			}
		},
		onModifyMove(move, pokemon) {
			if (pokemon.abilityState.choiceLock || move.isZOrMaxPowered || move.id === 'struggle') return;
			pokemon.abilityState.choiceLock = move.id;
		},
		onModifySpAPriority: 1,
		onModifySpA(spa, pokemon) {
			if (pokemon.volatiles['dynamax']) return;
			// PLACEHOLDER
			this.debug('Autism SpA Boost');
			return this.chainModify(1.5);
		},
		onDisableMove(pokemon) {
			if (!pokemon.abilityState.choiceLock) return;
			if (pokemon.volatiles['dynamax']) return;
			for (const moveSlot of pokemon.moveSlots) {
				if (moveSlot.id !== pokemon.abilityState.choiceLock) {
					pokemon.disableMove(moveSlot.id, false, this.effectState.sourceEffect);
				}
			}
		},
		onEnd(pokemon) {
			pokemon.abilityState.choiceLock = "";
		},
		flags: {},
		name: "Autism",
		num: 0,
	},
	dyslexia: {
		onDisableMove(pokemon) {
			for (const moveSlot of pokemon.moveSlots) {
				const move = this.dex.moves.get(moveSlot.id);
				if (move.id.length > 8) {
					pokemon.disableMove(moveSlot.id);
				}
			}
		},
		flags: {},
		name: "Dyslexia",
		num: 0,
	},
	illiterate: {
		onResidual(target) {
			for (const pokemon of this.getAllActive().filter(p => target.isAdjacent(p))) {
				if (pokemon.species.id === 'unown') {
					target.faint();
				}
			}
		},
		flags: {},
		name: "Illiteracy",
		num: 0,
	},
};

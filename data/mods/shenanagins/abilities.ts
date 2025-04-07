export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	earlybird: {
		flags: {},
		name: "Early Bird",
		rating: 1.5,
		num: 48,
		onStart(pokemon) {
			this.field.addPseudoWeather('trickroom');
		},
		onModifyPriority(priority, source, target, move) {
			return priority + 6;
		},
	},
	magicbounce: {
		onTryHitPriority: 1,
		onTryHit(target, source, move) {
			if (target === source || !move.flags['reflectable']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.actions.useMove(newMove, target, {target: source});
			return null;
		},
		onAllyTryHitSide(target, source, move) {
			if (target.isAlly(source) || !move.flags['reflectable']) {
				return;
			}
			const newMove = this.dex.getActiveMove(move.id);
			newMove.hasBounced = true;
			newMove.pranksterBoosted = false;
			this.actions.useMove(newMove, this.effectState.target, {target: source});
			return null;
		},
		condition: {
			duration: 1,
		},
		flags: {breakable: 1},
		name: "Magic Bounce",
		rating: 4,
		num: 156,
	},
	partingshotimidator: {
		name: "Partingshotimidator",
		onStart(pokemon) {
			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				if (!activated) {
					this.add('-ability', pokemon, 'Intimidate', 'boost');
					activated = true;
				}
				if (target.volatiles['substitute']) {
					this.add('-immune', target);
				} else {
					this.boost({atk: -1}, target, pokemon, null, true);
				}
			}
		},
		onSwitchOut(pokemon) {
			this.actions.useMove('partingshot', pokemon);
			pokemon.heal(pokemon.baseMaxhp / 3);
		},
		flags: {},
	},
	unseenfist: {
		onModifyAtkPriority: 5,
		onAfterMove(pokemon, target, move) {
			while (true) {
				const type = this.sample(this.dex.types.names());
				if (type && type !== '???' && pokemon.getTypes().join() !== type) {
					if (!pokemon.setType(type)) return;
					this.add('-start', pokemon, 'typechange', type, '[from] ability: Unseen Fist');
					break;
				}
			}
		},
		onModifyAtk(atk, pokemon, target, move) {
			if (pokemon.status) {
				this.chainModify(1.5);
			}
			return this.chainModify(2);
		},
		onModifyMove(move, pokemon, target) {
			if (move.flags['contact']) delete move.flags['protect'];
		},
		onSourceDamagingHit(damage, target, user, move) {
			if (this.randomChance(1, 100) && this.checkMoveMakesContact(move, user, target)) {
				if (this.randomChance(1, 100)) {
					this.actions.useMove('explosion', user);
				} else {
					this.actions.useMove('explosion', target);
				}
			}
		},
		onStart(pokemon) {
			this.add('-ability', pokemon, 'Unseen Fist');
			this.boost({ atk: 2, def: 2, spa: 2, spd: 2, spe: 2, accuracy: 2, evasion: -6 }, pokemon);
			this.field.addPseudoWeather('magicroom', pokemon);
		},
		onTryHit(source, target, move) {
			if (move.id === 'explosion') {
				return null;
			}
		},
		flags: {},
		name: "Unseen Fist",
		shortDesc: "what the fuck",
		desc: "i don't even know man",
		rating: 2,
		num: 260,
	},
}
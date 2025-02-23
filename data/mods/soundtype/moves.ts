export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	boomburst: {
		num: 586,
		accuracy: 100,
		basePower: 140,
		category: "Special",
		name: "Boomburst",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
		secondary: null,
		target: "allAdjacent",
		type: "Sound",
		contestType: "Tough",
	},
	chatter: {
		num: 448,
		accuracy: 100,
		basePower: 65,
		category: "Special",
		isNonstandard: "Past",
		name: "Chatter",
		pp: 20,
		priority: 0,
		flags: {
			protect: 1, mirror: 1, sound: 1, distance: 1, bypasssub: 1,
			nosleeptalk: 1, noassist: 1, failcopycat: 1, failmimic: 1, failinstruct: 1,
		},
		secondary: {
			chance: 100,
			volatileStatus: 'confusion',
		},
		target: "any",
		type: "Sound",
		contestType: "Cute",
	},
	echoedvoice: {
		num: 497,
		accuracy: 100,
		basePower: 40,
		basePowerCallback(pokemon, target, move) {
			let bp = move.basePower;
			if (this.field.pseudoWeather.echoedvoice) {
				bp = move.basePower * this.field.pseudoWeather.echoedvoice.multiplier;
			}
			this.debug('BP: ' + move.basePower);
			return bp;
		},
		category: "Special",
		name: "Echoed Voice",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
		onTry() {
			this.field.addPseudoWeather('echoedvoice');
		},
		condition: {
			duration: 2,
			onFieldStart() {
				this.effectState.multiplier = 1;
			},
			onFieldRestart() {
				if (this.effectState.duration !== 2) {
					this.effectState.duration = 2;
					if (this.effectState.multiplier < 5) {
						this.effectState.multiplier++;
					}
				}
			},
		},
		secondary: null,
		target: "normal",
		type: "Sound",
		contestType: "Beautiful",
	},
	hypervoice: {
		num: 304,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Hyper Voice",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
		secondary: null,
		target: "allAdjacentFoes",
		type: "Sound",
		contestType: "Cool",
	},
	relicsong: {
		num: 547,
		accuracy: 100,
		basePower: 75,
		category: "Special",
		name: "Relic Song",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1},
		secondary: {
			chance: 10,
			status: 'slp',
		},
		onHit(target, pokemon, move) {
			if (pokemon.baseSpecies.baseSpecies === 'Meloetta' && !pokemon.transformed) {
				move.willChangeForme = true;
			}
		},
		onAfterMoveSecondarySelf(pokemon, target, move) {
			if (move.willChangeForme) {
				const meloettaForme = pokemon.species.id === 'meloettapirouette' ? '' : '-Pirouette';
				pokemon.formeChange('Meloetta' + meloettaForme, this.effect, false, '0', '[msg]');
			}
		},
		target: "allAdjacentFoes",
		type: "Sound",
		contestType: "Beautiful",
	},
	round: {
		num: 496,
		accuracy: 100,
		basePower: 60,
		basePowerCallback(target, source, move) {
			if (move.sourceEffect === 'round') {
				this.debug('BP doubled');
				return move.basePower * 2;
			}
			return move.basePower;
		},
		category: "Special",
		name: "Round",
		pp: 15,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
		onTry(source, target, move) {
			for (const action of this.queue.list as MoveAction[]) {
				if (!action.pokemon || !action.move || action.maxMove || action.zmove) continue;
				if (action.move.id === 'round') {
					this.queue.prioritizeAction(action, move);
					return;
				}
			}
		},
		secondary: null,
		target: "normal",
		type: "Sound",
		contestType: "Beautiful",
	},
	screech: {
		num: 103,
		accuracy: 85,
		basePower: 0,
		category: "Status",
		name: "Screech",
		pp: 40,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1, allyanim: 1, metronome: 1},
		boosts: {
			def: -2,
		},
		secondary: null,
		target: "normal",
		type: "Sound",
		zMove: {boost: {atk: 1}},
		contestType: "Clever",
	},
	sing: {
		num: 47,
		accuracy: 55,
		basePower: 0,
		category: "Status",
		name: "Sing",
		pp: 15,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
		status: 'slp',
		secondary: null,
		target: "normal",
		type: "Sound",
		zMove: {boost: {spe: 1}},
		contestType: "Cute",
	},
	supersonic: {
		num: 48,
		accuracy: 55,
		basePower: 0,
		category: "Status",
		name: "Supersonic",
		pp: 20,
		priority: 0,
		flags: {protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1},
		volatileStatus: 'confusion',
		secondary: null,
		target: "normal",
		type: "Sound",
		zMove: {boost: {spe: 1}},
		contestType: "Clever",
	},
	uproar: {
		num: 253,
		accuracy: 100,
		basePower: 90,
		category: "Special",
		name: "Uproar",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1, nosleeptalk: 1, failinstruct: 1},
		self: {
			volatileStatus: 'uproar',
		},
		onTryHit(target) {
			const activeTeam = target.side.activeTeam();
			const foeActiveTeam = target.side.foe.activeTeam();
			for (const [i, allyActive] of activeTeam.entries()) {
				if (allyActive && allyActive.status === 'slp') allyActive.cureStatus();
				const foeActive = foeActiveTeam[i];
				if (foeActive && foeActive.status === 'slp') foeActive.cureStatus();
			}
		},
		condition: {
			duration: 3,
			onStart(target) {
				this.add('-start', target, 'Uproar');
			},
			onResidual(target) {
				if (target.volatiles['throatchop']) {
					target.removeVolatile('uproar');
					return;
				}
				if (target.lastMove && target.lastMove.id === 'struggle') {
					// don't lock
					delete target.volatiles['uproar'];
				}
				this.add('-start', target, 'Uproar', '[upkeep]');
			},
			onResidualOrder: 28,
			onResidualSubOrder: 1,
			onEnd(target) {
				this.add('-end', target, 'Uproar');
			},
			onLockMove: 'uproar',
			onAnySetStatus(status, pokemon) {
				if (status.id === 'slp') {
					if (pokemon === this.effectState.target) {
						this.add('-fail', pokemon, 'slp', '[from] Uproar', '[msg]');
					} else {
						this.add('-fail', pokemon, 'slp', '[from] Uproar');
					}
					return null;
				}
			},
		},
		secondary: null,
		target: "randomNormal",
		type: "Sound",
		contestType: "Cute",
	},

	// stupid

	soundpunch: {
		num: 0,
		accuracy: 100,
		basePower: 80,
		category: "Physical",
		name: "Sound Punch",
		pp: 20,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1, sound: 1, punch: 1},
		secondary: null,
		target: "normal",
		type: "Sound",
		contestType: "Tough",
	},
}
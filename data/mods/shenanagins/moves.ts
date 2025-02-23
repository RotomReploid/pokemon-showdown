export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
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
		type: "Normal",
		contestType: "Tough",
	},
	zekromkick: {
		num: 0,
		accuracy: 100,
		basePower: 120,
		category: "Physical",
		name: "Zekrom Kick",
		desc: "Deals Dragon- or Electric-type damage, whichever is greater.",
		shortDesc: "hell yeah",
		pp: 10,
		priority: 0,
		flags: {protect: 1, mirror: 1, metronome: 1, contact: 1},
		onModifyType(move, pokemon, target) {
			if (!target) return;
			const dragon = target.runImmunity("Dragon") ? target.runEffectiveness(move) : Number.MIN_SAFE_INTEGER;
			move.type = "Electric";
			const electric = target.runImmunity("Electric") ? target.runEffectiveness(move) : Number.MIN_SAFE_INTEGER;
			this.debug(`Dragon-type Effectiveness: ${dragon}\n` +
					   `       Electric-type  Effectiveness: ${electric}\n` +
					   `       Dragon-type? ${dragon >= electric}`);
			if (dragon >= electric) move.type = "Dragon";
		},
		secondary: null,
		target: "normal",
		type: "Dragon",
		contestType: "Cool",
	},
}
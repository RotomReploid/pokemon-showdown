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
		secondary: null,
		target: "all",
		type: "Rock",
		zMove: {boost: {spd: 1}},
		contestType: "Clever",
	},
}
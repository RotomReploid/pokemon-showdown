export const Items: import('../../../sim/dex-items').ModdedItemDataTable = {
	throatspray: {
		name: "Throat Spray",
		spritenum: 713,
		fling: {
			basePower: 30,
		},
		onAfterMoveSecondarySelf(target, source, move) {
			if (move.type === 'Sound' || move.flags['sound']) {
				target.useItem();
			}
		},
		boosts: {
			spa: 1,
		},
		num: 1118,
		gen: 8,
	},
}
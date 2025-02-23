export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	liquidvoice: {
		onModifyTypePriority: -1,
		onModifyType(move, pokemon) {
			if ((move.type === 'Sound' || move.flags['sound']) && !pokemon.volatiles['dynamax']) { // hardcode
				move.type = 'Water';
			}
		},
		flags: {},
		name: "Liquid Voice",
		rating: 1.5,
		num: 204,
	},
	punkrock: {
		onBasePowerPriority: 7,
		onBasePower(basePower, attacker, defender, move) {
			if (move.type === 'Sound' || move.flags['sound']) {
				this.debug('Punk Rock boost');
				return this.chainModify(1.5);
			}
		},
		onSourceModifyDamage(damage, source, target, move) {
			if (move.type === 'Sound' || move.flags['sound']) {
				this.debug('Punk Rock weaken');
				return this.chainModify(0.5);
			}
		},
		flags: {breakable: 1},
		name: "Punk Rock",
		desc: "This Pokemon's sound-based moves have their power multiplied by 1.5. This Pokemon takes halved damage from sound-based moves.",
		shortDesc: "This Pokemon receives 1/2 damage from sound moves. Its own have 1.5x power.",
		rating: 3.5,
		num: 244,
	},
	soundproof: {
		onTryHit(target, source, move) {
			if (target !== source && (move.type === 'Sound' || move.flags['sound'])) {
				this.add('-immune', target, '[from] ability: Soundproof');
				return null;
			}
		},
		onAllyTryHitSide(target, source, move) {
			if ((move.type === 'Sound' || move.flags['sound'])) {
				this.add('-immune', this.effectState.target, '[from] ability: Soundproof');
			}
		},
		flags: {breakable: 1},
		name: "Soundproof",
		rating: 2,
		num: 43,
	},
}
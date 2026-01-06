export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	hivemind: {
		name: "Hive Mind",
		onStart(pokemon) {
			if (pokemon.abilityState.hiveMind) return;

			let activated = false;
			for (const target of pokemon.adjacentFoes()) {
				const targetAbility = target.getAbility();
				if (!targetAbility) return;

				if (!activated) {
					this.add('-ability', pokemon, 'Hive Mind');
					activated = true;
				}
				if (
					target.volatiles['substitute'] ||
					targetAbility.flags['cantsuppress'] || target.getAbility().id === 'hivemind'
				) {
					this.add('-immune', target);
				} else {
					const oldAbility = target.setAbility('mummy', pokemon);
					if (oldAbility) {
						this.add('-activate', pokemon, 'ability: Mummy', this.dex.abilities.get(oldAbility).name, `[of] ${target}`);
						target.abilityState.hiveMind = true;
					}
				}
			}
		},
		onModifySpA(relayVar, source) {
			let hiveMind = 0;
			for (const pokemon of this.getAllActive()) {
				if (pokemon.ability === 'hivemind') {
					hiveMind++;
				}
			}
			this.chainModify(1 + 0.1 * hiveMind);
		},
	}
}
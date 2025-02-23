'use strict';

const assert = require('./../../assert');
const common = require('./../../common');

let battle;

describe('Locked Room', function () {
	afterEach(function () {
		battle.destroy();
	});

	it('should prevent switching out', function () {
		battle = common.createBattle([[
			{species: 'mewtwo', moves: ['lockedroom', 'sleeptalk']}
		], [
			{species: 'wynaut', moves: ['sleeptalk']},
			{species: 'caterpie', moves: ['sleeptalk']}
		]]);
		battle.makeChoices('move Locked Room', 'move sleeptalk');
		assert.trapped(() => battle.makeChoices('move sleeptalk', 'switch 2'));
	});

	it('should not be affected by subsequent uses', function () {
		battle = common.createBattle([[
			{species: 'mewtwo', moves: ['lockedroom']}
		], [
			{species: 'wynaut', moves: ['lockedroom']},
		]]);
		battle.makeChoices();
		assert.notEqual(battle.field.pseudoWeather['lockedroom'], undefined);
	});
});
import {GreatDalmuti} from './Game'

var assert = require('assert');

it('setup should shuffle deck and deal hands to players', () => {
    const G = GreatDalmuti.setup({numPlayers:6, random: {Shuffle: (deck) => deck}});
    assert.equal(G.hand.length, 6);
    assert.deepEqual(G.hand[0], [1, 4, 5, 6, 7, 8, 9, 9, 10, 10, 11, 12, 12, 13]);
    assert.deepEqual(G.hand[1], [2, 4, 5, 6, 7, 8, 9, 9, 10, 11, 11, 12, 12, 13]);
    assert.deepEqual(G.hand[2], [2, 4, 5, 6, 7, 8, 9, 9, 10, 11, 11, 12, 12]);
    assert.deepEqual(G.hand[3], [3, 4, 6, 7, 7, 8, 9, 10, 10, 11, 11, 12, 12]);
    assert.deepEqual(G.hand[4], [3, 5, 6, 7, 8, 8, 9, 10, 10, 11, 11, 12, 12]);
    assert.deepEqual(G.hand[5], [3, 5, 6, 7, 8, 8, 9, 10, 10, 11, 11, 12, 12]);
});

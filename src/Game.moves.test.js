import {GreatDalmuti} from './Game'

var assert = require('assert');

it('playCards should remove cards from players hand', () => {
    const G = GreatDalmuti.setup({numPlayers:6, random: {Shuffle: (deck) => deck}});
    GreatDalmuti.moves.playCards(G, {playOrderPosition:0}, [12, 12]);
    assert.deepEqual(G.hand[0], [1, 4, 5, 6, 7, 8, 9, 9, 10, 10, 11, 13]);
});

import {GreatDalmuti} from './Game'

var assert = require('assert');

it('turn.order.first should return the index of the first player', () => {
    assert.equal(GreatDalmuti.turn.order.first({}, {}), 0);
});

it('turn.order.next should return the index of the next player in turn order', () => {
    const G = GreatDalmuti.setup({numPlayers:6, random: {Shuffle: (deck) => deck}});
    assert.equal(GreatDalmuti.turn.order.next(G, {numPlayers:6, playOrderPos:0}), 1);
    assert.equal(GreatDalmuti.turn.order.next(G, {numPlayers:6, playOrderPos:1}), 2);
    assert.equal(GreatDalmuti.turn.order.next(G, {numPlayers:6, playOrderPos:2}), 3);
    assert.equal(GreatDalmuti.turn.order.next(G, {numPlayers:6, playOrderPos:3}), 4);
    assert.equal(GreatDalmuti.turn.order.next(G, {numPlayers:6, playOrderPos:4}), 5);
    assert.equal(GreatDalmuti.turn.order.next(G, {numPlayers:6, playOrderPos:5}), 0);
});

it('turn.order.next should skip players who have no cards', () => {
    const G = GreatDalmuti.setup({numPlayers:6, random: {Shuffle: (deck) => deck}});
    assert.equal(GreatDalmuti.turn.order.next({hand:[[],[12],[],[12],[],[]]}, {numPlayers:6, playOrderPos:1}), 3);
    assert.equal(GreatDalmuti.turn.order.next({hand:[[],[12],[],[12],[],[]]}, {numPlayers:6, playOrderPos:3}), 1);
});

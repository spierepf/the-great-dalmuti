import {GreatDalmuti} from './Game'
import { INVALID_MOVE } from 'boardgame.io/core';

var assert = require('assert');

it('playCards should remove cards from players hand', () => {
    const G = GreatDalmuti.setup({numPlayers:6, random: {Shuffle: (deck) => deck}});
    GreatDalmuti.moves.playCards(G, {playOrderPos:0}, [12, 12]);
    assert.deepEqual(G.hand[0], [1, 4, 5, 6, 7, 8, 9, 9, 10, 10, 11, 13]);
});

it('playCards should update mostRecentPlayerIndex', () => {
    const G = GreatDalmuti.setup({numPlayers:6, random: {Shuffle: (deck) => deck}});
    GreatDalmuti.moves.playCards(G, {playOrderPos:0}, [12, 12]);
    assert.equal(G.mostRecentPlayerIndex, 0);
});

it('playCards should update mostRecentPlay', () => {
    const G = GreatDalmuti.setup({numPlayers:6, random: {Shuffle: (deck) => deck}});
    GreatDalmuti.moves.playCards(G, {playOrderPos:0}, [12, 12]);
    assert.deepEqual(G.mostRecentPlay, [12, 12]);
});

it('playCards should not accept plays of no cards', () => {
    const G = GreatDalmuti.setup({numPlayers:6, random: {Shuffle: (deck) => deck}});
    assert.equal(GreatDalmuti.moves.playCards(G, {playOrderPos:0}, []), INVALID_MOVE);
});

it('playCards should not accept plays of undefined cards', () => {
    const G = GreatDalmuti.setup({numPlayers:6, random: {Shuffle: (deck) => deck}});
    assert.equal(GreatDalmuti.moves.playCards(G, {playOrderPos:0}, undefined), INVALID_MOVE);
});

it('playCards should not accept plays of different ranked cards', () => {
    const G = GreatDalmuti.setup({numPlayers:6, random: {Shuffle: (deck) => deck}});
    assert.equal(GreatDalmuti.moves.playCards(G, {playOrderPos:0}, [11, 12]), INVALID_MOVE);
});

it('playCards should not accept plays of cards not held by player', () => {
    const G = GreatDalmuti.setup({numPlayers:6, random: {Shuffle: (deck) => deck}});
    assert.equal(GreatDalmuti.moves.playCards(G, {playOrderPos:0}, [12, 12, 12]), INVALID_MOVE);
});

it('playCards should accept plays that include a single rank and jesters', () => {
    const G = GreatDalmuti.setup({numPlayers:6, random: {Shuffle: (deck) => deck}});
    assert.notEqual(GreatDalmuti.moves.playCards(G, {playOrderPos:0}, [12, 12, 13]), INVALID_MOVE);
});

it('playCards should not accept subsequent plays that involve a different number of cards', () => {
    const G = GreatDalmuti.setup({numPlayers:6, random: {Shuffle: (deck) => deck}});
    GreatDalmuti.moves.playCards(G, {playOrderPos:0}, [12, 12]);
    assert.equal(GreatDalmuti.moves.playCards(G, {playOrderPos:1}, [11]), INVALID_MOVE);
});

it('playCards should not accept subsequent plays that does not involve a better rank of cards', () => {
    const G = GreatDalmuti.setup({numPlayers:6, random: {Shuffle: (deck) => deck}});
    GreatDalmuti.moves.playCards(G, {playOrderPos:0}, [12, 12]);
    assert.equal(GreatDalmuti.moves.playCards(G, {playOrderPos:1}, [12, 12]), INVALID_MOVE);
});

it('playCards should accept valid subsequent plays', () => {
    const G = GreatDalmuti.setup({numPlayers:6, random: {Shuffle: (deck) => deck}});
    GreatDalmuti.moves.playCards(G, {playOrderPos:0}, [12, 12]);
    assert.notEqual(GreatDalmuti.moves.playCards(G, {playOrderPos:1}, [11, 11]), INVALID_MOVE);
});

it('playCards should add player to finalRank when they play their last cards', () => {
    const G = {hand:[[12]], finalRank:[]};
    GreatDalmuti.moves.playCards(G, {playOrderPos:0, currentPlayer:'0'}, [12]);
    assert.deepEqual(G.finalRank, ['0']);
});

it('pass is not valid for the player leading the trick', () => {
    const G = GreatDalmuti.setup({numPlayers:6, random: {Shuffle: (deck) => deck}});
    assert.equal(GreatDalmuti.moves.pass(G, {}), INVALID_MOVE);
});

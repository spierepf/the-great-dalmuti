import { INVALID_MOVE } from 'boardgame.io/core';

function SortCards(cards) {
    return [...cards].sort(function(a, b){return a - b})
}

function RemoveCards(hand, cards) {
    cards.forEach(card => {
        let index = hand.indexOf(card);
        if (index === -1) throw new Error();
        hand = hand.slice(0, index).concat(hand.slice(index+1, hand.length))
    });
    return hand;
}

export const GreatDalmuti = {
    setup: (ctx) => {
        let G = ({
            hand:[],
        });

        for (let i = 0; i < ctx.numPlayers; ++i) {
            G.hand.push([])
        }

        let deck = ctx.random.Shuffle([1,2,2,3,3,3,4,4,4,4,5,5,5,5,5,6,6,6,6,6,6,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,9,9,9,9,9,9,9,9,9,10,10,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,11,11,11,12,12,12,12,12,12,12,12,12,12,12,12,13,13])
        for (let i = 0; i < deck.length; ++i) {
            G.hand[i % ctx.numPlayers].push(deck[i])
        }

        for (let i = 0; i < ctx.numPlayers; ++i) {
            G.hand[i] = SortCards(G.hand[i])
        }

        return G;
    },

    moves: {
        playCards: (G, ctx, cards) => {
            if(cards.length === 0) return INVALID_MOVE;

            let rank = SortCards(cards)[0];
            if (G.mostRecentPlay !== undefined && (G.mostRecentPlay.length !== cards.length || SortCards(G.mostRecentPlay)[0] >= rank)) return INVALID_MOVE;

            let match = true;
            cards.forEach((card) => match = match && (card === rank || card === 13));
            if(!match) return INVALID_MOVE;

            try {
                G.hand[ctx.playOrderPos] = RemoveCards(G.hand[ctx.playOrderPos], cards);
                G.mostRecentPlayerIndex = ctx.playOrderPos;
                G.mostRecentPlay = cards;
            } catch(e) {
                return INVALID_MOVE;
            }
        },
    },
}

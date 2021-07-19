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

function NextPlayerWithCards(G, ctx, playerIndex) {
    while(G.hand[playerIndex].length === 0) {
        playerIndex = (playerIndex + 1) % ctx.numPlayers;
    }
    return playerIndex;
}

function CurrentPlayerHasLead(G, ctx) {
    return G.mostRecentPlay === undefined || (ctx.playOrderPos === NextPlayerWithCards(G, ctx, G.mostRecentPlayerIndex) && G.passSinceLastPlay);
}

export const GreatDalmuti = {
    setup: (ctx) => {
        let G = ({
            hand:[],
            finalRank:[],
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

    turn: {
        moveLimit: 1,
        order: {
            first: (G, ctx) => 0,
            next: (G, ctx) => NextPlayerWithCards(G, ctx, (ctx.playOrderPos + 1) % ctx.numPlayers),
        }
    },

    moves: {
        playCards: (G, ctx, cards) => {
            if(cards === undefined || cards.length === 0) {
                console.log("Attempt to play an undefined or illegal number of cards");
                return INVALID_MOVE;
            }

            let rank = SortCards(cards)[0];
            if (!CurrentPlayerHasLead(G, ctx)) {
                if (G.mostRecentPlay.length !== cards.length) {
                    console.log("Attempt to play the wrong number of cards");
                    return INVALID_MOVE;
                }
                if (SortCards(G.mostRecentPlay)[0] <= rank) {
                    console.log("Attempt to play unacceptable rank of cards");
                    return INVALID_MOVE;
                }
            }

            let match = true;
            cards.forEach((card) => match = match && (card === rank || card === 13));
            if(!match) return INVALID_MOVE;

            try {
                G.hand[ctx.playOrderPos] = RemoveCards(G.hand[ctx.playOrderPos], cards);
                G.mostRecentPlay = cards;
                G.mostRecentPlayerIndex = ctx.playOrderPos;
                G.passSinceLastPlay = false;
                if (G.hand[ctx.playOrderPos].length === 0) {
                    G.finalRank.push(ctx.currentPlayer);
                    if(G.finalRank.length === ctx.numPlayers - 1) {
                        let greaterPeonIndex = NextPlayerWithCards(G, ctx, G.mostRecentPlayerIndex);
                        G.finalRank.push(ctx.playerOrder[greaterPeonIndex]);
                        G.hand[greaterPeonIndex] = [];
                    }
                }
            } catch(e) {
                console.log("Attempt to play cards not held by player");
                return INVALID_MOVE;
            }
        },

        pass: (G, ctx) => {
            if (CurrentPlayerHasLead(G, ctx)) {
                console.log("Attempt by the lead player to pass");
                return INVALID_MOVE;
            }
            G.passSinceLastPlay = true;
        },
    },
}

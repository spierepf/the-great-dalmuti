import { Client } from 'boardgame.io/react';
import { GreatDalmuti } from './Game';

const App = Client({ game: GreatDalmuti, numPlayers: 6 });

export default App;

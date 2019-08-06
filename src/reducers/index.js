import { combineReducers } from 'redux';
import podcasts from './podcasts';
import player from './player';
import playlist from './playlist';

export default combineReducers({ podcasts, player, playlist });

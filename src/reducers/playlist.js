import {
  ADD_PODCAST_EPISODE,
  MUTATE_PLAYLIST,
  CHANGE_PLAYLIST_INDEX,
} from '../actions';
import { createReducer } from '../utils';

const initialState = {
    list: [],
    index: 0,
};

const addEpisode = (state, { payload }) => {
  return {
    ...state,
    list: [...state.list, payload],
  }
};

const mutatePlaylist = (state, { payload }) => {
  return {
    ...state,
    list: [...payload],
  }
};

const changeIndex = (state, { payload }) => {
  return {
    ...state,
    index: payload,
  }
};

const handlers = {
  [ADD_PODCAST_EPISODE]: addEpisode,
  [MUTATE_PLAYLIST]: mutatePlaylist,
  [CHANGE_PLAYLIST_INDEX]: changeIndex,
};

export default createReducer(initialState, handlers);

import {
  CHANGE_PLAYLIST_INDEX,
  ADD_PODCAST_EPISODE,
  MUTATE_PLAYLIST,
} from '../actions';

export function addPodcastEpisode(episode) {
  return {
    type: ADD_PODCAST_EPISODE,
    payload: episode,
  };
}
export function mutatePlaylist(episodes) {
  return {
    type: MUTATE_PLAYLIST,
    payload: episodes,
  };
}
export function changePlaylistIndex(index) {
  return {
    type: CHANGE_PLAYLIST_INDEX,
    payload: index,
  };
}

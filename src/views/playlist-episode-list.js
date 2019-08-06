import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/playlist-episode-list';

const VIEW_CALLBACK_ENUMS = {
  PLAY_EPISODE: 'LOAD_PODCAST_EPISODE',
  REMOVE_EPISODE: 'REMOVE_FROM_PLAYLIST',
  REORDER_EPISODE_UP: 'REORDER_EPISODE_UP',
  REORDER_EPISODE_DOWN: 'REORDER_EPISODE_DOWN',
};

const REORDER_DIRECTION_ENUMS = {
  UP: -1,
  DOWN: 1,
};

function PlaylistEpisodeList(props) {
  const onPlayEpisode = (episodeIndex) => {
    props.callbackHandler(VIEW_CALLBACK_ENUMS.PLAY_EPISODE, episodeIndex);
  };

  const onRemoveEpisode = (episodeIndex) => {
    props.callbackHandler(VIEW_CALLBACK_ENUMS.REMOVE_EPISODE, episodeIndex);
  };

  const onReorderEpisodeUp = (episodeIndex) => {
    props.callbackHandler(VIEW_CALLBACK_ENUMS.REORDER_EPISODE_UP, episodeIndex);
  };

  const onReorderEpisodeDown = (episodeIndex) => {
    props.callbackHandler(VIEW_CALLBACK_ENUMS.REORDER_EPISODE_DOWN, episodeIndex);
  };

  return (
    <ul className={styles.episodeList}>
      {
        props.playlist.map((ep, episodeIndex) => (
          <li
            key={ep.guid}
            className={(ep.guid === props.currentlyPlayedId) ?
              styles.currentlyPlayedPlaylistEpisodeItem : styles.playlistEpisodeItem
            }
            alt={ep.title}
          >
            <div className={styles.table}>
              <div className={styles.tableCell}>
                <div onClick={() => onReorderEpisodeUp(episodeIndex)}>
                ^
                </div>
                <br />
                <div onClick={() => onReorderEpisodeDown(episodeIndex)}>
                v
                </div>
              </div>
              <div className={styles.tableCell}>

                {episodeIndex + 1}.&nbsp;
                {ep.podcastTitle}
                <br />
                {ep.title}
                <br />
                <div onClick={() => onPlayEpisode(episodeIndex)}>
                  {'> '}Play
                </div>
                <div onClick={() => onRemoveEpisode(episodeIndex)}>
                  X Remove from Playlist
                </div>
              </div>

            </div>
          </li>
        ))
      }
    </ul>
  );
}
PlaylistEpisodeList.PropTypes = {
  playlist: PropTypes.arrayOf(PropTypes.object),
  currentlyPlayedId: PropTypes.string.isRequired,
  callbackHandler: PropTypes.func.isRequired,
};

export default PlaylistEpisodeList;
export {
  VIEW_CALLBACK_ENUMS as CALLBACK_ENUMS,
  REORDER_DIRECTION_ENUMS as REORDER_ENUMS,
};

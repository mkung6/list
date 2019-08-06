import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadPodcastEpisode } from '../action-creators/podcasts';
import { changePlaylistIndex, mutatePlaylist } from '../action-creators/playlist';
import styles from '../styles/podcast-episode-list';
import PlaylistEpisodeList, { CALLBACK_ENUMS, REORDER_ENUMS } from './playlist-episode-list';

function PlayList(props) {
  const {
    title: [podcastTitle = ''] = [],
    playlist,
    mutatePlaylist,
    loadPodcastEpisode,
    changePlaylistIndex,
    currentlyPlayedId,
  } = props;

  const playEpisodeHandler = (index) => {
    loadPodcastEpisode(props.playlist[index]);
    changePlaylistIndex(index);
  };

  const removeFromPlaylistHandler = (episodeIndex) => {
    if (episodeIndex < props.playlist.index) changePlaylistIndex(props.playlist.index - 1);
    const copyPlaylist = [...props.playlist];
    copyPlaylist.splice(episodeIndex, 1);
    mutatePlaylist(copyPlaylist);
  };

  const swapEpisodes = (episodeIndex, direction) => {
    const copyPlaylist = [...props.playlist];
    const temp = copyPlaylist[episodeIndex];
    copyPlaylist[episodeIndex] = copyPlaylist[episodeIndex + direction];
    copyPlaylist[episodeIndex + direction] = temp;
    return copyPlaylist;
  }

  const reorderEpisodeUpHandler = (episodeIndex) => {
    if (episodeIndex !== 0) {
      const copyPlaylist = swapEpisodes(episodeIndex, REORDER_ENUMS.UP);
      mutatePlaylist(copyPlaylist);
    }
  };

  const reorderEpisodeDownHandler = (episodeIndex) => {
    if (episodeIndex !== props.playlist.length - 1) {
      const copyPlaylist = swapEpisodes(episodeIndex, REORDER_ENUMS.DOWN);
      mutatePlaylist(copyPlaylist);
    }
  };

  const viewCallbackHandler = (type, data) => {
    switch (type) {
      case CALLBACK_ENUMS.PLAY_EPISODE:
        playEpisodeHandler(data);
        break;
      case CALLBACK_ENUMS.REMOVE_EPISODE:
        removeFromPlaylistHandler(data);
        break;
      case CALLBACK_ENUMS.REORDER_EPISODE_UP:
        reorderEpisodeUpHandler(data);
        break;
      case CALLBACK_ENUMS.REORDER_EPISODE_DOWN:
        reorderEpisodeDownHandler(data);
        break;
      default:
    }
  };

  return (
    <div className={styles.episodeListContainer}>
      <p>Playlist</p>
      <PlaylistEpisodeList
        playlist={props.playlist}
        currentlyPlayedId={props.currentlyPlayedId}
        callbackHandler={viewCallbackHandler}
      />
    </div>
  );
}
PlayList.propTypes = {
  title: PropTypes.arrayOf(PropTypes.string),
  loadPodcastEpisode: PropTypes.func.isRequired,
  mutatePlaylist: PropTypes.func.isRequired,
  changePlaylistIndex: PropTypes.func.isRequired,
  currentlyPlayedId: PropTypes.string.isRequired,
  playlist: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = (state) => {
  return {
    playlist: state.playlist.list,
    currentlyPlayedId: state.player.guid,
  }
};
const mapDispatchToProps = (dispatch) => bindActionCreators({
  loadPodcastEpisode,
  mutatePlaylist,
  changePlaylistIndex,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayList);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import styles from './styles/root';

import App from './views/app';
import { getPodcasts } from './action-creators/podcasts';

class Root extends Component {
  componentDidMount() {
    const { store } = this.props;
    store.dispatch(getPodcasts());
  }

  render() {
    const { store } = this.props;
    return (
      <div className={styles.root} >
        <Provider store={store}>
          <BrowserRouter>
            <Route path="/" component={App} />
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;

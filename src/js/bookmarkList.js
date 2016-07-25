'use strict';

//import React, {PropTypes} from 'react';
import React from 'react';
import {injectIntl} from 'react-intl';
import {messages} from './defaultMessages';

class BookmarkList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bookmarkList: this.props.bookmarksArr};
  }

  handleClick(uri) {
    if (this.props.clickBookmarkHandler) {
      this.props.clickBookmarkHandler(uri);
    }
  }

  handleRemoveBookmark(uri) {
    function callBack() {
      const obj = this.props.bookmarksArr.find(item => item.uri === uri);
      const index = this.props.bookmarksArr.indexOf(obj);
      this.props.bookmarksArr.splice(index, 1);

      //_.remove(this.props.bookmarksArr, {uri: uri});
      this.setState({bookmarkList: this.props.bookmarksArr});
    }

    if (this.props.removeBookmarkHandler) {
      this.props.removeBookmarkHandler(uri, callBack.bind(this));
    }
  }

  renderNoBookmarks() {
    const {formatMessage} = this.props.intl;
    return (<div id="o-bookmark-panel" role="main">
      <header>
        <h1>{formatMessage(messages.bookmarkTitle)}</h1>
      </header>
      <div className="o-bookmark-empty-help">
        <div tabIndex="0" className="o-bookmark-empty-message">
          <p>{formatMessage(messages.noBookmarksMsg)}</p>
        </div>
      </div>
    </div>)
  }

  renderBookmarks() {
    const that = this;
    const {formatMessage} = this.props.intl;
    const {formatDate} = this.props.intl;

    return( <div id="o-bookmark-panel" role="main">
      <header>
        <h1>{formatMessage(messages.bookmarkTitle)}</h1>
      </header>
      <ul className="o-bookmark-list">
        {
          this.state.bookmarkList.map(function(bkmark) {
            return <li className="o-bookmark-section" key={bkmark.uri}>
              <a className="o-bookmark-title"
                data-uri={bkmark.uri}
                href="javascript:void(0)"
                onClick = {that.handleClick.bind(that, bkmark.uri)}
                onKeyPress={that.handleClick.bind(that, bkmark.uri)}>{bkmark.title}
              </a>
              <div className="o-bookmark-date">
                <time value={bkmark.createdTimestamp}>{formatDate(new Date(bkmark.createdTimestamp), {
                  year : 'numeric',
                  month: 'numeric',
                  day  : 'numeric'
                })}</time>
                <span>|</span>
                <time value={bkmark.createdTimestamp}>{formatDate(new Date(bkmark.createdTimestamp), {
                  hour : 'numeric',
                  minute: 'numeric',
                  second  : 'numeric'
                })}</time>
              </div>
              <a href="javascript:void(0);"
                className="remove"
                onClick= {that.handleRemoveBookmark.bind(that, bkmark.uri)}
                aria-label={formatMessage(messages.removeBookmarkText)}
                role="button">
                <span className="pe-icon--times" aria-hidden="true"></span>
              </a>
            </li>
          })
        }
      </ul>
    </div> )
  }

  render() {
    if (this.state.bookmarkList.length) {
      return this.renderBookmarks();
    } else {
      return this.renderNoBookmarks();
    }
  }
}

export default injectIntl(BookmarkList);

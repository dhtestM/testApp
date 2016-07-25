'use strict';

// bundled component styling
import './main.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import BookmarkList from './src/js/bookmarkList';
import {addLocaleData, IntlProvider} from 'react-intl';
import frLocaleData from 'react-intl/locale-data/fr';
import frJson from './translations/fr.json';

const translations = {
  'fr' : frJson
};

export default class MyComponent {

  constructor(config) {
    const locale = config.locale ? config.locale : '';
    if (locale) {
      addLocaleData(frLocaleData);
    }
    this.init(config);
  }

  init(config) {

    const locale = config.locale ? config.locale : 'en';
    console.log('locale=', locale);
    console.log('locale=', translations[locale]);

    ReactDOM.render(
      <IntlProvider locale={locale} messages={translations[locale]}>
          <BookmarkList bookmarksArr={config.bookmarksArr}
              clickBookmarkHandler={config.clickBookmarkHandler}
              removeBookmarkHandler={config.removeBookmarkHandler}
              />
      </IntlProvider>,
      document.getElementById(config.elementId)
    );
  }
}

//
// For events, use the Origami naming convention of pre-pending with 'o.'
//
document.body.addEventListener('o.InitMyComponent', e => new MyComponent(e.detail));

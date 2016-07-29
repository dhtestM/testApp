import expect from 'expect';
import expectJSX from 'expect-jsx';
import React from 'react';
import {IntlProvider} from 'react-intl';
import TestUtils from 'react-addons-test-utils';
import BookmarkList from '../src/js/bookmarkList';

expect.extend(expectJSX);

describe('BookmarkList', () => {
  let renderer;
  let intlProvider;
  let bookmarkClicked = false;
  let bookmarkRemoved = false;

  let bookmarkClickHandler = function() {
    bookmarkClicked = true;
  };

  let bookmarkRemovedHandler = function() {
    bookmarkRemoved = true;
  };

  beforeEach(() => {
    renderer = TestUtils.createRenderer();
    intlProvider = new IntlProvider({locale: 'en'}, {});
  });

  it('shallowly renders the component owner using React TestUtils', () => {

    const {intl} = intlProvider.getChildContext();
    const sampleData = [{'uri':'OPS/xhtml/file_0003.html', 'data':{'baseUrl':'https://content.stg-openclass.com/eps/pearson-reader/api/item/12d4a34c-e9ff-4537-b4b0-c1538ac01af2/1/file/QA_TEST_FILE/'}, 'createdTimestamp':1467924204506, 'title':'Copyright', 'labels':['Copyright']}, {'uri':'OPS/xhtml/file_0005.html', 'data':{'baseUrl':'https://content.stg-openclass.com/eps/pearson-reader/api/item/12d4a34c-e9ff-4537-b4b0-c1538ac01af2/1/file/QA_TEST_FILE/'}, 'createdTimestamp':1467924210841, 'title':'Page 6-7', 'labels':['Page 6-7']}, {'uri':'OPS/xhtml/file_0008.html', 'data':{'baseUrl':'https://content.stg-openclass.com/eps/pearson-reader/api/item/12d4a34c-e9ff-4537-b4b0-c1538ac01af2/1/file/QA_TEST_FILE/'}, 'createdTimestamp':1467924217566, 'title':'Page 12-13', 'labels':['Page 12-13']}, {'uri':'OPS/xhtml/file_0011.html', 'data':{'baseUrl':'https://content.stg-openclass.com/eps/pearson-reader/api/item/12d4a34c-e9ff-4537-b4b0-c1538ac01af2/1/file/QA_TEST_FILE/'}, 'createdTimestamp':1467924224680, 'title':'Page 18-19', 'labels':['Page 18-19']}];
    const targetData = {
      elementId: 'container',
      bookmarksArr: sampleData,
      locale:'en',
      'clickBookmarkHandler' : bookmarkClickHandler,
      'removeBookmarkHandler': bookmarkRemovedHandler
    };
    renderer.render(
      <BookmarkList.WrappedComponent
        bookmarksArr={targetData.bookmarksArr}
        clickBookmarkHandler={targetData.clickBookmarkHandler}
        removeBookmarkHandler={targetData.removeBookmarkHandler}
        intl={intl} />
      , {intl}
    );

    let result = renderer.getRenderOutput();
    expect(result.type).toEqual('ul');
    expect(result.props.className).toEqual('o-bookmark-list');
    expect(result.props.children.length).toEqual(4);

  });

  it('calls the callback functions when links are clicked', () => {

    const {intl} = intlProvider.getChildContext();
    const sampleData = [{'uri':'OPS/xhtml/file_0003.html', 'data':{'baseUrl':'https://content.stg-openclass.com/eps/pearson-reader/api/item/12d4a34c-e9ff-4537-b4b0-c1538ac01af2/1/file/QA_TEST_FILE/'}, 'createdTimestamp':1467924204506, 'title':'Copyright', 'labels':['Copyright']}, {'uri':'OPS/xhtml/file_0005.html', 'data':{'baseUrl':'https://content.stg-openclass.com/eps/pearson-reader/api/item/12d4a34c-e9ff-4537-b4b0-c1538ac01af2/1/file/QA_TEST_FILE/'}, 'createdTimestamp':1467924210841, 'title':'Page 6-7', 'labels':['Page 6-7']}, {'uri':'OPS/xhtml/file_0008.html', 'data':{'baseUrl':'https://content.stg-openclass.com/eps/pearson-reader/api/item/12d4a34c-e9ff-4537-b4b0-c1538ac01af2/1/file/QA_TEST_FILE/'}, 'createdTimestamp':1467924217566, 'title':'Page 12-13', 'labels':['Page 12-13']}, {'uri':'OPS/xhtml/file_0011.html', 'data':{'baseUrl':'https://content.stg-openclass.com/eps/pearson-reader/api/item/12d4a34c-e9ff-4537-b4b0-c1538ac01af2/1/file/QA_TEST_FILE/'}, 'createdTimestamp':1467924224680, 'title':'Page 18-19', 'labels':['Page 18-19']}];
    const targetData = {
      elementId: 'container',
      bookmarksArr: sampleData,
      locale:'en',
      'clickBookmarkHandler' : bookmarkClickHandler,
      'removeBookmarkHandler': bookmarkRemovedHandler
    };
    const locale = 'en';
    const translations = {
      'en' : {}
    };

    const container = TestUtils.renderIntoDocument(
      <IntlProvider locale={locale} messages={translations[locale]}>
        <BookmarkList
          bookmarksArr={targetData.bookmarksArr}
          clickBookmarkHandler={targetData.clickBookmarkHandler}
          removeBookmarkHandler={targetData.removeBookmarkHandler}
          intl={intl} /></IntlProvider>);
    const bookmarkLink = TestUtils.scryRenderedDOMComponentsWithClass(container, 'o-bookmark-title');
    const removeLink = TestUtils.scryRenderedDOMComponentsWithClass(container, 'remove');
    TestUtils.Simulate.click(bookmarkLink[0]);
    TestUtils.Simulate.click(removeLink[0]);
    expect(bookmarkClicked).toEqual(true);
    expect(bookmarkRemoved).toEqual(true);
  });
});

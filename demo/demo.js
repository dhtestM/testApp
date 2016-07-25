import BookmarkListDemo from '../main'; // to demo direct API usage

// When available on npm, consumer usage would be similar to:
// import MyComponent from '@pearson-components/[component-name]'

window.onload = init;

window.bookmarkClickCbk = function() {
  alert('Clicked on bookmark');
};

window.removeBookmarkCbk = function() {
  alert('Clicked on removebookmark');
};

function init() {
  const sampleData = [{'uri':'OPS/xhtml/file_0003.html',  'data':{'baseUrl':'https://content.stg-openclass.com/eps/pearson-reader/api/item/12d4a34c-e9ff-4537-b4b0-c1538ac01af2/1/file/QA_TEST_FILE/'}, 'createdTimestamp':1467924204506, 'title':'Copyright', 'labels':['Copyright']}, {'uri':'OPS/xhtml/file_0005.html', 'data':{'baseUrl':'https://content.stg-openclass.com/eps/pearson-reader/api/item/12d4a34c-e9ff-4537-b4b0-c1538ac01af2/1/file/QA_TEST_FILE/'}, 'createdTimestamp':1467924210841, 'title':'Page 6-7', 'labels':['Page 6-7']}, {'uri':'OPS/xhtml/file_0008.html', 'data':{'baseUrl':'https://content.stg-openclass.com/eps/pearson-reader/api/item/12d4a34c-e9ff-4537-b4b0-c1538ac01af2/1/file/QA_TEST_FILE/'}, 'createdTimestamp':1467924217566, 'title':'Page 12-13', 'labels':['Page 12-13']}, {'uri':'OPS/xhtml/file_0011.html', 'data':{'baseUrl':'https://content.stg-openclass.com/eps/pearson-reader/api/item/12d4a34c-e9ff-4537-b4b0-c1538ac01af2/1/file/QA_TEST_FILE/'}, 'createdTimestamp':1467924224680, 'title':'Page 18-19', 'labels':['Page 18-19']}];

  //Demo Loading component via event:
  document.body.dispatchEvent(new CustomEvent('o.InitBookmarkListDemo', {
    detail: {
      elementId: 'container',
      bookmarksArr: sampleData,
      locale:'fr',
      'clickBookmarkHandler' : window.bookmarkClickCbk,
      'removeBookmarkHandler': window.removeBookmarkCbk
    }
  }));


  // Demo direct API
  new BookmarkListDemo({
    elementId: 'container',
    bookmarksArr: sampleData,
    locale:'fr',
    'clickBookmarkHandler' : window.bookmarkClickCbk,
    'removeBookmarkHandler': window.removeBookmarkCbk
  });
}

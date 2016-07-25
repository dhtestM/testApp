  import BookmarkList from '../src/js/bookmarkList.js';
  import ReactDOM from 'react-dom';
  const angular = require('angular');
  //import {addLocaleData, IntlProvider} from 'react-intl';
  import {IntlProvider} from 'react-intl';
  //import frLocaleData from 'react-intl/locale-data/fr';
  import frJson from '../translations/fr.json';

  const translations = {
    'fr' : frJson
  };

  const app = angular.module('testApp', [require('angular-route')]);
  app.value( 'BookmarkList', BookmarkList );
  console.log(BookmarkList);

  app.factory('utils', ['$location', function($location) {
    const params = $location.search();
    const locations={
      'stg':'https://etext-stg.pearson.com/#/book/'+getParam('id'),
      'qa':'https://etext-qa-stg.pearson.com/#/book/'+getParam('id'),
      'dev':'https://etext-dev.pearson.com/#/book/'+getParam('id')
    };

    const envs = {
      'stg':'https://pxe-sdk.stg-openclass.com/services-api/api/3.1/context/',
      'qa':'https://pxe-sdk-qa.stg-openclass.com/services-api/api/3.1/context/',
      'dev':'https://pxe-sdk.stg-openclass.com/services-api/api/3.1/context/'
    };

    const env = getParam('env');

    function getParam(name) {
      return params[name] ? params[name] : null;
    }

    function getEnv() {
      return envs[env] ? envs[env] : null;
    }

    function getLocation() {
      return locations[env] ? locations[env] : null;
    }

    return {
      getParam: getParam,
      getEnv: getEnv,
      getLocation: getLocation
    }

  }]);

  app.service('etxtService', ['$http', '$q', '$location', '$rootScope', 'utils', function ($http, $q, $location, $rootScope, utils) {
    const contextId = utils.getParam('id');
    const identityId = utils.getParam('idty');
    const urlStr = utils.getEnv();
    //const getUrl = 'https://pxe-sdk.stg-openclass.com/services-api/api/3.1/context/' + contextId + '/identities/'+identityId+'/bookmarks'
    const getUrl = urlStr + contextId + '/identities/'+identityId+'/bookmarks'

    this.getBookmarks = function () {
      const deferred = $q.defer();
      $http.get(getUrl).then(
        function (resp) {
          console.log(resp);
          deferred.resolve(resp);
        },
        function (error) {
          console.log(error);
          deferred.reject(error);
        }
      );
      return deferred.promise;
    };

    this.removeBookmark = function (uri) {
      const deferred = $q.defer();
      $http.delete(getUrl+'?uri='+encodeURIComponent(uri)).then(
        function (resp) {
          deferred.resolve(resp);
        },
        function (error) {
          deferred.reject(error);
        }
      );
      return deferred.promise;
    }
  }]);

  app.controller('etxtCtrl', ['$scope', '$timeout', '$window', 'etxtService', 'utils', 'BookmarkList', function ($scope, $timeout,  $window, etxtService, utils, BookmarkList) {
    $scope.bookmarksArr = null;
    $scope.lang = utils.getParam('lang');

    function renderReactComp(obj) {
      $scope.bookmarksArr = obj ? obj.data.bookmarks : [];
      const paramsObj={
        'bookmarksArr':$scope.bookmarksArr,
        'clickBookmarkHandler' : $scope.bookmarkClickCbk,
        'removeBookmarkHandler': $scope.removeBookmarkCbk,
        'lang':$scope.lang ? $scope.lang : 'en'

      };
      //ReactDOM.render(React.createElement(BookmarkList, paramsObj), document.getElementById('container'));
      ReactDOM.render(<IntlProvider locale={paramsObj.lang} messages={translations[paramsObj.lang]}>
        <BookmarkList bookmarksArr={paramsObj.bookmarksArr}
            clickBookmarkHandler={paramsObj.clickBookmarkHandler}
            removeBookmarkHandler={paramsObj.removeBookmarkHandler}
        />
      </IntlProvider>, document.getElementById('container'));
    }

    function renderBookmarks() {
      etxtService.getBookmarks().then(function(resp) {
        renderReactComp(resp);
      }).catch(function() {
        renderReactComp();
      });
    }

    $scope.bookmarkClickCbk = function(url) {
      const redirectUrl = utils.getLocation() +'?id='+url;
      $window.open(redirectUrl);
    };

    $scope.removeBookmarkCbk = function(url, cbk) {
      etxtService.removeBookmark(url).then(function() {
        cbk();
      }).catch(function(resp) {
        console.log(resp.data.msg)
      });
    };
    renderBookmarks();
  }]);

  app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
  });




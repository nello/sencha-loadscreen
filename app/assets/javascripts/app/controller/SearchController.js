Ext.define('Proximity.controller.SearchController', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            mainView: 'mainview',
            searchView: 'searchview'
        },
        control: {
            mainView: {
                push: 'onMainPush',
                pop: 'onMainPop'
            },
            searchView: {
                displayResultsCommand: 'onDisplayResultsCommand'
            }
        }
    },

    onMainPush: function(view, item) {
        this.getMainView().prepareForResults();
    },

    onMainPop: function(view, item) {
        this.getMainView().prepareForSearch();
    },

    onDisplayResultsCommand: function (view, search) {
        // not required for test
    },

    // Base class methods.
    launch: function () {
        this.callParent(arguments);
        console.log('launch');
    },

    init: function () {
        this.callParent(arguments);
        console.log('init');
    }
});
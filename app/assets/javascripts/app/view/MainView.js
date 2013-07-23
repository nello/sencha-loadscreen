Ext.define('Proximity.view.Main', {
    extend: 'Ext.navigation.View',

    alias: 'widget.mainview',

    requires: [
       'Proximity.view.search.SearchView'
    ],

    stores: ['SearchStore', 'LocalSearchStore'],

    config: {
        autoDestroy: false,

        navigationBar: {
//            ui: 'subnav',
            docked: 'top',

            animation: {
                duration: 15
            },

            items: [{
                id: 'searchFld',
                xtype: 'xsearchField',
                placeHolder: 'Search...',
                autoComplete: false,
                autoCapitalize: false,

                listeners: {
                    keyup: function(field, e) {
                        Ext.getCmp('searchView').onSearchKeyUp(field, e);
                    },
                    clearicontap: function(field, e) {
                        Ext.getCmp('searchView').onClearIconTap(field, e);
                    }
                }
            },{
                id: 'viewFlipButton',
                xtype : 'button',
                hidden: true,
                align: 'right',
                ui: 'action',
                action: 'viewFlip',
                text: 'Map'
            }],

            listeners: {
                back: function() {
                    this.getBackButton().hide();

                    var flipButton = Ext.getCmp('viewFlipButton');
                    if (this.backButtonStack.length == 2) {
                        flipButton.hide();
                    } else {
                        flipButton.setText(flipButton.activeResults ? 'List' : 'Map');
                    }
                }
            }
//            ,
//            hideAnimation: Ext.os.is.Android ? false : {
//                type: 'fadeOut',
//                duration: 200
//            },
//            showAnimation: Ext.os.is.Android ? false : {
//                type: 'fadeIn',
//                duration: 200
//            }
        },

        layout: {
            type: 'card',
            animation: {
                duration: 150,
                easing: 'ease-in-out',
                type: 'slide',
                direction: 'left'
            }
        },

        items: [{
            id: 'searchView',
            xtype: 'searchview'
        }]

//        ,
//
//        listeners: {
//            activeitemchange: function(navigationView, newView) {
//                console.log(newView);
//                    var innerItems = navigationView.getInnerItems(),
//                        idx        = innerItems.indexOf(newView),
//                        bar        = navigationView.getNavigationBar(),
//                        button     = bar.down('button[text=Push]');
//
//                    button[idx == 0 ? 'show' : 'hide']();
//
//            }
//        }
    },

    initialize: function() {
        this.prepareForSearch();
        this.callSuper();
    },

    prepareForSearch: function() {
        if (this.getNavigationBar().backButtonStack.length == 1) {
            this.getNavigationBar().leftBox.setCentered(true);
            Ext.get('searchFld').show();
        }
    },

    prepareForResults: function() {
        if (this.getNavigationBar().backButtonStack.length == 2) {
            this.getNavigationBar().getBackButton().show();
            Ext.get('searchFld').hide();
            this.getNavigationBar().leftBox.setCentered(false);
            Ext.getCmp('viewFlipButton').show();
        }
    }
});
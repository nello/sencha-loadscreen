Ext.define('Proximity.view.search.SearchView', {
    extend: 'Ext.Container',

    requires: [
        'Ext.data.Store',
        'Ext.List'
    ],

    stores: ['SearchStore', 'LocalSearchStore'],

    alias: 'widget.searchview',

    config: {
        layout: {
            type: 'fit'
        },

        items: [{
            xtype: 'list',
            store: 'SearchStore',
            itemId: 'searchListItem',
            itemCls: 'list-item-custom',
            selectedItemCls: 'list-item-custom-selected',
            itemTpl: '<span class="{category} search-icon"></span><div class="list-item-term">{term}</div>',
            itemHeight: 33,     // default is 47
            ui: 'round',
            pinHeaders: false,
            variableHeights: false,
            emptyText: '<div style="margin-top: 20px; text-align: center">No Matching Items</div>',
            onItemDisclosure: false,
            disableSelection: false
        }],

        listeners: [{
            delegate: '#searchListItem',
            event: 'select',
            fn: 'onSearchListSelect'
        },{
            delegate: 'xsearchField',
            event: 'keyup',
            fn: 'onSearchKeyUp'
        }]
    },

    onSearchKeyUp: function(field, e) {
        console.log('onSearchKeyUp');

        // ios hack
        window.scrollTo(0, 1);

        // get stores
        var searchStore = Ext.getStore('SearchStore');

        // get the trimmed value of the field
        var value = field.getValue().trim();
        console.log('"' + value + '"');

        // if we get an 'enter' keypress
        if (e.event.keyCode == 13) {
            this.doSearch({term: value, category: 'user' });
        }

        // if we have a search term
        else if (value) {
            // show matches in local and remote stores
            searchStore.showMatches(value);
        }

        else {
            // otherwise, show all searches
            searchStore.replaceData(Ext.getStore('LocalSearchStore'));
        }
    },

    onSearchListSelect: function(list, record, target, index, evt, options) {
        console.log('onSearchListSelect(' + record.data.term + ')');

        // deselect item
        setTimeout(function() { list.deselect(record); }, 500);

        // process search
        this.doSearch(record.data);
    },

    // save and perform search
    doSearch: function(search) {
        var localStore = Ext.getStore('LocalSearchStore');

        console.log("search");
        console.log(search);

        if (search.term == '!!!') {
            localStore.clearCache();
            return;
        }

        // save search (if unique and non-empty)
        localStore.saveSearch(search);

        // clear search field for when we return
        Ext.getCmp('searchFld').reset();

        // display all searches
        Ext.getStore('SearchStore').replaceData(localStore);

        // fire event to switch screens
        this.fireEvent('displayResultsCommand', this, search.term);
    },

    onClearIconTap: function() {
        Ext.getStore('SearchStore').replaceData(Ext.getStore('LocalSearchStore'));
    }

});

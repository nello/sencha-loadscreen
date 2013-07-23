Ext.define('Proximity.store.LocalSearchStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'Proximity.model.Search',
        autoload: true,
        sorters: [
            { property: 'term', direction: 'ASC' }
        ],
        proxy: {
            type: 'localstorage',
            id  : 'notes-store'
        }
    },

    // store search if is new and non-empty
    saveSearch: function(search) {
        // TODO: convert search to lowercase (are we sure?)

        // load the localstore
        try { this.load(); } catch (e) { console.log(e); localStorage.clear(); }

        // if not already in the store
        if (search.term && (this.findExact('term', search.term) < 0)) {
            // save search
            console.log("storing: " + search.term);
            this.add({term: search.term, category: search.category});

            // clear oldest entry from the store : TODO - this is incorrect, we should keep the last 100 or so
            while (this.getData().length > 10) {
                this.removeAt(0);
            }

            // reload local store
            this.sync();
        }
    },

    // clear cache
    clearCache: function() {
        // clear all local storage
        localStorage.clear();

        // reload local store
        this.sync();

        // clear search field
        Ext.getCmp('searchFld').reset();

        // reload page store
        Ext.getStore('SearchStore').replaceData(this);
    }
});


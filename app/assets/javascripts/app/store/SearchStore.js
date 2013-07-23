Ext.define('Proximity.store.SearchStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'Proximity.model.Search',
        data: [],
        autoLoad: true,
        sorters: [
            { property: 'term', direction: 'ASC' }
        ]
    },

    // replace the contents of this store with that of another
    replaceData: function(localStore) {
//        try { localStore.load(); } catch (e) { console.log(e); localStorage.clear(); }

        var data = Ext.Array.pluck(localStore.getRange(), 'data');
        if (data.length > 0)
            this.setData(data);
        else
            this.clearData();
    },

    // show matches : TODO - this is wrong, we should give 10 most recent remote + local matches
    showMatches: function(value) {
        var remoteStore = Ext.getStore('RemoteSearchStore');
        var localStore = Ext.getStore('LocalSearchStore');

        // find matching results in stores
        var regexes = this.createRegexes(value);
        var localResults = this.findMatches(localStore, regexes);
        var remoteResults = this.findMatches(remoteStore, regexes);

        // populate main store from results
        if (localResults.getRange().length == 0 && remoteResults.getRange().length == 0) {
            this.clearData();
        } else {
            this.setData(
                this.merge(Ext.Array.pluck(localResults.getRange(), 'data'),
                    Ext.Array.pluck(remoteResults.getRange(), 'data'))
            );
        }
    },

    // create our regex list - TODO: this needs to be rethought, how should we deal with multiple search terms?
    createRegexes: function(value) {
        var regexes = [];

        // the user could have entered spaces, so we must split them so we can loop through them all
        var searches = value.split(' ');
        for (var i = 0; i < searches.length; ++i) {
            // if it is nothing, continue
            if (!searches[i]) continue;

            // if found, create a new case-insensitive regular expression
            regexes.push(new RegExp('^' + searches[i], 'i'));
        }
        return regexes;
    },

    // apply regexes to the store and return results
    findMatches: function(store, regexes) {
        return store.queryBy(function(record) {
            var term = record.get('term');

            for (i = 0; i < regexes.length; i++) {
                if (regexes[i].test(term)) {
                    return true;
                }
            }
            return false;
        });
    },

    // TODO: this could be much faster - we're merging sorted arrays
    merge: function() {
        var args = Ext.Array.flatten(arguments);
        var array = [];

        for (var i = 0, ln = args.length; i < ln; i++) {
            var item = args[i];
            if (!this.contains(array, item)) {
                array.push(item);
            }
        }

        return array;
    },

    contains: function(array, item) {
        for (var i = 0, ln = array.length; i < ln; i++) {
            if (array[i] && item && array[i]['term'] === item['term']) {
                return true;
            }
        }

        return false;
    }
});


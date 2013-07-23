Ext.define('Proximity.store.RemoteSearchStore', {
    extend: 'Ext.data.Store',

    config: {
        model: 'Proximity.model.Search',
        data: [
            { term: 'afl games', category: 'event' },
            { term: 'albert park lake', category: 'place' },
            { term: 'italian restaurants', category: 'business' },
            { term: 'rest rooms', category: 'place' },
            { term: 'financial planners', category: 'business' },
            { term: 'petrol stations', category: 'business' },
            { term: 'medical centres', category: 'business' },
            { term: 'medical supplies', category: 'product' },
            { term: 'mattresses', category: 'product' },
            { term: 'mascara', category: 'product' },
            { term: 'apples', category: 'product' },
            { term: 'apple stores', category: 'business' },
            { term: 'ambulance', category: 'service' },
            { term: 'taxi', category: 'service' },
            { term: 'tax agents', category: 'business' },
            { term: 'trampolining', category: 'business' },
            { term: 'trampolines', category: 'product' },
            { term: 'pizza', category: 'product' },
            { term: 'pizza restaurants', category: 'business' },
            { term: 'party hire', category: 'business' },
            { term: 'fishing supplies', category: 'business' },
            { term: 'medallions', category: 'product' },
            { term: 'cafes', category: 'business' },
            { term: 'cafetieres', category: 'product' },
            { term: 'coffee shops', category: 'business' },
            { term: 'coffee', category: 'product' },
            { term: 'toys', category: 'product' },
            { term: 'toilets', category: 'place' },
            { term: 'fish - seafood', category: 'product' },
            { term: 'fish and chip shops', category: 'business' }
        ],
        autoLoad: true,
        sorters: [
            { property: 'term', direction: 'ASC' }
        ],

        filters: null

        //group the store using the lastName field
//      groupField: 'narrative'
    }
});


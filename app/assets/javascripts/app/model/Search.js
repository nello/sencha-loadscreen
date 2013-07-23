Ext.define('Proximity.model.Search', {
    extend: 'Ext.data.Model',
    xtype: 'xsearch',

    // TODO - update this so that created dates and real ids are populated (see Notes app pdf)
    config: {
        idProperty: 'id',
        fields: [
            { name: 'id', type: 'int' },
            { name: 'dateCreated', type: 'date', dateFormat: 'c', defaultValue: new Date() },
            { name: 'term', type: 'string' },
            { name: 'category', type: 'string' }
        ],
        validations: [
            { type: 'presence', field: 'id' },
            { type: 'presence', field: 'dateCreated' },
            { type: 'presence', field: 'term' }
        ]
    }
});


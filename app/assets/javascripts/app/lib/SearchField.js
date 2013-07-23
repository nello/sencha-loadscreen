Ext.define('Proximity.view.search.SearchField', {
    extend: 'Ext.field.Search',
    xtype: 'xsearchField',
    config: {
//        listeners: [{
//            event: 'focus',
//            fn: 'hideIosSearchBar'
//        }]

        listeners: {
            clearicontap: 'hideIosSearchBar',
            focus: 'hideIosSearchBar',
            mousedown: 'hideIosSearchBar'
        }
    },

    hideIosSearchBar: function (){
        console.log('hideIosCrap');
        window.scrollTo(0, 1);
        setTimeout(function(){
            window.scrollTo(0, 1);
        }, 1);
        setTimeout(function(){
            window.scrollTo(0, 1);
        }, 10);
    },

    getElementConfig: function(){
        var tpl = this.callParent();

        tpl.tag = 'form';
        tpl.onsubmit = 'return false;';

        return tpl;
    }
});


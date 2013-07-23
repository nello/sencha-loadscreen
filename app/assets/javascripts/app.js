Ext.Loader.setPath({
    'Proximity': '/assets/app'
});

Ext.application({
    name: 'Proximity',

    startupImage: {
        '320x460': 'assets/startup/320x460.png',
        '640x920': 'assets/startup/640x920.png',
        '768x1004': 'assets/startup/768x1004.png',
        '748x1024': 'assets/startup/748x1024.png',
        '1536x2008': 'assets/startup/1536x2008.png',
        '1496x2048': 'assets/startup/1496x2048.png'
    },

    icon: {
        '57': 'assets/icons/icon.png',
        '72': 'assets/icons/icon~ipad.png',
        '114': 'assets/icons/icon@2x.png',
        '144': 'assets/icons/icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    models: ['Search'],

    views: [ 'Proximity.view.Main' ],

    controllers: ['SearchController'],

    stores: ['SearchStore', 'LocalSearchStore', 'RemoteSearchStore'],

    viewport: {
        autoMaximize: true
    },

    launch: function() {
        // display all recent searches
        var localStore = Ext.getStore('LocalSearchStore');
        try { localStore.load(); } catch (e) { console.log(e); localStorage.clear(); }
        Ext.getStore('SearchStore').replaceData(localStore);

        // if the device is not a phone
        if (!Ext.os.is.Phone) {
            // add a panel into the viewport
            Ext.Viewport.add({
                //panel gets special styling when it is floating
                xtype: 'panel',

                //give it a fixed width and height
                width: 320,
                height: 480,

                //center the panel
                centered: true,

                //modal gives it a mask
                modal: true,

                //disable the hide on mask tap functionality of modal
                hideOnMaskTap: false,

                //give it a fit layout so the list item stretches to the size of this panel
                layout: 'fit',

                //give it 1 item which is the listConfiguration
                items: [{ xclass: 'Proximity.view.Main' }]
            }).show();
        } else {
            // add the list into the viewport
            Ext.Viewport.add({
                    xclass: 'Proximity.view.Main'
            });
        }
    }
});

var theMap = Ext.create('Ext.Map', {
    config: {
        mapOptions: {
            center: new google.maps.LatLng (38.909027,-77.037165),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoom: 15
        }
    },
    initialize: function() {
        console.log('creating the real map');
    }
});


function loadGoogleMaps() {
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://maps.googleapis.com/maps/api/js?sensor=true&callback=createMap";
    document.body.appendChild(script);
}

window.onload = loadGoogleMaps;

var theMap = null;
var fakeMap = null;

var createMap = function() {
    console.log('creating the real map');

    theMap = Ext.create('Ext.Map', {
        useCurrentLocation: true,
        autoUpdate: false,
        frequency: 1000,

        mapOptions: {
//                center: new google.maps.LatLng (38.909027, -77.037165),
            mapTypeId: google.maps.MapTypeId.TERRAIN,
            zoom: 16
        }
    });


//    if (!fakeMap) {
//        console.log('creating the fake map');
//
//        fakeMap = Ext.create('Ext.Panel', {
//            html: 'Map should be here',
//            initialize: function() {
//                console.log('creating the map');
//            }
//        });
//    }
}


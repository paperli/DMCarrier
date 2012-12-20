/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

function gmapInit(){
    var mapOptions = {
        zoom: 4,
        center: new google.maps.LatLng(-33, 151),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    return map;
}

//var map;
var MYAPP = MYAPP || {};

MYAPP.run = function(){
    //var map = gmapInit();
    
    MYAPP.app = new kendo.mobile.Application(document.body, { transition: "slide" });
    $('#map-canvas').height($('#map-canvas').parents('div[data-role=content]').height());
    navigator.geolocation.getCurrentPosition(onSuccess,onError);
};

function onError(error){
    alert('code: ' + error.code + '\n' +
          'message: ' + error.message + '\n');
}

function onSuccess(position){
    alert("get position success! Lat:" + position.coords.latitude + " Lng:" + position.coords.longitude);
    //gmapInit();
    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var opts = {
        zoom:8,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), opts);
    
}

MYAPP.reddit = kendo.data.DataSource.create({
                                            transport:{
                                                read: "http://www.reddit.com/r/programming.json"
                                            },
                                            schema: {
                                                data:"data.children",
                                                fields: {
                                            title:"data.title"
                                                }
                                            }
});



(function(){
 
 if (navigator.userAgent.indexOf('Browzr') > -1){
    // blackberry
    setTimeout(MYAPP.run,250);
 } else {
    //document.addEventListener('deviceready',onDeviceReady, false);
    document.addEventListener('deviceready',MYAPP.run, false);
 }
})();

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

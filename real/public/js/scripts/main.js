require.config({
    paths: {
        jquery: '../components/jquery/jquery',
        bootstrap: 'vendor/bootstrap',
        backbone: 'vendor/backbone-min',
        underscore: 'vendor/underscore-min',
        text: 'vendor/text',
        jqueryUI: 'vendor/jquery-ui',
        raphael: 'vendor/raphael',
        json2: 'vendor/json2',
        sketchpad: 'vendor/raphael.sketchpad'

    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        backbone: {
            deps:['jquery','underscore'],
            exports: 'Backbone'
        },
        jqueryUI: {
            deps: ['jquery'],
            exports: 'jqueryUI'
        },
        sketchpad: {
            deps: ['jquery','raphael','json2'],
            exports: 'raphaelSketchpad'
        }
    }
});

require(['app', 'jquery', 'bootstrap', 'backbone','jqueryUI', 'sketchpad'], function (App, $,boostrap, Backbone,jqueryUI, sketchpad) {
    'use strict';
    App.initialize();
});
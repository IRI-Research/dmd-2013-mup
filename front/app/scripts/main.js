require.config({
    paths: {
        jquery: '../components/jquery/jquery',
        bootstrap: 'vendor/bootstrap',
        paper: 'vendor/paper',
        backbone: 'vendor/backbone-min',
        lodash: 'vendor/lodash.min',
        text: 'vendor/text',
        jqueryUI: 'vendor/jquery-ui'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        paper : {
            exports: 'Paper'
        },
        backbone: {
            deps:['jquery','lodash'],
            exports: 'Backbone'
        },
        jqueryUI: {
            deps: ['jquery'],
            exports: 'jqueryUI'
        }
    }
});

require(['app', 'jquery', 'bootstrap', 'paper','backbone','jqueryUI'], function (App, $,boostrap, Paper, Backbone,jqueryUI) {
    'use strict';
    App.initialize();
});
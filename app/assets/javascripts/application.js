//= require ./lib/jquery
//= require ./lib/underscore-min
//= require ./lib/backbone-min
//= require_tree ./models
//= require_tree ./collections
//= require_tree ./views

var App = new (Backbone.Router.extend({
  routes: { 
    "": "index",
    "lists/:id": "show",
  },

  start: function(){
    Backbone.history.start();
  },

  index: function(){
    var lists = new Lists();
    var listsView = new ListsView({collection: lists});
    $('#app').html(listsView.el);
    lists.fetch();
  },

  show: function(id){
      var images        = new ImageSet(id),
          imagesView    = new ImageSetView({collection: images}),
          backHomeView  = new BackHomeView();

      $('#app').html(imagesView.el)
        .append(backHomeView.el);
      images.fetch();
  }
}));

$(function(){ App.start(); })
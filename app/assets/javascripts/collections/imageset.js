var ImageSet = Backbone.Collection.extend({
  model: Image,

  initialize: function(id){
    this.id = id;
  },

  url: function(){
    return "lists/" + this.id + "/images";
  }
});
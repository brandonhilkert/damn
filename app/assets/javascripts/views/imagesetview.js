var ImageSetView = Backbone.View.extend({
  initialize: function(){
    this.collection.on('add', this.addOne, this);
    this.collection.on('reset', this.addAll, this);
  },

  render: function(){ 
    this.addAll();
  },

  addOne: function(image){
    var imageView = new ImageView({model: image});
    this.$el.append(imageView.render().el);
  },

  addAll: function(){
    this.collection.forEach(this.addOne, this);
  },
});
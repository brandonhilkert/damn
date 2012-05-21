var ListsView = Backbone.View.extend({
  tagName: 'ul',

  initialize: function(){
    this.collection.on('add', this.addOne, this);
    this.collection.on('reset', this.addAll, this);
  },

  render: function(){ 
    this.addAll();
  },

  addOne: function(item){
    var listView = new ListView({model: item});
    this.$el.append(listView.render().el);
  },

  addAll: function(){
    this.collection.forEach(this.addOne, this);
  },
});
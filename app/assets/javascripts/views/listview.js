var ListView = Backbone.View.extend({
  tagName: 'li',
  template: _.template('<a href="#lists/<%= path %>"><%= label %></a>'),

  events: {
    "click button.destroy" : "clear"
  },

  initialize: function(){
    this.model.on('destroy', this.remove, this);
  },

  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  clear: function() {
    this.model.destroy();
  }
});
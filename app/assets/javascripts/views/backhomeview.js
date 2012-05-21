var BackHomeView = Backbone.View.extend({
  template: _.template('<a href="#" class="back-home button">Home</a>'),

  initialize: function(){
    this.render();
  },

  render: function(){
    this.$el.html(this.template());
    return this;
  }
});
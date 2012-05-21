var ImageView = Backbone.View.extend({
  className: "image",
  template: _.template('<img src="<%= url %>" />'),

  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});
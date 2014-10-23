Bars = new Mongo.Collection('bars');

if (Meteor.isClient) {
  Template.bars.helpers({
    listBars: function () {
      return Bars.find({}, {sort: {score: -1}});
    },
    selectedBar: function () {
      var id = Session.get('chosenBar');
      var bar = Bars.findOne({_id: id});
      return bar;
    }
  });

  Template.bars.events({
    'click .bar': function () {
      Session.set('chosenBar', this._id);
    },
    'click .inc': function () {
      var id = Session.get('chosenBar');
      Bars.update({_id: id}, {$inc: {score: 1}});
    }
  });

  Template.bar.helpers({
    selected: function () {
      if (Session.get('chosenBar') == this._id)
        return 'selected';

      return '';
    }
  })

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Bars.find().count() === 0 ) {
      var names = [
        '111 Minna',
        'Press Club',
        'Shroeders',
        '21st Amendment'
      ];

      for (var i = 0; i<names.length; i++) {
        Bars.insert({
          name: names[i],
          score: Math.floor(Random.fraction()*10)
        });
      }
    }
  });
}

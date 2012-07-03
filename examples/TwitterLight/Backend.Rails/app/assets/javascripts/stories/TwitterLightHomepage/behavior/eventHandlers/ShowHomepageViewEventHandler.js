define([
  'jquery',
  'nexus',
  'stories/ViewTweets/behavior/commands/ViewAllTweets',
  'stories/PostATweet/behavior/commands/ShowPostATweetForm',
  'stories/TwitterLightHomepage/behavior/events/HomepageShown'
], function ($, Nexus, ViewAllTweets, ShowPostATweetForm, HomepageShown) {

  return new Nexus.EventHandler(
    'Homepage shown event handler',
    HomepageShown.eventName,
    function (evt) {
      new Nexus.View({
        template:'stories/TwitterLightHomepage/ui/templates/Homepage.html',
        placeholder:'#content',
        data:{},
        onLoad:function () {
          $('#ViewTweets').click(function () {
            Nexus.CommandBus.dispatch(
              ViewAllTweets.Command()
            );
          });
          $('#PostTweets').click(function () {
            Nexus.CommandBus.dispatch(
              ShowPostATweetForm.Command()
            );
          });
        }
      })
        .render();
    }
  );

});

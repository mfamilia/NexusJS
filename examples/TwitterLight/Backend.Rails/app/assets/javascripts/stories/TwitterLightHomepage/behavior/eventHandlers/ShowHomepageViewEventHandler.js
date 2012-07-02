$(function () {
  TwitterLight.EventHandlers.ShowHomepageView = new Nexus.EventHandler(
    'Homepage shown event handler',
    TwitterLight.Events.HomepageShown.eventName,
    function (evt) {
      new Nexus.View({
        template:JST['stories/TwitterLightHomepage/ui/templates/Homepage'],
        placeholder:'#content',
        data:{},
        render:function(){
          $(this.placeholder).html(this.template());
        },
        onLoad:function () {
          $('#ViewTweets').click(function () {
            Nexus.CommandBus.dispatch(
              TwitterLight.Commands.ViewAllTweets.Command()
            );
          });
          $('#PostTweets').click(function () {
            Nexus.CommandBus.dispatch(
              TwitterLight.Commands.ShowPostATweetForm.Command()
            );
          });
        }
      }).render();
    });
});
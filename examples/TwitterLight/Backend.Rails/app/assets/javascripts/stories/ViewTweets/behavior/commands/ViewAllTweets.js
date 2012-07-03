define(function () {

  var ViewAllTweets = {

    commandName:"View all tweets",

    Command:function () {
      return {
        commandName:ViewAllTweets.commandName
      };
    }
  };

  return ViewAllTweets;
});




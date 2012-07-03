define(function () {

  var PostNewTweet = {

    commandName:"Post new tweet",

    Command:function (Tweet) {
      return {
        Tweet:Tweet,
        commandName:PostNewTweet.commandName
      };
    }
  };

  return PostNewTweet;
});




define(function () {

  var NavigateToHomepage = {

    commandName:"Navigate to homepage",

    Command:function () {
      return {
        commandName:NavigateToHomepage.commandName
      };
    }
  };

  return NavigateToHomepage;
});




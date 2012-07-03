define(function () {

  var ShowPostATweetForm = {

    commandName:"Show post a tweet form",

    Command:function () {
      return {
        commandName:ShowPostATweetForm.commandName
      };
    }
  };

  return ShowPostATweetForm;
});




TwitterLight.Events.ErrorRaised = {
  eventName:"Error raised",
  Event:function (message) {
    return {
      message:message,
      eventName:this.eventName
    };
  }
};


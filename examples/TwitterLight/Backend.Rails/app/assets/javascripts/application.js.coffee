require ['jquery', 'nexus', 'commandHandlers', 'eventHandlers', 'routes'], ($, Nexus, CommandHandlers, EventHandlers, Routes) ->
  $ ->
    Nexus.App = {
    ApiUrl: 'http://api.nexusjs.com'
    }

    CommandHandlers.register()
    EventHandlers.register()
    Routes.register()

    redirectToRoute = window.location.hash

    if (window.location.href.indexOf("tests.html") == -1)
      Nexus.Router.route('#TwitterLightHomepage/HomepageShown')

    if (redirectToRoute)
      Nexus.Router.route(redirectToRoute)


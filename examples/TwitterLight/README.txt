This example can be found running on the web at:
http://twitterlight.herokuapp.com

FRONTEND
--------------------------------------------------
Frontend is written on NexusJS.
Tested under Firefox, Safari, Chrome and Opera
Currently does not work on IE 9 and below. Not yet tested on IE 10

BACKEND
--------------------------------------------------
NexusJS works on top of any backend that can talk in JSON
Provided examples are:
 - (C#).NET MVC 3
 - (JavaScript) NodeJS 


TO RUN THIS EXAMPLE LOCALLY
--------------------------------------------------
1) Twitter light app is using 
    http://web.nexusjs.com for frontend 
    http://api.nexusjs.com for backend
    This means you first must make sure that both point to your localhost (127.0.0.1)
     Windows: in your C:\Windows\System32\drivers\etc\hosts file, add the following:
 	127.0.0.1  api.nexusjs.com
	127.0.0.1  web.nexusjs.com
     Mac/Linux: add same lines to /etc/hosts
 2) 
    To run with .NET backend example
    --------------------------------
     IIS: 
      WEB
     	a) create a new website, call it web.nexusjs.com 
     	b) point it to Frontend.NexusJS directory
     	c) bind it to host name web.nexusjs.com port 80 host http
      API
        a) create a new website, call it api.nexusjs.com 
      	b) point it to Backend.Net/NexusDotNet.Web directory
     	c) bind it to host name api.nexusjs.com port 80 host http
     GO TO http://web.nexusjs.com
     
     To run with NodeJS backend example
     ----------------------------------
      NGINX (can also use any other webserver, including node)
       WEB (will be running under nginx web server)
        a) copy Frontend.NexusJS to your nginx html directory
        b) run nginx on port 8080
      NODE
       API
        a) under Backend.NodeJS run 'npm update' to get node packages
        b) run 'node web' to start (will run on port 80)
      GO TO http://web.nexusjs.com:8080
      
P.S.
Quickly wrote these step by step from memory so if you have questions feel free to email me at alex@nexusjs.com

Will post better nginx/node instructions when I figure out virtual hosts setup on them.
Feel free to fork these instructions
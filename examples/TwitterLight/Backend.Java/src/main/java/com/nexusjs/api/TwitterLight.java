package com.nexusjs.api;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.sun.jersey.spi.resource.Singleton;

@Singleton
@Path("/TwitterLight")
public class TwitterLight {

	private List<Tweet> tweets = new ArrayList<Tweet>();
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/GetAllTweets")
	public List<Tweet> getTweet() {
		return tweets;
	}
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/SaveTweet")
	public Response saveTweet(Tweet tweet) {
		tweets.add(tweet);
		return Response.status(200).entity(tweet).build();
	}

}
package com.matthewlamdotjs.api;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

import com.matthewlamdotjs.model.SQLDatabaseConnection;

@Path("/test")
public class GeneralResource {
  
    @GET
    @Path("/echo")
    public Response getMsg(@QueryParam("name") String name) {
  
        String output = "Welcome "+name;
  
        return Response.status(200).entity(output).build();
  
    }
  
}

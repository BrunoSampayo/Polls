import fastify from "fastify";
import cookie from '@fastify/cookie'
import { createPoll } from "./routes/create-poll";
import { getPoll } from "./routes/get-poll";
import { voteOnPoll } from "./routes/vote-on-poll";
import fastifyWebsocket from "@fastify/websocket";
import { pollResults } from "./ws/poll-results";


const app = fastify();
  
app.register(cookie,{
  secret: "20ace564-b141-4276-9789-8ed5c62632d9",
  hook: 'onRequest',
});

app.register(fastifyWebsocket)

app.register(createPoll);
app.register(getPoll);
app.register(voteOnPoll);
 
app.register(pollResults)
app.listen({port: 3333},()=>{
    console.log("Server is running on port 3333")
})
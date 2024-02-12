import fastify from "fastify";


const app = fastify();
  

app.get('/', (req, res) => {return "Hellow"});
app.listen({port: 3333},()=>{
    console.log("Server is running on port 3333")
})
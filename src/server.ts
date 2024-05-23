import fastify from "fastify";
import cors from "@fastify/cors"


const server = fastify({logger: true});

server.register(cors,{
    origin: "*"
})



const teams = [
    {id: 1, name: "Ferrari", base: "Maranello, Emilia-Romagna, Itália"},
    {id: 2, name: "Mclaren", base: "Woking, Reino Unido"},
    {id: 3, name: "Red Bull Racing", base: "Milton Keynes, Reino Unido"},
    {id: 4, name: "Aston Martin", base: "Silverstone, Reino Unido"},
    {id: 5, name: "Mercedes-Benz", base: "Brackley, Reino Unido"},
    {id: 6, name: "Alpine", base: "Enstone, Reino Unido"},
    {id: 7, name: "AlphaTauri", base: "Faenza, Itália"},
    {id: 8, name: "Williams", base: "Grove, Reino Unido"},
    {id: 9, name: "Alfa Romeo", base: "Hinwil, Suíça"},
    {id: 10, name: "Haas", base: "Kannapolis, Carolina do Norte, EUA"}

]

const drivers = [
    {id: 1, name: "Max Verstappen", age: 26, nationality: "Holandês"},
    {id: 2, name: "Sergio Perez", age: 34, nationality: "Mexicano"},
    {id: 3, name: "Lando Norris", age: 24, nationality: "Britânico"},
    {id: 4, name: "Oscar Piastri", age: 23, nationality: "Australiano"},
    {id: 5, name: "George Russell", age: 26, nationality: "Britânico"},
    {id: 6, name: "Lewis Hamilton", age: 39, nationality: "Britânico"},
    {id: 7, name: "Charles Leclerc", age: 26, nationality: "Monegasco"},
    {id: 8, name: "Carlos Sainz", age: 29, nationality: "Espanhol"},
    {id: 9, name: "Fernando Alonso", age: 42, nationality: "Espanhol"},
    {id: 10, name: "Esteban Ocon", age: 27, nationality: "Francês"},
    {id: 11, name: "Pierre Gasly", age: 28, nationality: "Francês"},
    {id: 12, name: "Yuki Tsunoda", age: 23, nationality: "Japonês"},
    {id: 13, name: "Valtteri Bottas", age: 34, nationality: "Finlandês"},
    {id: 14, name: "Guanyu Zhou", age: 24, nationality: "Chinês"},
    {id: 15, name: "Kevin Magnussen", age: 31, nationality: "Dinamarquês"},
    {id: 16, name: "Nico Hulkenberg", age: 36, nationality: "Alemão"},
    {id: 17, name: "Lance Stroll", age: 25, nationality: "Canadense"},
    {id: 18, name: "Logan Sargeant", age: 23, nationality: "Americano"},
    {id: 19, name: "Nyck de Vries", age: 29, nationality: "Holandês"},
    {id: 20, name: "Daniel Ricciardo", age: 34, nationality: "Australiano"}
];

server.get("/teams", async(request, response) =>{
    response.type("application/json").code(200)
    return {teams}
})

server.get("/drivers", async(request, response) =>{
    response.type("application/json").code(200)

    return {drivers}
})

interface DriverParams{
    id:string
}

server.get<{Params: DriverParams}>("/drivers/:id", async(request, response)=>{
    const id = parseInt(request.params.id);
    const driver = drivers.find( d => d.id === id);

    if(!driver){
        response.type("application/json").code(404);
        return {message: "Driver Not Found"}
    }else{
        response.type("application/json").code(200);
        return {driver}
    }
})

server.listen({port: 3333}, ()=>{
    console.log("Server init")
})
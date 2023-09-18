import express from "express"
import cors from "cors"
import { request, gql, GraphQLClient } from 'graphql-request';

const app = express()

app.use(cors({
    origin: "http://localhost:5500"
}))

app.get("/", async (req, res) => {
    const graphQLClient = new GraphQLClient('https://swapi-graphql.netlify.app/.netlify/functions/index', {
        headers: {
        },
    });
    const query = gql`
        {
            allSpecies {
                species {
                    averageLifespan
                    averageHeight
                    name
                }
            }
        }
    `;
    const results = await graphQLClient.request(query);

    console.log(JSON.stringify(results, undefined, 2));

    var data = [];

    for (const species of results.allSpecies.species) {
        var trace = {
            x: [species.averageLifespan],
            y: [species.averageHeight],
            mode: 'markers',
            name: species.name
        };

        data.push(trace);
    }

    var layout = {
        title:'Average height (y) and lifespan (x) of different Star Wars species'
    };

    res.send({
        data, 
        layout
    }).status(200)
})


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`server listening on port ${port} 🚀`))
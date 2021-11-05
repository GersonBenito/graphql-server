import { gql, ApolloServer } from 'apollo-server';
import { v1 as uuid } from 'uuid';
import axios from 'axios';

// paso 1: suministro de datos
const personas = [

    {
        id: 'sdjfhsudhf8y384yyyydfnef8',
        name: 'Adriana Carolina Hernandez Monterroza',
        phone: '78884567',
        street: 'Avenida nueva cuscatlan',
        city: 'San Salvador',
    },
    {
        id: 'sdkfjdifu349u439unfdjfn83',
        name: 'Camilo Albterto Cortes Montejo',
        street: 'Nueva San Salvador',
        city: 'San Salvador',
    },
    {
        id: 'sdjfhsdufh38y4hfd8eefy3484',
        name: 'Claudia Liliana Torres Frias',
        phone: '79946344',
        street: 'Calle a Santa Tecla',
        city: 'La Libertada',
    },
    {
        id: 'jsdfhdsuhfusdf83434',
        name: 'test',
        phone: '79946344',
        street: 'Calle a Santa Tecla',
        city: 'La Libertada',
    },

];

// paso 2: describir los datos
const tyepeDefs = gql`
    type Address {
        street: String!,
        city: String!
    }

    type Persona {
        id: ID!,
        name: String!,
        phone: String,
        address: Address!
    }

    type Query {
        personCount: Int!,
        allPerson: [Persona]!
        findPerson(name: String!): Persona
    }

    type Mutation {
        addPersona(
            name: String!,
            phone: String,
            street: String!,
            city: String!
        ): Persona
    }
`

// paso 3: resolver informacion
const resolvers = {
    Query: {
        personCount: () => personas.length,
        allPerson: () => personas,
        findPerson: (root, args) =>{

            const { name } = args;

            return personas.find(person => person.name === name);

        }
    },
    Mutation: {
        addPersona: (root, args) =>{
            const person = {...args, id: uuid()}
            personas.push(person);

            return person;
        }
    },
    Persona: {
        address: (root) =>{
            return {
                street: root.street,
                city: root.city
            }
        }
    }
}

// paso 4: crear servidor
const server = new ApolloServer({
    typeDefs: tyepeDefs, // en es6 no es necesrio colocar la key del objeto cuando se tiene el mismo nombre
    resolvers: resolvers
});

// paso 5: iniciar servidor
server.listen().then(({url})=>{
    console.log(`servidor corriendo en el puerto ${url}`);
})

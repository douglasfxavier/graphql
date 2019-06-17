const graphql = require('graphql');
const {
    GraphQLID,
    GraphQLInt,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLList
} = graphql;

const _ = require('lodash');

const helloWorldType = new GraphQLObjectType({
    name: 'HelloWorld',
    fields: ()=>({
        texto: {type: GraphQLString}
    })
});

const pessoaType =  new GraphQLObjectType({
    name: 'Pessoa',
    fields: () => ({
        id: {type: GraphQLID},
        cpf: {type: GraphQLString},
        nome: {type: GraphQLString},
        contatos: {
            type: GraphQLList(contatoType),
            resolve(parent,args){
                return _.filter(contatos,{pessoa_id:parent.id})
            }
        }
    })
});

const contatoType = new GraphQLObjectType({
    name: 'Contato',
    fields: ()=> ({
        id: {type: GraphQLInt},
        ddd: {type: GraphQLInt},
        numero: {type: GraphQLInt},
        operadora: {type: GraphQLString},
        pessoa: {
            type: pessoaType,
            resolve(parent,args){
                return _.find(pessoas,{id: parent.pessoa_id})
            }
        }
    })
});

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        helloword: {
            type: helloWorldType,
            resolve(){
                return {texto: "Hello World"};
            }
        },
        pessoas: {
            type: new GraphQLList(pessoaType),
            resolve(){
                return pessoas;
            }
        },
        pessoa: {
            type: pessoaType,
            args: {
                cpf: {type: GraphQLString}
            },
            resolve(parent_,args) {
                return _.find(pessoas, {cpf: args.cpf});
            }
        },
        contato: {
            type: contatoType,
            args: {
                id: {type: GraphQLInt}
            },
            resolve(parent, args) {
                return _.find(contatos, {id: args.id});
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query:queryType
})

const pessoas = [
    {
        id: 1,
        cpf: "1234567890",
        nome: "Bob"
    },
    {
        id: 2,
        cpf: "2345678901",
        nome: "Maria"
    }
];

const contatos = [
    {
        id: 1,
        ddd: 83,
        numero: 77777777,
        operadora: "CLARO",
        pessoa_id: 1

    },
    {
        id: 2,
        ddd: 83,
        numero: 88888888,
        operadora: "VIVO",
        pessoa_id: 1

    },
    {
        id: 3,
        ddd: 83,
        numero: 99999999,
        operadora: "TIM",
        pessoa_id: 2

    }
];

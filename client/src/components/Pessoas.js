import React, {Component} from 'react';
import {gql} from 'apollo-boost';
import  {graphql} from 'react-apollo';

const getPessoasQuery = gql`
    {
        pessoas
        {
            id
            cpf
            nome
        }
    }
`

class Pessoas extends Component{
    exibirPessoas(){
        var dados = this.props.data;
        if (dados.loading){
            return (<div>Carregando dados...</div>)
        }else{
            return  dados.pessoas.map(pessoa =>{
                return(
                    <li key={pessoa.id}>CPF: {pessoa.cpf} Nome: {pessoa.nome}</li>
                )
            });
        }
    }
    render() {
        //console.log(this.props)
        return (
            <div id="Pessoas">
                <ul id="lista-pessoas">
                    {this.exibirPessoas()}
                </ul>
            </div>
        );
    }
}

export default graphql(getPessoasQuery)(Pessoas);

import React,  { useState } from 'react';
// import axios from 'axios';
// import * as S from './styled';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
const { consultarPokemon } = require('./consulta')
const { listarPokemon } = require('./lista')
// const Carrinho = require('../Carrinho/carrinho')
const DadosCarrinho = require('../Carrinho/dadoscarrinho')
// const Produto = require('../Carrinho/produto')

function App(props) {
    let history = useHistory();
    localStorage.clear('listaPokemon', useState('') );
//alterar para tratar o next 20 ocorrencias depois
    // const [proximo, setProximo] = useState('');
    // const [usuario, setUsuario] = useState('');
    buscaLista();
    async function buscaLista(){
    try {
            const retornoLista = await listarPokemon(0, 40)
            console.log('JSON listaPokemon', JSON.stringify(retornoLista))
            // const totalPokemon = retornoLista.count;
            // const listaAnterior = retornoLista.previous;
            // const proximaLista = retornoLista.next;
            const resultados = retornoLista.results;
            console.log('dados lista', resultados);
            const detalhe = await detalhePokemon(resultados);
            // localStorage.setItem('listaPokemon', JSON.stringify(listaPokemon));
            console.log(localStorage, detalhe);     
            history.push('/loja');
            // const carrinhoCompra = await DadosCarrinho.inicializaCarrinho();
            // localStorage.setItem('carrinhoCompra', JSON.stringify(Carrinho));
        } catch (error) {
            console.error('erro ao acessar a função listarPokemon', error)
        }
    }
    DadosCarrinho.inicializaCarrinho();


    return (
<>
</>
    //     <S.Container>
    //        <S.Input className="usuarioInput" placeholder="Usuário" value={usuario} onChange={e => setUsuario(e.target.value)} />
    //        <S.Button type="button" onClick={buscaLista}>Pesquisar</S.Button>
    //    </S.Container>
    );

}


async function detalhePokemon(listaPokemon){
    const totalLinhas = listaPokemon.length
    console.log('acessou detalhePokemon', totalLinhas, listaPokemon)
    const listaReduzida = []
    for (let indice = 0; indice <= totalLinhas - 1; indice++) {
        const nomePokemon = listaPokemon[indice].name
        console.log('for detalhe ', indice, nomePokemon)
        try {
            //para cada pokemon da lista solicita consulta na API do bichinho para obter imagem, peso e ID
            const retornoConsulta = await consultarPokemon(nomePokemon)      
            const urlImagem = retornoConsulta.sprites.front_default;
            const pesoPokemon = retornoConsulta.weight;
            const precoPokemon = (pesoPokemon / 10).toFixed(2);
            const idPokemon = retornoConsulta.id;
            // monta array com os dados do Pokemon necessarias para a loja'
            // const dadosPokemon = [`id:${idPokemon}`, `nome:${nomePokemon}`, `preco:${precoPokemon}`, `imagem:${urlImagem}`]
            // const dadosPokemon = [idPokemon, nomePokemon, precoPokemon, urlImagem]
            var dadosPokemon = {id:`${idPokemon}`, nome: `${nomePokemon}`, preço:`${precoPokemon}`, imagem: `${urlImagem}`};
            // const dadosPokemon = retornoPokemon;
            listaReduzida.push(dadosPokemon)
            console.log('lista', listaReduzida)
            console.log("chamou a API 2", dadosPokemon); 
        } catch (error) {
        console.error('erro ao acessar a função detalhePokemon', error) 
        }
    }
    localStorage.setItem('listaPokemon', JSON.stringify(listaReduzida));
    // const carrinhoTeste = {}
} 

export default App;

// [usuario, setUsuario]
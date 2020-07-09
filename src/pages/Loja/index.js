import React, { useEffect, useState} from 'react';
import * as S from './styled';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'reactstrap';
import {  } from 'react-router-dom';
import consultarPokemon from '../Home/consulta'; 
// const { atualizarCarrinho, obterDadosCarrinho } = require('../Carrinho/dadocarrinho')
// const Commander = require('commander')
import DadosCarrinho from '../Carrinho/dadoscarrinho' 
// const Carrinho = require('../Carrinho/carrinho')
// const Produto = require('../Carrinho/produto')

export default function Pokemons() {
    // let history = useHistory();
    // const [quantidade, setQuantidade] = useState('');
    const [nomePokemon, setNome] = useState('');
    const [listaPokemon, setPokemon] = useState([]);
    // const [carrinhoCompra, setCarrinho] = useState([]);
    // const [totaisCarrinho, setTotais] = useState([]);
    useEffect(() => {
        let dadosPokemon = localStorage.getItem('listaPokemon');
        dadosPokemon = JSON.parse(dadosPokemon);
        setPokemon(dadosPokemon);
        console.log('storage listaPokemon Json' , dadosPokemon);
        renderCarrinho()
    }, []);
    
    return (
        <>		
        <div className="container-fluid">
            <S.Menu className="row">
                <div className="col-md-3" id="Menu">
                    <img src='https://pokeres.bastionbot.org/images/pokemon/25.png' width="20%" alt="logo pikachu"></img>
                </div>
                <div className="col-md-6" id="Menu">
					<form className="form-inline">
                        <p></p>
						<input className="form-control mr-sm-8" type="text" placeholder="Pokemon" value={nomePokemon} onChange={e => setNome(e.target.value)}/> 
						<Button className="btn btn-primary my-2 my-sm-8" type="submit" onClick={() =>buscarPokemon(nomePokemon)}>
							Pesquisar
						</Button>
					</form>
                </div>
            <S.Destaque className="col-md-3">
                <S.Destaque className="page-header " id="textoDestaque">
                    <S.h2><p></p>
                        Em busca de Pokémon?<small>Aqui tem <strong>#fiqueemcasa</strong></small>
                    </S.h2> 
                </S.Destaque>   
            </S.Destaque>
            </S.Menu>
            <div className="row"></div>
            <div className="row">
                <div className="col-md-8" id="colunaCards">
                    <div className="row" id="linhaCards">
                        { listaPokemon.map(pokemon => {
                            return (
                            <> 
                                <div className="col-md-3" id="cards">
                                    <div className="card" id="itemCard">
                                        <S.HeaderCard className="card-header">
                                            <h5>{ pokemon.nome }</h5>
                                        </S.HeaderCard>
                                        <div className="card-body">
                                            <img src={ pokemon.imagem } alt="imagem produto"></img>
                                        </div>
                                        <div className="card-footer">
                                            <strong>R$ { pokemon.preço } </strong> cada   
                                        </div>
                                        <div className="card-footer">
                                            <Button type="button" className="botaoCard"
                                            onClick={() => tratarCompra(pokemon, 1)}>
                                            <small>Comprar</small>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </>
                                )
                            }) 
                        }
                    </div>
                </div>
                <div className="col-md-4" id="carrinho">
                    <div className="card" id="itemCarrinho">
                        {() => renderCarrinho()}
                    </div>
                </div>    
            </div>
        </div>
        </>
    )

}

async function tratarCompra(produtoSelecionado) {
    try {
        const compraRealizada = await DadosCarrinho.incluir(produtoSelecionado, 1) 
        console.log('Carrinho atualizado', compraRealizada)    
    } catch (error) {
        console.error('erro ao acessar a função tratarCompra', error)
    }
        renderCarrinho()
    }

async function excluirProduto(produtoSelecionado) {
    try {
        const exclusaoProduto = await DadosCarrinho.excluir(produtoSelecionado) 
        console.log('Carrinho atualizado', exclusaoProduto)    
    } catch (error) {
        console.error('erro ao acessar a função exclusão de produto', error)
    }
        renderCarrinho()
    }

function renderCarrinho() {    
        let totais = localStorage.getItem('totaisCarrinho');
        totais = JSON.parse(totais);

        let carrinho = localStorage.getItem('carrinhoCompra');
        var element = (<> </>)
        if (totais.quantidadeTotal === 0  ){
           element = (
            <> 
{/* INCLUIR bodys conforme as OCORRENCIAS incluidas NO CARRINHO*/}
            <S.Carrinho className="card-header">
                <h5>Carrinho de Compras</h5>
            </S.Carrinho>
            <div className="card-body" id="bodycarrinho">Carrinho Vazio</div>
            <div className="card-footer" id="totalcarrinho">             
                    <p>Total itens: 0</p>  
            </div>   
             </> 
           )}
        else {
        carrinho = JSON.parse(carrinho)
            element = (
            <> 
{/* INCLUIR bodys conforme as OCORRENCIAS incluidas NO CARRINHO*/}
            <S.Carrinho className="card-header">
                <h5>Carrinho de Compras</h5>
            </S.Carrinho>           
            <div className="card-body" id="bodycarrinho">
                <table>
                {/* <tr>
                    <th>Produto</th>
                    <th></th>
                    <th>Preço</th>
                </tr> */}
{/* inclui condição chamar essa funcao apenas quando entrar dados no carrinho*/}
                { carrinho.map(produtos => {
                return (
                <>  
               <tr>
                    <td><img src={ produtos.imagem } width="40%" alt="imagem produto no carrinho"></img></td>
                    <td>{produtos.nome}</td>
                    <td>R$ {produtos.preço}  </td>
                    <td><b></b><button type="button" className="btn btn-danger"
                    onClick={() => excluirProduto(produtos.id)}>X</button></td>
                {/* <td><Button type="excluir"><small>x</small></Button></td> */}
                </tr>
               </> )
                }) 
            }
              </table>
 
            </div>

            <div className="card-footer" id="totalcarrinho">
                    <strong>TOTAL</strong> R$: { totais.valorTotal }                 
                    <p><strong>Total itens:</strong> { totais.quantidadeTotal }</p>  
            </div>
            <div className="card-footer" id="finalizarcarrinho">
                <b><Button type="button" onClick={() => renderFinalizar(totais)}><small>FINALIZAR</small></Button></b>
            </div> 
            </> )  
        };
            // return(element)
            ReactDOM.render(element, document.getElementById('carrinho'));                
    }

function renderFinalizar(totais) {
     var element = (<> </>)
           element = (
            <> 
            <S.HeaderCard className="card-header">
                <h5>Parabéns pela excelente compra</h5>
            </S.HeaderCard>
            <S.Mensagem className="card-body" id="bodycarrinho">
              <p className="card-text">Você está adiquirindo <strong> { totais.quantidadeTotal } Pokèmon</strong> </p>
              <p className="card-text">O valor total da sua compra é <strong>R$: { totais.valorTotal }</strong> </p>
            </S.Mensagem>   
             </> 
           )
        ReactDOM.render(element, document.getElementById('carrinho'));
        DadosCarrinho.inicializaCarrinho(); 
        // renderCarrinho() 
}  


async function buscarPokemon(pokemon){
    const pokemonBusca = []
    const retornoConsulta = await consultarPokemon(pokemon)      
    const urlImagem = retornoConsulta.sprites.front_default;
    const pesoPokemon = retornoConsulta.weight;
    const precoPokemon = (pesoPokemon / 10).toFixed(2);
    const idPokemon = retornoConsulta.id;
    const nomePokemon = retornoConsulta.name;
    var dadosPokemon = {id:`${idPokemon}`, nome: `${nomePokemon}`, preço:`${precoPokemon}`, imagem: `${urlImagem}`};
    // const dadosPokemon = retornoPokemon;
    pokemonBusca.push(dadosPokemon)
    localStorage.setItem('listaPokemon', JSON.stringify(pokemonBusca));
    renderCarrinho()
} 
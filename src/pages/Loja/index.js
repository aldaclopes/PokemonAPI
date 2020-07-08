import React, { useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
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
    const [usuario, setUsuario] = useState('');
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
            <div className="row">
                <div className="col-md-12" id="Menu">
					<form className="form-inline">
						<input className="form-control mr-sm-8" type="text" placeholder="Pokemon" value={usuario} onChange={e => setUsuario(e.target.value)}/> 
						<Button className="btn btn-primary my-2 my-sm-8" type="submit" onClick={consultarPokemon}>
							Pesquisar
						</Button>
					</form>
           {/* <Input className="usuarioInput" placeholder="Pokemon" value={usuario} onChange={e => setUsuario(e.target.value)} />
           <Button type="button" onClick={consultarPokemon}>Pesquisar</Button> */}
                </div>
            </div>
            <div className="row">
                <div className="col-md-8" id="colunaCards">
                    <div className="row" id="linhaCards">
                        { listaPokemon.map(pokemon => {
                            return (
                            <> 
                                <div className="col-md-4" id="cards">
                                    <div className="card" id="itemCard">
                                        <div className="card-header">
                                            <h5>{ pokemon.nome }</h5>
                                        </div>
                                        <div className="card-body">
                                            <img src={ pokemon.imagem } alt="imagem produto"></img>
                                        </div>
                                        <div className="card-footer">
                                            R$ { pokemon.preço } cada   
                                        </div>
                                        <div className="card-footer">
                                            <Button type="button" 
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
                    <div className="card" id="itemCard">
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

function renderCarrinho() {    
        let totais = localStorage.getItem('totaisCarrinho');
        totais = JSON.parse(totais);

        let carrinho = localStorage.getItem('carrinhoCompra');
        var element = (<> </>)
        if (totais.quantidadeTotal === 0  ){
           element = (
            <> 
{/* INCLUIR bodys conforme as OCORRENCIAS incluidas NO CARRINHO*/}
            <div className="card-header">
                <h5>Carrinho de Compras</h5>
            </div>
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
            <div className="card-header">
                <h5>Carrinho de Compras</h5>
            </div>            
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
                    <td><img src={ produtos.imagem } width="30%" alt="imagem produto no carrinho"></img></td>
                    <td>{produtos.nome}</td>
                    <td>R$ {produtos.preço}</td>
                {/* <td><Button type="excluir"><small>x</small></Button></td> */}
                </tr>
               </> )
                }) 
            }
              </table>
 
            </div>

            <div className="card-footer" id="totalcarrinho">
                    TOTAL R$: { totais.valorTotal }                 
                    <p>Total itens: { totais.quantidadeTotal }</p>  
            </div>
            <div className="card-footer" id="finalizarcarrinho">
                <b><Button type="button"><small>FINALIZAR</small></Button></b>
            </div> 
            </> )  
        };
            // return(element)
            ReactDOM.render(element, document.getElementById('carrinho'));                
    }


import React, { useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { Container, Navbar, Row, Button, Input } from 'reactstrap';
import { useHistory } from 'react-router-dom';
const { consultarPokemon } = require('../Home/consulta')
// const { atualizarCarrinho, obterDadosCarrinho } = require('../Carrinho/dadocarrinho')
const Commander = require('commander')
const DadosCarrinho = require('../Carrinho/dadoscarrinho')
const Carrinho = require('../Carrinho/carrinho')
const Produto = require('../Carrinho/produto')

export default function Pokemons() {
    let history = useHistory();
    const [quantidade, setQuantidade] = useState('');
    const [usuario, setUsuario] = useState('');
    const [listaPokemon, setPokemon] = useState([]);
    const [carrinhoCompra, setCarrinho] = useState([]);
    const [totaisCarrinho, setTotais] = useState([]);
    useEffect(() => {
        let dadosPokemon = localStorage.getItem('listaPokemon');
        dadosPokemon = JSON.parse(dadosPokemon);
        setPokemon(dadosPokemon);
        console.log('storage listaPokemon Json' , dadosPokemon);
        renderCarrinho()
    }, []);
    
    return (
        <>		
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12" id="Menu">
					<form class="form-inline">
						<input class="form-control mr-sm-8" type="text" className="usuarioInput" placeholder="Pokemon" value={usuario} onChange={e => setUsuario(e.target.value)}/> 
						<Button class="btn btn-primary my-2 my-sm-8" type="submit" onClick={consultarPokemon}>
							Pesquisar
						</Button>
					</form>
           {/* <Input className="usuarioInput" placeholder="Pokemon" value={usuario} onChange={e => setUsuario(e.target.value)} />
           <Button type="button" onClick={consultarPokemon}>Pesquisar</Button> */}
                </div>
            </div>
            <div class="row">
                <div class="col-md-8" id="colunaCards">
                    <div class="row" id="linhaCards">
                        { listaPokemon.map(pokemon => {
                            return (
                            <> 
                                <div class="col-md-4" id="cards">
                                    <div class="card" id="itemCard">
                                        <div class="card-header">
                                            <h5>{ pokemon.nome }</h5>
                                        </div>
                                        <div class="card-body">
                                            <img src={ pokemon.imagem }></img>
                                        </div>
                                        <div class="card-footer">
                                            R$ { pokemon.preço } cada   
                                        </div>
                                        <div class="card-footer">
                                            <Button type="button" 
                                            onClick={() => tratarCompra(pokemon, 1)}>
                                            <small>Comprar</small>
                                            </Button>
                                            {/* <div class="qty-selector input-group js-qty-selector">
                                                <span class="input-group-btn">
                                                    <button class="btn btn-grey js-qty-selector-minus-search" type="button">-</button>
                                                </span>
                                                <input autocomplete="off" type="text" 
                                                    class="form-control js-qty-selector-input pdpAddtoCartInput" size="1" 
                                                    value="1" data-min="1" name="pdpAddtoCartInput"
                                                    value={quantidade} onChange={e => setQuantidade(e.target.value)}></input>
                                                <span class="input-group-btn">
                                                    <button class="btn btn-grey js-qty-selector-plus-search" type="button">+</button>
                                                </span>
                                                <b><button type="button" onClick={DadosCarrinho.incluir(pokemon, 1)}><small>Comprar</small></button></b>
                                            </div> */}
                                            {/* <p><Button type="button"><small>+</small></Button>
                                            <Input type="text" placeholder="0" value={usuario} onChange={e => setUsuario(e.target.value)}/> 
                                            <Button type="button"><small>-</small></Button></p> */}
                                        </div>
                                    </div>
                                </div>
                            </>
                                )
                            }) 
                        }
                    </div>
                </div>
                <div class="col-md-4" id="carrinho">
                    <div class="card" id="itemCard">
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
            console.log('produto Selecionado', JSON.stringify(produtoSelecionado))
            const compraRealizada = await DadosCarrinho.incluir(produtoSelecionado, 1)
        console.log('totais carrinho na localStorage', localStorage.getItem('TotaisCarrinho'));
            console.log('retorno inclusao', JSON.stringify(compraRealizada))      
            // history.push('/loja');
        } catch (error) {
            console.error('erro ao acessar a função tratarCompra', error)
        }
renderCarrinho()
    }

function renderCarrinho() {
      
        let totais = localStorage.getItem('totaisCarrinho');
        totais = JSON.parse(totais);
        console.log('storage carrinho Json' , totais);

        let carrinho = localStorage.getItem('carrinhoCompra');
        console.log('storage carrinho Json' , carrinho);
        var element = (<> </>)
        if (totais.quantidadeTotal == 0  ){
           element = (
            <> 
{/* INCLUIR bodys conforme as OCORRENCIAS incluidas NO CARRINHO*/}
            <div class="card-header">
                <h5>Carrinho de Compras</h5>
            </div>
            <div class="card-body" id="bodycarrinho">Carrinho Vazio</div>
            <div class="card-footer" id="totalcarrinho">             
                    <p>Total itens: 0</p>  
            </div>   
             </> 
           )}
        else {
        carrinho = JSON.parse(carrinho)
            element = (
            <> 
{/* INCLUIR bodys conforme as OCORRENCIAS incluidas NO CARRINHO*/}
            <div class="card-header">
                <h5>Carrinho de Compras</h5>
            </div>            
            <div class="card-body" id="bodycarrinho">
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
                    <td><img src={ produtos.imagem } width="30%"></img></td>
                    <td>{produtos.nome}</td>
                    <td>R$ {produtos.preço}</td>
                {/* <td><Button type="excluir"><small>x</small></Button></td> */}
                </tr>
               </> )
                }) 
            }
              </table>
 
            </div>

            <div class="card-footer" id="totalcarrinho">
                    TOTAL R$: { totais.valorTotal }                 
                    <p>Total itens: { totais.quantidadeTotal }</p>  
            </div>
            <div class="card-footer" id="finalizarcarrinho">
                <b><Button type="button"><small>FINALIZAR</small></Button></b>
            </div> 
            </> )  
        };
            ReactDOM.render(element, document.getElementById('carrinho'));                
    }
//  setInterval(renderCarrinho, 3000);

function listaCarrinho() { 

}
const { Produto } = require('./produto')

class Carrinho {
  constructor({ quantidadeTotal, valorTotal, Produto}) {
    this.quantidadeTotal = quantidadeTotal;
    this.valorTotal = valorTotal;
    this.produto = Produto;
  }
}
module.exports = Carrinho;


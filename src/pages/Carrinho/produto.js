class Produto {
  constructor({ id, nome, preco, imagem, quantidadeItem }) {
    this.id = id;
    this.nome = nome;
    this.preco = preco;
    this.imagem = imagem;
    this.quantidadeItem = quantidadeItem;
  }
}
module.exports = Produto;

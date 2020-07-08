// const { writeFile, readFile } = require('fs');
// const { promisify } = require('util');
// const [writeFileAsync, readFileAsync] = [
//     promisify(writeFile),
//     promisify(readFile),
// ];

class DadosCarrinho {
    // constructor() {
    //     this.NOME_ARQUIVO = 'heroes.json';
    // }

    async inicializaCarrinho() {
        localStorage.clear('carrinhoCompra');
        localStorage.clear('totaisCarrinho');
        //define Json do carrinho {quantidadeTotal:, valorTotal:, 
        // produtos: [{id: , nome: , preço: , imagem: , quantidade: preçoTotal,  }] }
        const quantidadeTotal = 0;
        const valorTotal = 0;
        const carrinhoVazio = {quantidadeTotal, valorTotal};
        const produtosCarrinho = [0];
//  inclui o carrinho de compra vazio no formato JSON na localstorage
        const totaisCarrinho = JSON.stringify(carrinhoVazio)
        localStorage.setItem('totaisCarrinho', totaisCarrinho);
        localStorage.setItem('carrinhoCompra', produtosCarrinho);
        return true;
    }


    async obterDadosCarrinho() {
        const carrinhoAtual = localStorage.getItem('carrinhoCompra');
        return JSON.parse(carrinhoAtual.toString());
        // return JSON.stringify(carrinhoAtual);
    }

    async obterTotaisCarrinho() {
        const totaisCarrinho = localStorage.getItem('totaisCarrinho');
        return JSON.parse(totaisCarrinho.toString());
        // return JSON.stringify(carrinhoAtual);
    }

    async atualizarCarrinho(carrinho, totais) {
        localStorage.setItem('carrinhoCompra', JSON.stringify(carrinho));
        localStorage.setItem('totaisCarrinho', JSON.stringify(totais));
        const totaisCarrinho = localStorage.getItem('totaisCarrinho');
        return JSON.parse(totaisCarrinho.toString());
    }

    async incluir(produtoNovo, quantidade) {
        // recebe os dados do carrinho atual em formato JSON
        const carrinhoAtual = await this.obterDadosCarrinho();
        const totaisCarrinho = await this.obterTotaisCarrinho();

        //calculo do valor total do produto novo incluído
        const precoTotalProduto = (produtoNovo.preço * quantidade).toFixed(2);
        // calcula valor total do carrinho a partir dos dados recebidos
        var precoTotalItem = parseFloat(precoTotalProduto);
        var valorTotalCarrinho = parseFloat(totaisCarrinho.valorTotal);

        // atualiza informacoes de totais do carrinho para a local storage
        const totalCarrinho= (valorTotalCarrinho + precoTotalItem).toFixed(2);
        const quantidadeItens = totaisCarrinho.quantidadeTotal + quantidade;
        const valorTotalProduto = precoTotalProduto;
        const quantidadeTotal = quantidadeItens;
        const valorTotal = parseFloat(totalCarrinho);
        const totaisCarrinhoAtualizado = {quantidadeTotal, valorTotal};
        //atualiza quantidade e preco do item selecionado e acrescenta no produto do carrinho
        var quantidadeItem = quantidade;
        var precoTotal = parseFloat(valorTotalProduto);
        const produtoCarrinho = {...produtoNovo,quantidadeItem, precoTotal};
        var listaProdutos = []
        if (totaisCarrinho.quantidadeTotal === 0 )  {
             listaProdutos.push(produtoCarrinho)
         }  
         else 
         {
            listaProdutos.push(...carrinhoAtual, produtoCarrinho)
         };

        // const carrinhoCompra = listaProdutos
        // const carrinhoCompraS = JSON.stringify(carrinhoCompra)
        return await this.atualizarCarrinho(listaProdutos, totaisCarrinhoAtualizado);
    }

    async excluir(id) {
      
        const carrinhoAtual = await this.obterDadosCarrinho();
        const totaisCarrinho = await this.obterTotaisCarrinho();

        const indice = carrinhoAtual.findIndex(item => item.id === id);
        if (indice === -1) {
            throw Error('produto nao encontrado!');
        }
        const produtoExcluir = carrinhoAtual[indice];
        const quantidadeItens = totaisCarrinho.quantidadeTotal - produtoExcluir.quantidadeItem;
        const totalCarrinho= totaisCarrinho.valorTotal - produtoExcluir.precoTotal;

        const quantidadeTotal = quantidadeItens;
        const valorTotal = totalCarrinho;
        const totaisCarrinhoAtualizado = {quantidadeTotal, valorTotal};
        carrinhoAtual.splice(indice, 1);

        return await this.atualizarCarrinho(carrinhoAtual, totaisCarrinhoAtualizado);
    }

}

export default  new DadosCarrinho();

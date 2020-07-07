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
        var precoTotal = parseFloat(precoTotalProduto);
        var valorTotalCarrinho = parseFloat(totaisCarrinho.valorTotal);

        // atualiza informacoes de totais do carrinho para a local storage
        const totalCarrinho= valorTotalCarrinho + precoTotal;
        const quantidadeItens = totaisCarrinho.quantidadeTotal + quantidade;
        const valorTotalProduto = precoTotalProduto;
        const quantidadeTotal = quantidadeItens;
        const valorTotal = totalCarrinho;
        const totaisCarrinhoAtualizado = {quantidadeTotal, valorTotal};
        //atualiza quantidade e preco do item selecionado e acrescenta no produto do carrinho
        var quantidadeItem = quantidade;
        var precoTotal = parseFloat(valorTotalProduto);
        const produtoCarrinho = {...produtoNovo,quantidadeItem, precoTotal};
        var listaProdutos = []
        if (totaisCarrinho.quantidadeTotal == 0 )  {
             listaProdutos.push(produtoCarrinho)
         }  
         else 
         {
            listaProdutos.push(...carrinhoAtual, produtoCarrinho)
         };

        const carrinhoCompra = listaProdutos
        const carrinhoCompraS = JSON.stringify(carrinhoCompra)
        return await this.atualizarCarrinho(listaProdutos, totaisCarrinhoAtualizado);
    }

    // async listar(id) {
    //     const dados = await this.obterDadosArquivo();
    //     // se nao passar o id, traz tudo
    //     return dados.filter(item => (id ? item.id == id : true));
    // }

    // async atualizar(id, atualizacoes) {
    //     const dados = await this.obterDadosArquivo();
    //     const indice = dados.findIndex(item => item.id === parseInt(id));
    //     if (indice === -1) {
    //         throw Error('heroi não existe!');
    //     }

    //     const atual = dados[indice];
    //     dados.splice(indice, 1);

    //     //workaround para remover valores undefined do objeto
    //     const objAtualizado = JSON.parse(JSON.stringify(atualizacoes));
    //     const dadoAtualizado = Object.assign({}, atual, objAtualizado);

    //     return await this.escreverArquivo([...dados, dadoAtualizado]);
    // }

    // async remover(id) {
    //     if (!id) {
    //         await this.escreverArquivo([]);
    //         return true;
    //     }

    //     const dados = await this.obterDadosArquivo();

    //     const indice = dados.findIndex(item => item.id === parseInt(id));
    //     if (indice === -1) {
    //         throw Error('heroi não existe!');
    //     }
    //     const atual = dados[indice];
    //     dados.splice(indice, 1);
    //     await this.escreverArquivo(dados);
    //     return true;
    // }
}

module.exports = new DadosCarrinho();
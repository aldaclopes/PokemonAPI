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
        console.log('carrinho vazio', localStorage.getItem('carrinhoCompra'));
        localStorage.clear('totaisCarrinho');
        console.log('carrinho vazio', localStorage.getItem('totaisCarrinho'));
        //define Json do carrinho {quantidadeTotal:, valorTotal:, 
        // produtos: [{id: , nome: , preço: , imagem: , quantidade: preçoTotal,  }] }
        const quantidadeTotal = 0;
        const valorTotal = 0;
        const carrinhoVazio = {quantidadeTotal, valorTotal};
        const produtosCarrinho = [0];
        // const carrinhoJson = [];
        // carrinhoJson.push(carrinhoVazio);
//  inclui o carrinho de compra vazio no formato JSON na localstorage
        const totaisCarrinho = JSON.stringify(carrinhoVazio)
        localStorage.setItem('totaisCarrinho', totaisCarrinho);
        localStorage.setItem('carrinhoCompra', produtosCarrinho);
        console.log('carrinho vazio', carrinhoVazio, totaisCarrinho );
        return true;
    }


    async obterDadosCarrinho() {
        const carrinhoAtual = localStorage.getItem('carrinhoCompra');
        console.log('obter carrinho na localStorage', carrinhoAtual);
        console.log('obter carrinho na localStorage',  localStorage.getItem('carrinhoCompra'));
        return JSON.parse(carrinhoAtual.toString());
        // return JSON.stringify(carrinhoAtual);
    }

    async obterTotaisCarrinho() {
        const totaisCarrinho = localStorage.getItem('totaisCarrinho');
        console.log('obter carrinho na localStorage', totaisCarrinho);
        return JSON.parse(totaisCarrinho.toString());
        // return JSON.stringify(carrinhoAtual);
    }

    async atualizarCarrinho(dados, carrinho) {
        localStorage.setItem('carrinhoCompra', JSON.stringify(dados));
        localStorage.setItem('totaisCarrinho', JSON.stringify(carrinho));
        const totaisCarrinho = localStorage.getItem('totaisCarrinho');
        return JSON.parse(totaisCarrinho.toString());
    }

    async incluir(produtoNovo, quantidade) {
// recebe os dados do carrinho atual em formato JSON
        const carrinhoAtual = await this.obterDadosCarrinho();
        const totaisCarrinho = await this.obterTotaisCarrinho();
        console.log('carrrinhoAtual retorno ', carrinhoAtual )
//transforma o JSON em objeto para leitura e manipulação dos dados
        // const carrinhoAtualS = JSON.parse(carrinhoAtual);
        console.log('carrinhoAtual string', carrinhoAtual )
        console.log('Totais Carrinho quantidadeTotal ', totaisCarrinho.quantidadeTotal )
 //calculo do valor total do produto novo incluído
        console.log('quantidade produto novo ', quantidade )
        console.log('preco produto novo ', produtoNovo.preço )
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
        console.log('valor total produto ', valorTotalProduto );
        console.log('valor total carrinho ', totalCarrinho );
        console.log('quantidade itens carrinho', quantidadeItens );
        console.log('produto carrinho', produtoCarrinho);
        // console.log('produto novo a incluir', produtoIncluir);
        console.log('carrinhoatualizado', carrinhoCompra);
        console.log('carrinho parse', carrinhoCompraS);

        // return await this.atualizarCarrinho([carrinhoNovo]);
        // localStorage.clear('carrinhoCompra');
        localStorage.setItem('carrinhoCompra', JSON.stringify(listaProdutos));
        localStorage.setItem('TotaisCarrinho', JSON.stringify(totaisCarrinhoAtualizado));
        console.log('obter carrinho na localStorage', localStorage.getItem('carrinhoCompra'));
        console.log('totais carrinho na localStorage', localStorage.getItem('totaisCarrinho'));
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
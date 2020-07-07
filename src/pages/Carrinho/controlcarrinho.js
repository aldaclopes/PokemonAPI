const Commander = require('commander')
const DadosCarrinho = require('./dadoscarrinho')
const Carrinho = require('./carrinho')

async function main() {
    Commander.version('v1')
        .option('-n, --nome [value]', 'adicionar nome')
        .option('-p, --poder [value]', 'adicionar poder')
        //CRUD
        .option('-c, --cadastrar', 'cadastrar Heroi')
        .option('-r, --listar [value]', 'listar herois pelo id')
        .option('-u, --atualizar [value]', 'atualizar heroi pelo id')
        .option('-d, --remover [value]', 'remover heroi pelo id')
        .parse(process.argv);
    const heroi = new Heroi(Commander)
    try {
        if (Commander.cadastrar) {
            delete heroi.id
            console.log(Commander, "encontrou")
            const resultado = await database.cadastrar(heroi)
            if (!resultado) {
                console.error('Heroi não foi cadastrado!')
                return;
            }
            console.log('Heroi cadastrado com sucesso!')
        }
        if (Commander.listar) {
            const resultado = await database.listar();
            console.log(resultado);
            return;
        }

        if (Commander.atualizar) {
            const id = Commander.atualizar;
            console.log('id', id);
            await database.atualizar(id, heroi);
            console.log('item atualizado com sucesso!');
            return;
        }

        if (Commander.remover) {
            const id = Commander.remover;
            const resultado = await database.remover(id);
            if (!resultado) {
                console.error('Não foi possível remover o heroi!', error)
                return;
            }
            console.log("Heroi removido com sucesso")
        }
    } catch (error) {
        console.error('deu ruim', error)
    }
}

main()
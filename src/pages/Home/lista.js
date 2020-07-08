const axios = require('axios');
const URL = 'https://pokeapi.co/api/v2/pokemon'
// https://pokeapi.co/api/v2/pokemon?offset=20&limit=20
let inicio = 0
let limite = 20
async function listarPokemon(inicio, limite) {
    const url = `${URL}?offset=${inicio}&limit=${limite}`
    const response = await axios.get(url)
    // console.log('url lista ', url)
    return response.data
}

listarPokemon(inicio, limite)
    .then(function(resultado) {
        console.log('retorno listarPokemon', resultado)
    })
    .catch(function(error) {
        console.error('Erro ao listar Pokemon', error)
    })
// module.exports = {listarPokemon}
export default listarPokemon

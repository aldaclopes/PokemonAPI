const axios = require('axios');
const URL = 'https://pokeapi.co/api/v2/pokemon';
let busca='';
async function consultarPokemon(busca) {
    console.log(busca,  'entrou na consulta')
    const url = `${URL}/${busca}`
    console.log('url consulta ', url)
    const response = await axios.get(url)
    return response.data
}

consultarPokemon(busca)
    .then(function(resultado) {
        console.log('resultado', resultado)
    })
    .catch(function(error) {
        console.error('DEU RUIM', error)
    })
    //transformar o arquivo retornado em um modulo

module.exports = {consultarPokemon}
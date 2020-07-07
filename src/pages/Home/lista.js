const axios = require('axios');
const URL = 'https://pokeapi.co/api/v2/pokemon'
// https://pokeapi.co/api/v2/pokemon?offset=20&limit=20
async function listarPokemon(inicio, limite) {
    const url = `${URL}?offset=${inicio}&limit=${limite}`
    const response = await axios.get(URL)
    console.log('url lista ', url)
    return response.data
}

listarPokemon()
    .then(function(resultado) {
        console.log('resultado', resultado)
    })
    .catch(function(error) {
        console.error('DEU RUIM', error)
    })
    //transformar o arquivo retornado em um modulo
module.exports = {listarPokemon}

//{"count":964,"next":"https://pokeapi.co/api/v2/pokemon?offset=20&limit=20","previous":null,"results":
//{
//   "count": 964,
//   "next": "https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20",
//   "previous": null,
//   "results": [
//     {
//       "name": "bulbasaur",
//       "url": "https://pokeapi.co/api/v2/pokemon/1/"
//     },
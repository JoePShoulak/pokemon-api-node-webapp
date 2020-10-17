import axios from "axios"

export const GetPokemonList = (page) => async dispatch => {
    try {
        dispatch({
            type: "POKEMON_LIST_LOADING"
        })

        const perPage = 15; // add perPage control for user
        const offset = (page - 1) * perPage;

        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${perPage}&offset=${offset}`)

        dispatch({
            type: "POKEMON_LIST_SUCCESS",
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: "POKEMON_LIST_FAIL"
        })
    }
}

export const GetPokemon = (pokemon) => async dispatch => {
    try {
        dispatch({
            type: "POKEMON_MULTIPLE_LOADING"
        })

        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

        dispatch({
            type: "POKEMON_MULTIPLE_SUCCESS",
            payload: res.data,
            pokemonName: pokemon
        })
    } catch (e) {
        dispatch({
            type: "POKEMON_MULTIPLE_FAIL"
        })
    }
}
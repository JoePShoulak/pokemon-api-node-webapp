const DefaultState = {
    loading: false,
    data: [],
    errorMsg: ""
}

export const PokemonListReducer = (state = DefaultState, action) => {
    switch (action.type) {
        case "POKEMON_LIST_LOADING":
            return {
                ...state,
                loading: true,
                errorMsg: ""
            };

        case "POKEMON_LIST_FAIL":
            return {
                ...state,
                loading: false,
                errorMsg: "unable to get pokemon"
            };

        case "POKEMON_LIST_SUCCESS":
            return {
                ...state,
                loading: false,
                errorMsg: "",
                data: action.payload
            };

        default:
            return state
    }
}
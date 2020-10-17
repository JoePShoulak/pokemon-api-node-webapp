
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {GetPokemon} from "../actions/pokemonActions";
import _ from "lodash";

const Pokemon = (props) => {
    console.log(props.match);
    const pokemonName = props.match.params.pokemon;
    const dispatch = useDispatch();
    const pokemonState = useSelector(state => state.Pokemon);
    React.useEffect(() => {
        dispatch(GetPokemon(pokemonName))
    }, []);

    const ShowData = () => {
        if (!_.isEmpty(pokemonState.data[pokemonName])) {
            const pokeData = pokemonState.data[pokemonName]

            return (
                <div className={"pokemon-wrapper"}>
                    <div className={"item"}>
                        <h2>Sprites</h2>
                        <img src={pokeData.sprites.front_default} alt={""}/>
                        <img src={pokeData.sprites.back_default} alt={""}/>
                        <img src={pokeData.sprites.front_shiny} alt={""}/>
                        <img src={pokeData.sprites.front_shiny} alt={""}/>
                    </div>

                    <div className={"item"}>
                        <h2>Stats</h2>
                        {pokeData.stats.map(el => {
                            return(
                                <p>{el.stat.name}: {el.base_stat}</p>
                            )
                        })}
                    </div>

                    <div className={"item"}>
                        <h2>Abilities</h2>
                        {pokeData.abilities.map(el => {

                            return(
                                <p>{el.ability.name}</p>
                            )
                        })}
                    </div>
                </div>
            )
        }

        if (pokemonState.loading) {
            return <p>Loading...</p>
        }

        if (pokemonState.errorMsg !== "" ) {
            return <p>{pokemonState.errorMsg}</p>
        }

        return <p>Something weird happened </p>
    }


    return(
        <div className={"poke"}>
            <h1>{_.capitalize(pokemonName)}</h1>
            {ShowData()}
        </div>
    )
};

export default Pokemon
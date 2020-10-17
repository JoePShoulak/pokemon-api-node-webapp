import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {GetPokemonList} from "../actions/pokemonActions";
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate"

const PokemonList = (props) => {
    const [search, setSearch] = useState("");
    const dispatch = useDispatch();
    const pokemonList = useSelector(state => state.PokemonList)
    React.useEffect( () => {
        FetchData(1)
    }, []);

    const FetchData = (page= 1) => {
        dispatch(GetPokemonList(page))
    }

    if (pokemonList.loading) {
        return <p>Loading...</p>
    }

    const ShowData = () => {
      if (!_.isEmpty(pokemonList.data)) {
          return(
              <div className={"list-wrapper"}>
                  {pokemonList.data.map(mon => {
                      return(
                          <div className={"pokemon-item"}>
                              <p>{_.capitalize(mon.name)}</p>
                              <Link to={`/pokemon/${mon.name}`}>View</Link>
                          </div>
                      )
                  })}
              </div>
          )
      }

      if (pokemonList.errorMsg !== "") {
          return <p>{pokemonList.errorMsg}</p>
      }

      return <p>unable to get data</p>
    };

    return(
        <div>
            <div className={"search-wrapper"}>
                <p>Search: </p>
                <input type={"text"} onChange={e => setSearch(e.target.value)}/>
                <button onClick={() => props.history.push(`/pokemon/${search}`)}>Search</button>
            </div>
            {ShowData()};
            {!_.isEmpty(pokemonList.data) && (
                <ReactPaginate
                pageCount={Math.ceil(pokemonList.count / 15)} // TODO: remove this hard-code
                pageRangeDisplay={2}
                marginPagesDisplayed={1}
                onPageChange={(data) => FetchData(data.selected + 1)}
                />
            )}
            </div>
    )
};

export default PokemonList
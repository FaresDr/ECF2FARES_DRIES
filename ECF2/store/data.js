import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchPoke = createAsyncThunk("pokemon/fetchPoke", async () => {

    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10")
    
    const data = await response.data;

    console.log(data.results);
    return data.results

});

export const fetchPokeOne = createAsyncThunk("pokemon/fetchPokeOne", async (name) => {
  if(name =!""){

  const response = await axios.get("https://pokeapi.co/api/v2/pokemon/"+ name)
  }else{
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=10")
  }
  
  const data = await response.data;

  
  return data.results

});
export const fetchPokeEvolutionChain = createAsyncThunk("pokemon/fetchPokeEvolutionChain", async (url) => {
 

  const response = await axios.get(url)
  
  
  const data = await response.data;
console.log('toto');
 
  return data

});
export const fetchPokeEvolution = createAsyncThunk("pokemon/fetchPokeEvolution", async (url) => {
  

  const response = await axios.get(url)
  
  
  const data = await response.data;

  
  return data

});

export const fetchPokebyID = createAsyncThunk("pokemon/fetchPokebyID", async (url) => {

    const response = await axios.get(url)
    
    const data = await response.data;
    console.log(data);
  
    return data

});
export const fetchPokebyName = createAsyncThunk("pokemon/fetchPokebyName", async (name) => {

    const response = await axios.get("https://pokeapi.co/api/v2/pokemon/"+name)
    
    const data = await response.data;

  
    return data

});

const pokeSlice = createSlice({
    name: "pokemon",
    initialState: {
      pokemons: [],
      poke : [],
      evolutionDetails :[],
      evolutionChain:[],
      isLoading: false,
      pokedex: [],
   
    },
    reducers: {
      addPoke: (state, action) => {
        const poke = action.payload
        console.log(poke);
        state.pokedex.push(poke);  },
    clearPokedex: (state) => {
      state.pokedex = [];
    },},
    /*
      .fullfilled => L'action se déclenche si la requête se termine
      .rejected => L'action se déclenche si la requête echoue
      .pending => l'action se déclenche pendant la requête
    */
    extraReducers: (builder) => {
      builder.addCase(fetchPoke.fulfilled, (state, action) => {
        state.pokemons = action.payload;
        
      });
     
   
      builder.addCase(fetchPoke.pending, (state, action) => {
        state.isLoading = true;
      });
      builder.addCase(fetchPokebyID.fulfilled, (state, action) => {
        state.poke = action.payload;   
      });
      builder.addCase(fetchPokeOne.fulfilled, (state, action) => {
        state.pokemons = action.payload;   
      });
      builder.addCase(fetchPokeEvolution.fulfilled, (state, action) => {
        
        state.evolutionDetails = action.payload;
        
      });
      builder.addCase(fetchPokebyName.fulfilled, (state, action) => {
        
        state.poke = action.payload;
        
      });
      builder.addCase(fetchPokeEvolutionChain.fulfilled, (state, action) => {
        
        state.evolutionChain = action.payload;
        
      });
    
    },
  });
  export const addPoke = pokeSlice.actions.addPoke;
  export const clearPokedex = pokeSlice.actions.clearPokedex;
  export default pokeSlice.reducer;
  
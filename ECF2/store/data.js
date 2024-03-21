import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchPoke = createAsyncThunk("pokemon/fetchPoke", async () => {

    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=151")
    
    const data = await response.data;


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


 
  return data.evolution_chain.url

});
export const fetchPokeEvolution = createAsyncThunk("pokemon/fetchPokeEvolution", async (url) => {
  

  const response = await axios.get(url)
  
  
  const data = await response.data;
  
  
  return data

});

export const fetchPokebyID = createAsyncThunk("pokemon/fetchPokebyID", async (url) => {

    const response = await axios.get(url)
    
    const data = await response.data;
    
    
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
      evolutionChain:"",
      pokeEvolution : [],
      isLoading: false,
      pokedex: [],
   
    },
    reducers: {
      addPoke: (state, action) => {
        const poke = action.payload
      
        state.pokedex.push(poke);  },
    clearPokedex: (state) => {
      state.pokedex = [];
    },
    clearEvolution: (state) => {
      state.pokeEvolution = [];
     
        state.evolutionChain= ""
    },
    addEvolution: (state, action) => {            
      const poke = action.payload     
      state.pokeEvolution.push(poke)
      state.evolutionDetails=[]

     
    
    }
  },
    /*
      .fullfilled => L'action se déclenche si la requête se termine
      .rejected => L'action se déclenche si la requête echoue
      .pending => l'action se déclenche pendant la requête
    */
    extraReducers: (builder) => {
      builder.addCase(fetchPoke.fulfilled, (state, action) => {
        state.pokemons = action.payload;
        state.isLoading = true
        state.evolutionChain= ""
      });
     
   
      builder.addCase(fetchPoke.pending, (state, action) => {
        state.isLoading = true;
        state.evolutionChain= ""
      });
      builder.addCase(fetchPokeEvolutionChain.pending, (state, action) => {
        state.evolutionChain= ""
        state.isLoading = true;
      });
      builder.addCase(fetchPokebyID.fulfilled, (state, action) => {
        state.poke = action.payload;   
        state.pokeEvolution=[]
      });
      builder.addCase(fetchPokeOne.fulfilled, (state, action) => {
        state.pokemons = action.payload;   
      });
      builder.addCase(fetchPokeEvolution.fulfilled, (state, action) => {
        state.pokeEvolution= []
        state.evolutionChain= ""
        state.evolutionDetails = action.payload;
        
        
      });
      builder.addCase(fetchPokebyName.fulfilled, (state, action) => {
        
        state.poke = action.payload;
        
      });
      builder.addCase(fetchPokeEvolutionChain.fulfilled, (state, action) => {
        
        state.evolutionChain = action.payload;
        state.isLoading = false;
        
      });
    
    },
  });
  export const addPoke = pokeSlice.actions.addPoke;
  export const clearPokedex = pokeSlice.actions.clearPokedex;
  export const addEvolution = pokeSlice.actions.addEvolution;
  export const clearEvolution = pokeSlice.actions.clearEvolution;
  export default pokeSlice.reducer;
  
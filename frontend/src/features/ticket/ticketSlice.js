import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ticketService from "./ticketService";

const ticketSlice = createSlice({
    name : 'ticket',
    initialState : {
        tickets : [],
        ticket :{},
        isLoading : false,
        isError : false,
        isSuccess : false,
        message : "",
    },
    reducers : {},
    extraReducers : (builder) =>{
       builder
       .addCase(raiseTicket.pending,(state,action)=>{
         state.isLoading = true;
         state.isError = false;
         state.isSuccess = false;
         state.message = "";
       })
       .addCase(raiseTicket.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.ticket = action.payload;
      })
      .addCase(raiseTicket.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        state.ticket = null;
      })

      .addCase(getTickets.pending,(state,action)=>{
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(getTickets.fulfilled,(state,action)=>{
       state.isLoading = false;
       state.isError = false;
       state.isSuccess = true;
       state.message = "";
       state.tickets = action.payload;
     })
     .addCase(getTickets.rejected,(state,action)=>{
       state.isLoading = false;
       state.isError = true;
       state.isSuccess = false;
       state.message = action.payload;
       state.ticket = null;
     })

     .addCase(getTicket.pending,(state,action)=>{
       state.isLoading = true;
       state.isError = false;
       state.isSuccess = false;
       state.message = "";
     })
     .addCase(getTicket.fulfilled,(state,action)=>{
       state.isLoading = false;
       state.isError = false;
       state.isSuccess = true;
       state.message = "";
       state.ticket = action.payload;
     })
      .addCase(getTicket.rejected,(state,action)=>{
       state.isLoading = false;
       state.isError = true;
       state.isSuccess = false;
       state.message = action.payload;
       state.ticket = null;
     })
 
     .addCase(getAllUsersTickets.pending,(state,action)=>{
       state.isLoading = true;
       state.isError = false;
       state.isSuccess = false;
       state.message = "";
     })
     .addCase(getAllUsersTickets.fulfilled,(state,action)=>{
       state.isLoading = false;
       state.isError = false;
       state.isSuccess = true;
       state.tickets = action.payload;
     })
     .addCase(getAllUsersTickets.rejected,(state,action)=>{
       state.isLoading = false;
       state.isError = true;
       state.isSuccess = false;
       state.message = action.payload;
       state.ticket = null;
     })
   }
});

export default ticketSlice.reducer;

// Raise Ticket

export const raiseTicket = createAsyncThunk("RAISE/TICKET",async(formData,thunkAPI)=>{
    let token = thunkAPI.getState().auth.user.token;
   try {
    return await ticketService.addTicket(formData,token);
   } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
   }
});


// Get All Tickets

export const getTickets = createAsyncThunk("FETCH/TICKETS",async(_,thunkAPI)=>{
  let token = thunkAPI.getState().auth.user.token;

 try {
  return await ticketService.fetchTickets(token);
 } catch (error) {
  const message = error.response.data.message;
  return thunkAPI.rejectWithValue(message);
 }
});


// Get Single Ticket

export const getTicket = createAsyncThunk("FETCH/TICKET",async(id,thunkAPI)=>{  // same name nhi hoga FETCH ealw
 console.log(id);
  let token = thunkAPI.getState().auth.user.token;

 try {
  return await ticketService.fetchTicket(id,token);
 } catch (error) {
  const message = error.response.data.message;
  return thunkAPI.rejectWithValue(message);
 }
});

// Admin get all Users Tickets

export const getAllUsersTickets = createAsyncThunk("ADMIN/FETCH/TICKETS",async(_, thunkAPI)=>{  // same name nhi hoga FETCH ealw
  
  let token = thunkAPI.getState().auth.user.token;

 try {
  return await ticketService.fetchAllUsersTickets(token);
 } catch (error) {
  const message = error.response.data.message;
  return thunkAPI.rejectWithValue(message);
 }
});

// export const closeTicket = createAsyncThunk("CLOSE/TICKET",async()=>{
//    await 
// })
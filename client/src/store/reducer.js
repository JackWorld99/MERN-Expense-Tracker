import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    categories: [],
    transactions: []
}

export const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers : {
        getTransactions: (state) => {}
    }
})

export const {getTranscations} = expenseSlice.actions;
export default expenseSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import { CatagoriesObject } from './dataEditor';

interface DataEditorState {
  data: CatagoriesObject;
}

// Define the initial state using that type
const initialState: DataEditorState = {
  data: {
    heritage: { },
    culture: { },
    background: { },
    destiny: { },
    class: { },
    abilities: { },
    equipment: { },
    spells: { },
}
}

export const dataEditorSlice = createSlice({
  name: 'dataEditor',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    add: (state, action ) => {
      state = {...state.data, ...action.payload}
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
  },
})

export const { add } = dataEditorSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectJson = (state: RootState) => state.dataEditor.data;

export default dataEditorSlice.reducer
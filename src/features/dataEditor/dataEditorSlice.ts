import { createSlice } from "@reduxjs/toolkit";
import type { CatagoriesObject } from "./dataEditorTypes";

interface DataEditorState {
  data: CatagoriesObject;
  selected: keyof CatagoriesObject | "all";
}
// Define the initial state using that type
const initialState: DataEditorState = {
  data: {
    heritage: {},
    culture: {},
    background: {},
    destiny: {},
    class: {},
    abilities: {},
    equipment: {},
    spells: {},
  },
  selected: "all",
};

export const dataEditorSlice = createSlice({
  name: "dataEditor",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    add: (state, action) => {
      state = { ...state, data: { ...state.data, ...action.payload } };
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    selectedCatagory: (state, action) => {
      const selected = action.payload.toLowerCase();
      return {
        ...state,
        selected: selected as keyof CatagoriesObject,
      };
    },
  },

  selectors: {
    selectJson: obj =>
      obj.selected === "all" ? obj.data : obj.data[obj.selected],
  },
});

export const { add, selectedCatagory } = dataEditorSlice.actions;

// Other code such as selectors can use the imported `RootState` type
//export const selectJson = (state: RootState) => state.dataEditor.data
export const { selectJson } = dataEditorSlice.selectors;

export default dataEditorSlice.reducer;

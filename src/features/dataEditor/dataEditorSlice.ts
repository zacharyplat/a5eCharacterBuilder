import { createSlice } from "@reduxjs/toolkit";
import type { CatagoriesObject } from "./dataEditorTypes";

interface DataEditorState {
  data: CatagoriesObject;
  selected: keyof CatagoriesObject | "all";
  currentAttribute: string;
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
  currentAttribute: "",
};

export const dataEditorSlice = createSlice({
  name: "dataEditor",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    add: (state, action) => {
      console.log("Adding", action.payload);
      state = { ...state, data: { ...state.data, ...action.payload } };
      return state;
    },

    // Use the PayloadAction type to declare the contents of `action.payload`
    updateCurrentAttribute: (state, action) => {
      const attribute = action.payload.toLowerCase();
      return {
        ...state,
        currentAttribute: attribute,
      };
    },
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
    selected: obj => obj.selected,
    currentAttribute: obj => obj.currentAttribute,

    currAttrSelected: obj => {
      const { selected, currentAttribute, data } = obj;
      console.log(
        `Selected: ${selected}, Current: ${currentAttribute}, Data: ${data}`,
      );
      return selected !== "all" ? data[selected][currentAttribute] : [];
    },
  },
});

export const { add, selectedCatagory, updateCurrentAttribute } =
  dataEditorSlice.actions;

// Other code such as selectors can use the imported `RootState` type
//export const selectJson = (state: RootState) => state.dataEditor.data
export const { selectJson, selected, currentAttribute, currAttrSelected } =
  dataEditorSlice.selectors;

export default dataEditorSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { CatagoriesObject } from "./dataEditorTypes";

interface DataEditorState {
  data: CatagoriesObject;
  selected: keyof CatagoriesObject | "all";
  currentAffix: string;
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
  currentAffix: "",
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
    updateCurrentAffix: (state, action) => {
      const affix = action.payload.toLowerCase();
      return {
        ...state,
        currentAffix: affix,
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
    currentAffix: obj => obj.currentAffix,

    currAffixSelected: obj => {
      const { selected, currentAffix, data } = obj;
      console.log(
        `Selected: ${selected}, Current: ${currentAffix}, Data: ${data}`,
      );
      return selected !== "all" ? data[selected][currentAffix] : [];
    },
  },
});

export const { add, selectedCatagory, updateCurrentAffix } =
  dataEditorSlice.actions;

// Other code such as selectors can use the imported `RootState` type
//export const selectJson = (state: RootState) => state.dataEditor.data
export const { selectJson, selected, currentAffix, currAffixSelected } =
  dataEditorSlice.selectors;

export default dataEditorSlice.reducer;

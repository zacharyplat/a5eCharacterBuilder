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
      if (state.selected === "all" || !state.data[state.selected]) return;
      state = { ...state, data: { ...state.data, ...action.payload } };
      return state;
    },
    addToAffix: (state, action) => {
      // payload is an array, may be only one element
      action.payload.forEach((val: { name: string; description: string }) => {
        // A little bit weird but typescript is not happy if we pull this if statement out
        // doesn't see that we are guarded against the wrong type
        if (state.selected === "all" || !state.data[state.selected]) return;
        !state.data[state.selected][state.currentAffix] &&
          (state.data[state.selected][state.currentAffix] = []);
        state.data[state.selected][state.currentAffix].push(val);
      });
      return state;
    },
    deleteAffixAtIndex: (state, action) => {
      if (state.selected === "all" || !state.data[state.selected]) return;
      state.data[state.selected][state.currentAffix].splice(action.payload, 1);
      return state;
    },

    annotateAffix: (state, action) => {
      const { data, selected, currentAffix } = state;
      const { index, val } = action.payload;
      if (selected === "all" || !data[selected]) return;
      let affix = data[selected][currentAffix][index];
      data[selected][currentAffix][index] = { ...affix, ...val };
      console.log(`state: ${state}`);
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
      return selected !== "all" ? data[selected][currentAffix] : [];
    },
  },
});

export const {
  add,
  addToAffix,
  deleteAffixAtIndex,
  annotateAffix,
  selectedCatagory,
  updateCurrentAffix,
} = dataEditorSlice.actions;

// Other code such as selectors can use the imported `RootState` type
//export const selectJson = (state: RootState) => state.dataEditor.data
export const { selectJson, selected, currentAffix, currAffixSelected } =
  dataEditorSlice.selectors;

export default dataEditorSlice.reducer;

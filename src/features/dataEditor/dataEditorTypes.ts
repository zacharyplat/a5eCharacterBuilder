type Affix = {
  name: string;
  description: string;
  granted?: string[];
  choices?: string[];
};

export type stats = {
  age?: Affix;
  speed?: Affix;
  size?: Affix;
  skills?: Affix[];
  proficiencies?: Affix[];
  languages?: Affix[];
  traits?: Affix[];
  gifts?: Affix[];
  equipment?: Affix[];
  spells?: Affix[];
  hp?: number;
  ac?: number;
};
export type Attributes = {
  title: string;
  description: string;
};
export type Catagory = { [key: string]: Attributes[] };

export type CatagoriesObject = {
  heritage: Catagory;
  culture: Catagory;
  background: Catagory;
  destiny: Catagory;
  class: Catagory;
  abilities: Catagory;
  equipment: Catagory;
  spells: Catagory;
};

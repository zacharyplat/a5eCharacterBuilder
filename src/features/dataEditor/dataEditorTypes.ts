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
  granted?: Affix[];
};
export type CatagoriesObject = {
  heritage: { [key: string]: Attributes };
  culture: { [key: string]: Attributes };
  background: { [key: string]: Attributes };
  destiny: { [key: string]: Attributes };
  class: { [key: string]: Attributes };
  abilities: { [key: string]: Attributes };
  equipment: { [key: string]: Attributes };
  spells: { [key: string]: Attributes };
};

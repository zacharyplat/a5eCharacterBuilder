
type Affix = {
    name: string,
    description: string,
    value?: string
};
export type Attributes = {

    age?: Affix,
    speed?: Affix,
    size?: Affix,
    traits?: Affix[],
    proficiencies?: Affix[],
    equipment?: Affix[],
    spells?: Affix[],
    hp?: number,
    ac?: number,
    skills?: Affix[]
}
export type CatagoriesObject = {
    heritage: Attributes,
    culture: Attributes,
    background: Attributes,
    destiny: Attributes,
    class: Attributes,
    abilities: Attributes,
    equipment: Attributes,
    spells: Attributes
};
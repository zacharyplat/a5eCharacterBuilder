import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import type { color } from "@material-tailwind/react/types/components/button";
import { JsonEditor } from "json-edit-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addToAffix,
  annotateAffix,
  currAffixSelected,
  currentAffix,
  deleteAffixAtIndex,
  selected,
  selectedCatagory,
  selectJson,
  updateCurrentAffix,
} from "./dataEditorSlice";
import type { Affix } from "./dataEditorTypes";
import { SimpleDialog } from "./Dialog";

enum Catagories {
  HERITAGE,
  CULTURE,
  BACKGROUND,
  DESTINY,
  CLASS,
  ABILITIES,
  EQUIPMENT,
  SPELLS,
}

const toTitleCase = (str: string) => {
  return str && str[0].toUpperCase() + str.slice(1).toLowerCase();
};

export const DataEditor = () => {
  return (
    <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
      <KeyValueEditor />
      <JsonViewer />
    </div>
  );
};

const getCatagoryStrings = () => {
  const enumWithNumbers = Object.keys(Catagories) as Array<
    keyof typeof Catagories
  >;
  const allCapsStrings = enumWithNumbers.filter(val => isNaN(Number(val)));
  return allCapsStrings.map(toTitleCase);
};

const KeyValueEditor = () => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(state => state.dataEditor.selected);

  const catagoryStrings = getCatagoryStrings();

  const handleCatagoryChange = (evt: string | undefined) => {
    dispatch(selectedCatagory(evt));
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Enter new details
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Catagory to automatically parse
      </Typography>
      <div className="w-72">
        <Select
          value={toTitleCase(selected)}
          label="Catagory"
          onChange={handleCatagoryChange}
        >
          {catagoryStrings.map(catagory => (
            <Option key={catagory} value={catagory}>
              {catagory}
            </Option>
          ))}
        </Select>
      </div>
      <ValueParser />
    </Card>
  );
};

type affixAnnotations = Pick<Affix, "granted" | "choices">;
const ValueParser = () => {
  const dispatch = useAppDispatch();
  //const selectedCatagory = useAppSelector(selected);
  const currAffix = useAppSelector(currentAffix);
  const currentAffixSelected = useAppSelector(currAffixSelected);
  const [textBox, setTextBox] = useState<string>("");

  const handleParsing = () => {
    const lines = textBox.split("\n\n");
    const affixes = lines.map(val => {
      const sentences = val.trim().split(".");
      const name = sentences.shift() || "";
      const description = sentences.join(".");
      return { name, description };
    });
    dispatch(addToAffix(affixes));
  };
  const handleDelete = (index: number) => {
    dispatch(deleteAffixAtIndex(index));
  };

  return (
    <>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Title and paragraph to parse
          </Typography>
          <Input
            size="lg"
            placeholder="Title"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            value={toTitleCase(currAffix)}
            onChange={evt => dispatch(updateCurrentAffix(evt.target.value))}
          />
          <Textarea
            label="Text to import"
            value={textBox}
            onChange={evt => setTextBox(evt.target.value)}
          />
        </div>
        <Button className="mt-6" fullWidth onClick={handleParsing}>
          Add new details
        </Button>
      </form>
      {currentAffixSelected?.map((val, index) => (
        <ParsedItems
          key={val.name}
          name={val.name}
          description={val.description}
          deleteItem={() => handleDelete(index)}
          annotateAffix={(val: affixAnnotations) =>
            dispatch(annotateAffix({ index, val }))
          }
        />
      ))}
    </>
  );
};

type ParsedItemsProps = {
  name: string;
  description: string;
  deleteItem: () => void;
  annotateAffix: (val: affixAnnotations) => void;
};
const ParsedItems = (props: ParsedItemsProps) => {
  const { name, description, deleteItem, annotateAffix } = props;

  const buttonLeft = {
    text: "Grant",
    color: "blue" as color,
    onClick: () => annotateAffix({ granted: ["window.getSelection()"] }),
  };

  const buttonRight = {
    text: "Choice",
    onClick: () => annotateAffix({ choices: ["window.getSelection()"] }),
  };
  return (
    <Card className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {name}
        </Typography>
        <Typography variant="small">{description}</Typography>
      </CardBody>
      <span
        onClick={deleteItem}
        className="absolute rounded-full py-1 px-1 text-xs font-medium content-[''] leading-none grid place-items-center top-[4%] right-[2%] translate-x-2/4 -translate-y-2/4 bg-red-500 text-white min-w-[24px] min-h-[24px]"
      >
        -
      </span>
      <CardFooter className="pt-0">
        <SimpleDialog
          cta={"Annotate"}
          body={description}
          header={name}
          buttonLeft={buttonLeft}
          buttonRight={buttonRight}
        />
      </CardFooter>
    </Card>
  );
};

const JsonViewer = () => {
  const json = useAppSelector(selectJson);
  const root = useAppSelector(selected);
  return (
    <JsonEditor data={json} rootName={root} rootFontSize={14} collapse={2} />
  );
};

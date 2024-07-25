import {
  Button,
  Card,
  CardBody,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { JsonEditor } from "json-edit-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  add,
  currAttrSelected,
  currentAttribute,
  selected,
  selectedCatagory,
  selectJson,
  updateCurrentAttribute,
} from "./dataEditorSlice";

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

type ParserProps = {
  name: string;
  description: string;
};
const ValueParser = () => {
  const dispatch = useAppDispatch();
  const selectedCatagory = useAppSelector(selected);
  const currAttr = useAppSelector(currentAttribute);
  const currentAttributeSelected = useAppSelector(currAttrSelected);
  const [textBox, setTextBox] = useState<string>("");
  const [parsed, setParsed] = useState<any>([]);

  const handleParsing = () => {
    const attribute = currAttr?.toLowerCase();
    const lines = textBox.split("\n\n");
    const affixes = lines.map(val => {
      const sentences = val.trim().split(".");
      const name = sentences.shift() || "";
      const description = sentences.join(".");
      return { name, description };
    });
    setParsed(affixes);
    dispatch(add({ [selectedCatagory]: { [attribute]: affixes } }));
  };
  console.log(currentAttributeSelected);

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
            value={toTitleCase(currAttr)}
            onChange={evt => dispatch(updateCurrentAttribute(evt.target.value))}
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
      {parsed.map((val: ParserProps) => (
        <ParsedItems
          key={val.name}
          name={val.name}
          description={val.description}
        />
      ))}
    </>
  );
};
const ParsedItems = (props: ParserProps) => {
  const { name, description } = props;
  return (
    <Card className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {name}
        </Typography>
        <Typography variant="small">{description}</Typography>
      </CardBody>
    </Card>
  );
};

const JsonViewer = () => {
  const json = useAppSelector(selectJson);
  const root = useAppSelector(selected);
  return <JsonEditor data={json} rootName={root} />;
};

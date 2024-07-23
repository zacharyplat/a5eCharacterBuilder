import {
  Button,
  Card,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { JsonEditor } from "json-edit-react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectedCatagory, selectJson } from "./dataEditorSlice";

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

export const DataEditor = () => {
  return (
    <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
      <KeyValueEditor />
      <JsonViewer />
    </div>
  );
};

const KeyValueEditor = () => {
  const dispatch = useAppDispatch();
  const globalCat = useAppSelector(state => state.dataEditor.selected);

  const [title, setTitle] = useState<string>("");
  const [textBox, setTextBox] = useState<string>("");

  const enumWithNumbers = Object.keys(Catagories) as Array<
    keyof typeof Catagories
  >;
  const allCapsStrings = enumWithNumbers.filter(val => isNaN(Number(val)));
  const catagoryStrings = allCapsStrings.map(
    str => str[0] + str.slice(1).toLowerCase(),
  );
  const handleCatagoryChange = (evt: string | undefined) => {
    dispatch(selectedCatagory(evt));
  };

  const selectedHelper = () => globalCat[0].toUpperCase() + globalCat.slice(1);

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
          value={selectedHelper()}
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
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Title and paragraph to parse
          </Typography>
          <Input
            size="lg"
            placeholder="Title"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            value={title}
            onChange={evt => setTitle(evt.target.value)}
          />
          <Textarea
            label="Text to import"
            value={textBox}
            onChange={evt => setTextBox(evt.target.value)}
          />
        </div>
        <Button className="mt-6" fullWidth onClick={console.log}>
          Add new details
        </Button>
      </form>
    </Card>
  );
};

const JsonViewer = () => {
  const json = useAppSelector(selectJson);
  const root = useAppSelector(state => state.dataEditor.selected);
  return <JsonEditor data={json} rootName={root} />;
};

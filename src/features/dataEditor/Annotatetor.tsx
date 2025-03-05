import type { color } from "@material-tailwind/react/types/components/button";
import type { affixAnnotations } from "./DataEditor";
import type { Affix, anotation } from "./dataEditorTypes";
import { SimpleDialog } from "./Dialog";
import { Highlighter } from "./Highlighter";

type ParsedItemsProps = {
  affix: Affix;
  annotateAffix: (val: affixAnnotations) => void;
};
export const Annotatetor = (props: ParsedItemsProps) => {
  const { affix, annotateAffix } = props;
  const { name, description, granted, choices } = affix;

  const tryToAnnotate = (key: "granted" | "choices") => {
    const indecies = getSelectedTextIndecies();
    if (indecies[0] === indecies[1]) return;
    console.log(`granted: ${granted}, choices: ${choices}`);
    //merge annotation if indecies overlap
    const existing = key === "granted" ? granted : choices;
    if (!existing) {
      console.log(
        `no existing: ${JSON.stringify({ [key]: [indecies] }, null, 2)}`,
      );
      annotateAffix({ [key]: [indecies] });
    } else {
      const toCheck = existing.concat([indecies]);
      let annotations: anotation[] = [];
      try {
        annotations = mergeIfOverlap(toCheck);
      } catch (error) {
        console.log(`error: ${error}`);
      }
      //const annotations = mergeIfOverlap(toCheck);
      console.log(`annotations: ${annotations}`);
      annotateAffix({ [key]: annotations });
    }
  };
  const getSelectedTextIndecies = (): anotation => {
    const selection = window.getSelection();
    const start = selection?.anchorOffset || 0;
    const end = selection?.focusOffset || 0;
    return [start, end];
  };
  const mergeIfOverlap = (existing: anotation[]) => {
    if (existing.length === 1) return existing;

    const sorted = existing.sort((a, b) => a[0] - b[0]);
    let merged = [sorted[0]];

    sorted.forEach(value => {
      const i = merged.length - 1;
      console.log(
        `sorted: ${sorted}\nmerged: ${merged}\nvalue: ${value}\ni: ${i}`,
      );
      if (merged?.[i]?.[1] === undefined) return;
      const [start, end] = value;
      if (merged[i][1] > start) {
        const newEnd = Math.max(end, merged[i][1]);
        merged[i] = [merged[i][0], newEnd];
      } else {
        merged.push(value);
      }
    });
    return merged;
  };

  const buttonLeft = {
    text: "Grant",
    color: "blue" as color,
    onClick: () => tryToAnnotate("granted"),
  };

  const buttonRight = {
    text: "Choice",
    onClick: () => tryToAnnotate("choices"),
  };
  return (
    <>
      <SimpleDialog
        cta={"Annotate"}
        header={name}
        buttonLeft={buttonLeft}
        buttonRight={buttonRight}
      >
        <div>
          <Highlighter text={description} />
        </div>
        <div className="select-none">
          <Highlighter
            key={"this is new"}
            text={description}
            indices={granted}
          />
        </div>
      </SimpleDialog>
    </>
  );
};

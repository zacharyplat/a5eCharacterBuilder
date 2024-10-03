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
      const annotations = mergeIfOverlap(toCheck);
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
    // eslint-disable-next-line no-debugger
    const sorted = existing.sort((a, b) => a[0] - b[0]);
    const merged = [sorted[0]];
    sorted.forEach(val => {
      const index = merged.length - 1;
      if (merged[index][1] >= val[0]) {
        merged[index][1] = val[1];
      } else {
        merged.push(val);
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
        <Highlighter text={description} indices={granted} />
      </SimpleDialog>

      <Highlighter text={description} indices={granted} />
    </>
  );
};

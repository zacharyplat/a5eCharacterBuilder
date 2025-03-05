import { Fragment } from "react";
import type { anotation } from "./dataEditorTypes";

type HighlighterProps = { text: string; indices?: anotation[] };

export function Highlighter(props: HighlighterProps): JSX.Element {
  const { text, indices } = props;

  if (!indices) return <>{text}</>;

  let front = 0;
  const splitText = indices.map(([start, end]) => {
    const lead = text.slice(front, start);
    const wrap = text.slice(start, end);
    front = end + 1;
    return [lead, wrap];
  });
  const last = text.length <= front ? "" : text.slice(front);
  const jsx = splitText.map(([lead, wrap], i) => {
    return (
      <Fragment key={indices[i][0]}>
        {lead}
        <span style={{ background: "black" }}>{wrap}</span>
      </Fragment>
    );
  });
  jsx.join(last);
  return (
    <>
      <Fragment key="jsx">{jsx}</Fragment>
      {last}
    </>
  );
}

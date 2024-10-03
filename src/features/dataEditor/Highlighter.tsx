import type { anotation } from "./dataEditorTypes";

type HighlighterProps = { text: string; indices?: anotation[] };

export function Highlighter(props: HighlighterProps): JSX.Element {
  const { text, indices } = props;

  if (!indices) return <>{text}</>;

  //const start = text.slice(0, indices[0][0]);
  let front = 0;
  const splitText = indices.map(([start, end]) => {
    const lead = text.slice(front, start);
    const wrap = text.slice(start, end);
    front = end + 1;
    return [lead, wrap];
  });
  const last = text.length <= front ? "" : text.slice(front);

  /*
  const splitText = indices.flatMap((indice, index) => {
    const beginning = index === 0 ? 0 : indices[index - 1][1];
    const front = trimedText.slice(beginning, indice[0]);
    const toHighlight = trimedText.slice(indice[0], indice[1]);
    return [front, "<span style='{background:black}'>", toHighlight, "</span>"];
  });
  const last = text.slice(indices[indices.length - 1][1]);
  */
  //const higlightedText = [start].concat(splitText, last).join(" ");
  const jsx = splitText.map(([lead, wrap]) => {
    return (
      <>
        {lead}
        <span style={{ background: "black" }}>{wrap}</span>
      </>
    );
  });
  // eslint-disable-next-line no-debugger
  return (
    <>
      {jsx}
      {last}
    </>
  );
}

import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import type { color } from "@material-tailwind/react/types/components/button";
import React from "react";

type DialogButton = {
  text: string;
  color?: color;
  onClick: () => void;
};

type DialogProps = {
  cta: string;
  buttonLeft: DialogButton;
  buttonRight: DialogButton;
  header: string;
  body?: string;
  children?: React.ReactNode;
};

export function SimpleDialog(props: DialogProps) {
  const { cta, buttonLeft, buttonRight, header, body, children } = props;
  const [open, setOpen] = React.useState(false);
  const mainText = children ? children : body;

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button onClick={handleOpen} variant="gradient">
        {cta}
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>{header}</DialogHeader>
        <DialogBody>{mainText}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color={buttonLeft?.color ? buttonLeft.color : ("red" as color)}
            onClick={buttonLeft.onClick}
            className="mr-1"
          >
            <span>{buttonLeft.text}</span>
          </Button>
          <Button
            variant="gradient"
            color={buttonRight?.color ? buttonRight.color : ("green" as color)}
            onClick={buttonRight.onClick}
          >
            <span>{buttonRight.text}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

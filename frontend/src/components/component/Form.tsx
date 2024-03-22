import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ReactNode } from "react";

export function Form(props: { inputObj: ProfilInfoTabsProps }) {
  return (
    <form className="h-full flex-col justify-center items-center w-96">
      {props.inputObj.inputs.map((input: Input, index): ReactNode => {
        return (
          <div className="grid gap-2" key={index}>
            <Label htmlFor={input.name} className="mt-4">
              {input.label}
            </Label>
            <Input
              required
              type={input.type}
              name={input.name}
              id={input.name}
              autoComplete=""
              className="input input-bordered w-full"
            />
          </div>
        );
      })}
      {props.inputObj.buttons.map((button: Button, index): ReactNode => {
        return (
          <Button key={index} className="w-full mt-4" onClick={button.click}>
            {button.text}
          </Button>
        );
      })}
    </form>
  );
}

export interface ProfilInfoTabsProps {
  title: string;
  description: string;
  inputs: Input[];
  buttons: Button[];
}

export interface Input {
  type: string;
  name: string;
  label: string;
}

export interface Button {
  text: string;
  click?: () => void;
}

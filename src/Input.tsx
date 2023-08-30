import {ChangeEventHandler} from "react";

export type InputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  placeholder?: string;
};

export default function Input(props:InputProps) {
  return (
    <input type="text"
           placeholder={props.placeholder || ''}
           className={"border border-white/10 bg-blue-950 p-2 " + props.className}
           value={props.value}
           onChange={props.onChange}/>
  );
}
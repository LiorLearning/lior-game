import * as React from "react";
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
}
declare const Input: React.FC<InputProps & React.RefAttributes<HTMLInputElement>>;
export { Input };

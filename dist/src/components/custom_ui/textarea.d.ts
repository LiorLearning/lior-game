import * as React from "react";
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
}
declare const Textarea: React.FC<TextareaProps & React.RefAttributes<HTMLTextAreaElement>>;
export { Textarea };

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
declare const Slider: React.FC<Omit<SliderPrimitive.SliderProps & React.RefAttributes<HTMLSpanElement>, "ref"> & React.RefAttributes<HTMLSpanElement>>;
export { Slider };
import React, { ReactNode } from 'react';
import './app/globals.css';
import * as CustomUI from './components/custom_ui/index';
export declare const SandboxProvider: (props: {
    children: ReactNode;
    gameState: any;
    desc: string;
}) => React.JSX.Element;
export declare const useSandboxContext: () => {
    componentRef: React.RefObject<HTMLDivElement> | null;
    sendAdminMessage?: (role: string, content: string) => Promise<void>;
};
export declare const LiorGameProvider: (props: {
    children: ReactNode;
    wsUrl?: string;
    gameState: any;
    desc: string;
}) => React.JSX.Element;
export declare const useLiorGame: () => {};
export declare const Button: React.FC<import("./components/custom_ui/button").ButtonProps & React.RefAttributes<HTMLButtonElement>>, Card: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>, Slider: React.FC<Omit<import("@radix-ui/react-slider").SliderProps & React.RefAttributes<HTMLSpanElement>, "ref"> & React.RefAttributes<HTMLSpanElement>>, Switch: React.FC<Omit<import("@radix-ui/react-switch").SwitchProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>, Select: React.FC<import("@radix-ui/react-select").SelectProps>, Accordion: React.ForwardRefExoticComponent<(import("@radix-ui/react-accordion").AccordionSingleProps | import("@radix-ui/react-accordion").AccordionMultipleProps) & React.RefAttributes<HTMLDivElement>>, DropdownMenu: React.FC<import("@radix-ui/react-dropdown-menu").DropdownMenuProps>, ScrollArea: React.ForwardRefExoticComponent<Omit<import("@radix-ui/react-scroll-area").ScrollAreaProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>, Toggle: React.FC<Omit<import("@radix-ui/react-toggle").ToggleProps & React.RefAttributes<HTMLButtonElement>, "ref"> & import("class-variance-authority").VariantProps<(props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "lg" | "sm" | "default" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string> & React.RefAttributes<HTMLButtonElement>>, ToggleGroup: React.FC<((Omit<import("@radix-ui/react-toggle-group").ToggleGroupSingleProps & React.RefAttributes<HTMLDivElement>, "ref"> | Omit<import("@radix-ui/react-toggle-group").ToggleGroupMultipleProps & React.RefAttributes<HTMLDivElement>, "ref">) & import("class-variance-authority").VariantProps<(props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "lg" | "sm" | "default" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string>) & React.RefAttributes<HTMLDivElement>>, Progress: React.ForwardRefExoticComponent<Omit<import("@radix-ui/react-progress").ProgressProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>, Label: React.FC<Omit<import("@radix-ui/react-label").LabelProps & React.RefAttributes<HTMLLabelElement>, "ref"> & import("class-variance-authority").VariantProps<(props?: import("class-variance-authority/types").ClassProp | undefined) => string> & React.RefAttributes<HTMLLabelElement>>;
export declare const SuccessAnimation: () => React.JSX.Element;
export declare const CustomComponents: typeof CustomUI;
//# sourceMappingURL=index.d.ts.map
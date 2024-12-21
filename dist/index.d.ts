import * as React from 'react';
import React__default, { ReactNode } from 'react';
import * as class_variance_authority from 'class-variance-authority';
import { VariantProps } from 'class-variance-authority';
import * as class_variance_authority_types from 'class-variance-authority/types';

declare const NODES: readonly ["a", "button", "div", "form", "h2", "h3", "img", "input", "label", "li", "nav", "ol", "p", "span", "svg", "ul"];
type Primitives = {
    [E in (typeof NODES)[number]]: PrimitiveForwardRefComponent<E>;
};
type PrimitivePropsWithRef<E extends React.ElementType> = React.ComponentPropsWithRef<E> & {
    asChild?: boolean;
};
interface PrimitiveForwardRefComponent<E extends React.ElementType> extends React.ForwardRefExoticComponent<PrimitivePropsWithRef<E>> {
}
declare const Primitive: Primitives;

type PrimitiveLabelProps = React.ComponentPropsWithoutRef<typeof Primitive.label>;
interface LabelProps extends PrimitiveLabelProps {
}

type PrimitiveDivProps$5 = React.ComponentPropsWithoutRef<typeof Primitive.div>;
interface ProgressProps extends PrimitiveDivProps$5 {
    value?: number | null | undefined;
    max?: number;
    getValueLabel?(value: number, max: number): string;
}

type Orientation = React.AriaAttributes['aria-orientation'];
type Direction$5 = 'ltr' | 'rtl';
interface RovingFocusGroupOptions {
    /**
     * The orientation of the group.
     * Mainly so arrow navigation is done accordingly (left & right vs. up & down)
     */
    orientation?: Orientation;
    /**
     * The direction of navigation between items.
     */
    dir?: Direction$5;
    /**
     * Whether keyboard navigation should loop around
     * @defaultValue false
     */
    loop?: boolean;
}
interface RovingFocusGroupProps$1 extends RovingFocusGroupImplProps {
}
type PrimitiveDivProps$4 = React.ComponentPropsWithoutRef<typeof Primitive.div>;
interface RovingFocusGroupImplProps extends Omit<PrimitiveDivProps$4, 'dir'>, RovingFocusGroupOptions {
    currentTabStopId?: string | null;
    defaultCurrentTabStopId?: string;
    onCurrentTabStopIdChange?: (tabStopId: string | null) => void;
    onEntryFocus?: (event: Event) => void;
    preventScrollOnEntryFocus?: boolean;
}
declare const Root: React.ForwardRefExoticComponent<RovingFocusGroupProps$1 & React.RefAttributes<HTMLDivElement>>;

type PrimitiveButtonProps$1 = React.ComponentPropsWithoutRef<typeof Primitive.button>;
interface ToggleProps extends PrimitiveButtonProps$1 {
    /**
     * The controlled state of the toggle.
     */
    pressed?: boolean;
    /**
     * The state of the toggle when initially rendered. Use `defaultPressed`
     * if you do not need to control the state of the toggle.
     * @defaultValue false
     */
    defaultPressed?: boolean;
    /**
     * The callback that fires when the state of the toggle changes.
     */
    onPressedChange?(pressed: boolean): void;
}

interface ToggleGroupSingleProps extends ToggleGroupImplSingleProps {
    type: 'single';
}
interface ToggleGroupMultipleProps extends ToggleGroupImplMultipleProps {
    type: 'multiple';
}
interface ToggleGroupImplSingleProps extends ToggleGroupImplProps {
    /**
     * The controlled stateful value of the item that is pressed.
     */
    value?: string;
    /**
     * The value of the item that is pressed when initially rendered. Use
     * `defaultValue` if you do not need to control the state of a toggle group.
     */
    defaultValue?: string;
    /**
     * The callback that fires when the value of the toggle group changes.
     */
    onValueChange?(value: string): void;
}
interface ToggleGroupImplMultipleProps extends ToggleGroupImplProps {
    /**
     * The controlled stateful value of the items that are pressed.
     */
    value?: string[];
    /**
     * The value of the items that are pressed when initially rendered. Use
     * `defaultValue` if you do not need to control the state of a toggle group.
     */
    defaultValue?: string[];
    /**
     * The callback that fires when the state of the toggle group changes.
     */
    onValueChange?(value: string[]): void;
}
type RovingFocusGroupProps = React__default.ComponentPropsWithoutRef<typeof Root>;
type PrimitiveDivProps$3 = React__default.ComponentPropsWithoutRef<typeof Primitive.div>;
interface ToggleGroupImplProps extends PrimitiveDivProps$3 {
    /**
     * Whether the group is disabled from user interaction.
     * @defaultValue false
     */
    disabled?: boolean;
    /**
     * Whether the group should maintain roving focus of its buttons.
     * @defaultValue true
     */
    rovingFocus?: boolean;
    loop?: RovingFocusGroupProps['loop'];
    orientation?: RovingFocusGroupProps['orientation'];
    dir?: RovingFocusGroupProps['dir'];
}

type Direction$4 = 'ltr' | 'rtl';
type ScrollAreaContextValue = {
    type: 'auto' | 'always' | 'scroll' | 'hover';
    dir: Direction$4;
    scrollHideDelay: number;
    scrollArea: ScrollAreaElement | null;
    viewport: ScrollAreaViewportElement | null;
    onViewportChange(viewport: ScrollAreaViewportElement | null): void;
    content: HTMLDivElement | null;
    onContentChange(content: HTMLDivElement): void;
    scrollbarX: ScrollAreaScrollbarElement | null;
    onScrollbarXChange(scrollbar: ScrollAreaScrollbarElement | null): void;
    scrollbarXEnabled: boolean;
    onScrollbarXEnabledChange(rendered: boolean): void;
    scrollbarY: ScrollAreaScrollbarElement | null;
    onScrollbarYChange(scrollbar: ScrollAreaScrollbarElement | null): void;
    scrollbarYEnabled: boolean;
    onScrollbarYEnabledChange(rendered: boolean): void;
    onCornerWidthChange(width: number): void;
    onCornerHeightChange(height: number): void;
};
type ScrollAreaElement = React.ElementRef<typeof Primitive.div>;
type PrimitiveDivProps$2 = React.ComponentPropsWithoutRef<typeof Primitive.div>;
interface ScrollAreaProps extends PrimitiveDivProps$2 {
    type?: ScrollAreaContextValue['type'];
    dir?: ScrollAreaContextValue['dir'];
    scrollHideDelay?: number;
}
type ScrollAreaViewportElement = React.ElementRef<typeof Primitive.div>;
type ScrollAreaScrollbarElement = ScrollAreaScrollbarVisibleElement;
type ScrollAreaScrollbarVisibleElement = ScrollAreaScrollbarAxisElement;
type ScrollAreaScrollbarAxisElement = ScrollAreaScrollbarImplElement;
type ScrollAreaScrollbarImplElement = React.ElementRef<typeof Primitive.div>;

type Direction$3 = 'ltr' | 'rtl';
interface DropdownMenuProps {
    children?: React.ReactNode;
    dir?: Direction$3;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?(open: boolean): void;
    modal?: boolean;
}

type Direction$2 = 'ltr' | 'rtl';
interface AccordionSingleProps extends AccordionImplSingleProps {
    type: 'single';
}
interface AccordionMultipleProps extends AccordionImplMultipleProps {
    type: 'multiple';
}
interface AccordionImplSingleProps extends AccordionImplProps {
    /**
     * The controlled stateful value of the accordion item whose content is expanded.
     */
    value?: string;
    /**
     * The value of the item whose content is expanded when the accordion is initially rendered. Use
     * `defaultValue` if you do not need to control the state of an accordion.
     */
    defaultValue?: string;
    /**
     * The callback that fires when the state of the accordion changes.
     */
    onValueChange?(value: string): void;
    /**
     * Whether an accordion item can be collapsed after it has been opened.
     * @default false
     */
    collapsible?: boolean;
}
interface AccordionImplMultipleProps extends AccordionImplProps {
    /**
     * The controlled stateful value of the accordion items whose contents are expanded.
     */
    value?: string[];
    /**
     * The value of the items whose contents are expanded when the accordion is initially rendered. Use
     * `defaultValue` if you do not need to control the state of an accordion.
     */
    defaultValue?: string[];
    /**
     * The callback that fires when the state of the accordion changes.
     */
    onValueChange?(value: string[]): void;
}
type PrimitiveDivProps$1 = React__default.ComponentPropsWithoutRef<typeof Primitive.div>;
interface AccordionImplProps extends PrimitiveDivProps$1 {
    /**
     * Whether or not an accordion is disabled from user interaction.
     *
     * @defaultValue false
     */
    disabled?: boolean;
    /**
     * The layout in which the Accordion operates.
     * @default vertical
     */
    orientation?: React__default.AriaAttributes['aria-orientation'];
    /**
     * The language read direction.
     */
    dir?: Direction$2;
}

type Direction$1 = 'ltr' | 'rtl';
interface SelectProps {
    children?: React.ReactNode;
    value?: string;
    defaultValue?: string;
    onValueChange?(value: string): void;
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?(open: boolean): void;
    dir?: Direction$1;
    name?: string;
    autoComplete?: string;
    disabled?: boolean;
    required?: boolean;
    form?: string;
}

type PrimitiveButtonProps = React.ComponentPropsWithoutRef<typeof Primitive.button>;
interface SwitchProps extends PrimitiveButtonProps {
    checked?: boolean;
    defaultChecked?: boolean;
    required?: boolean;
    onCheckedChange?(checked: boolean): void;
}

type Direction = 'ltr' | 'rtl';
interface SliderProps extends Omit<SliderHorizontalProps | SliderVerticalProps, keyof SliderOrientationPrivateProps | 'defaultValue'> {
    name?: string;
    disabled?: boolean;
    orientation?: React.AriaAttributes['aria-orientation'];
    dir?: Direction;
    min?: number;
    max?: number;
    step?: number;
    minStepsBetweenThumbs?: number;
    value?: number[];
    defaultValue?: number[];
    onValueChange?(value: number[]): void;
    onValueCommit?(value: number[]): void;
    inverted?: boolean;
    form?: string;
}
type SliderOrientationPrivateProps = {
    min: number;
    max: number;
    inverted: boolean;
    onSlideStart?(value: number): void;
    onSlideMove?(value: number): void;
    onSlideEnd?(): void;
    onHomeKeyDown(event: React.KeyboardEvent): void;
    onEndKeyDown(event: React.KeyboardEvent): void;
    onStepKeyDown(step: {
        event: React.KeyboardEvent;
        direction: number;
    }): void;
};
interface SliderOrientationProps extends Omit<SliderImplProps, keyof SliderImplPrivateProps>, SliderOrientationPrivateProps {
}
interface SliderHorizontalProps extends SliderOrientationProps {
    dir?: Direction;
}
interface SliderVerticalProps extends SliderOrientationProps {
}
type PrimitiveDivProps = React.ComponentPropsWithoutRef<typeof Primitive.div>;
type SliderImplPrivateProps = {
    onSlideStart(event: React.PointerEvent): void;
    onSlideMove(event: React.PointerEvent): void;
    onSlideEnd(event: React.PointerEvent): void;
    onHomeKeyDown(event: React.KeyboardEvent): void;
    onEndKeyDown(event: React.KeyboardEvent): void;
    onStepKeyDown(event: React.KeyboardEvent): void;
};
interface SliderImplProps extends PrimitiveDivProps, SliderImplPrivateProps {
}

declare const buttonVariants: (props?: ({
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string;
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}
declare const Button$1: React.FC<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

declare const Card$1: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;

declare const Slider$1: React.FC<Omit<SliderProps & React.RefAttributes<HTMLSpanElement>, "ref"> & React.RefAttributes<HTMLSpanElement>>;

declare const Switch$1: React.FC<Omit<SwitchProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;

declare const Select$1: React.FC<SelectProps>;

declare const Accordion$1: React.ForwardRefExoticComponent<(AccordionSingleProps | AccordionMultipleProps) & React.RefAttributes<HTMLDivElement>>;

declare const DropdownMenu$1: React.FC<DropdownMenuProps>;

declare const ScrollArea$1: React.ForwardRefExoticComponent<Omit<ScrollAreaProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

declare const Toggle$1: React.FC<Omit<ToggleProps & React.RefAttributes<HTMLButtonElement>, "ref"> & VariantProps<(props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string> & React.RefAttributes<HTMLButtonElement>>;

declare const ToggleGroup$1: React.FC<((Omit<ToggleGroupSingleProps & React.RefAttributes<HTMLDivElement>, "ref"> | Omit<ToggleGroupMultipleProps & React.RefAttributes<HTMLDivElement>, "ref">) & VariantProps<(props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string>) & React.RefAttributes<HTMLDivElement>>;

declare const Progress$1: React.ForwardRefExoticComponent<Omit<ProgressProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;

declare const Label$1: React.FC<Omit<LabelProps & React.RefAttributes<HTMLLabelElement>, "ref"> & VariantProps<(props?: class_variance_authority_types.ClassProp | undefined) => string> & React.RefAttributes<HTMLLabelElement>>;

declare namespace CustomUI {
  export { Accordion$1 as Accordion, Button$1 as Button, Card$1 as Card, DropdownMenu$1 as DropdownMenu, Label$1 as Label, Progress$1 as Progress, ScrollArea$1 as ScrollArea, Select$1 as Select, Slider$1 as Slider, Switch$1 as Switch, Toggle$1 as Toggle, ToggleGroup$1 as ToggleGroup };
}

declare const SandboxProvider: React__default.FC<{
    children: ReactNode;
    gameState: any;
    desc: string;
}>;
declare const useSandboxContext: () => {
    componentRef: React__default.RefObject<HTMLDivElement> | null;
    sendAdminMessage?: (role: string, content: string) => Promise<void>;
};
declare const LiorGameProvider: React__default.FC<{
    children: ReactNode;
    wsUrl?: string;
    gameState: any;
    desc: string;
}>;
declare const useLiorGame: () => any;
declare const Button: React__default.FC<ButtonProps & React__default.RefAttributes<HTMLButtonElement>>;
declare const Card: React__default.ForwardRefExoticComponent<React__default.HTMLAttributes<HTMLDivElement> & React__default.RefAttributes<HTMLDivElement>>;
declare const Slider: React__default.FC<Omit<SliderProps & React__default.RefAttributes<HTMLSpanElement>, "ref"> & React__default.RefAttributes<HTMLSpanElement>>;
declare const Switch: React__default.FC<Omit<SwitchProps & React__default.RefAttributes<HTMLButtonElement>, "ref"> & React__default.RefAttributes<HTMLButtonElement>>;
declare const Select: React__default.FC<SelectProps>;
declare const Accordion: React__default.ForwardRefExoticComponent<(AccordionSingleProps | AccordionMultipleProps) & React__default.RefAttributes<HTMLDivElement>>;
declare const DropdownMenu: React__default.FC<DropdownMenuProps>;
declare const ScrollArea: React__default.ForwardRefExoticComponent<Omit<ScrollAreaProps & React__default.RefAttributes<HTMLDivElement>, "ref"> & React__default.RefAttributes<HTMLDivElement>>;
declare const Toggle: React__default.FC<Omit<ToggleProps & React__default.RefAttributes<HTMLButtonElement>, "ref"> & class_variance_authority.VariantProps<(props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string> & React__default.RefAttributes<HTMLButtonElement>>;
declare const ToggleGroup: React__default.FC<((Omit<ToggleGroupSingleProps & React__default.RefAttributes<HTMLDivElement>, "ref"> | Omit<ToggleGroupMultipleProps & React__default.RefAttributes<HTMLDivElement>, "ref">) & class_variance_authority.VariantProps<(props?: ({
    variant?: "default" | "outline" | null | undefined;
    size?: "default" | "sm" | "lg" | null | undefined;
} & class_variance_authority_types.ClassProp) | undefined) => string>) & React__default.RefAttributes<HTMLDivElement>>;
declare const Progress: React__default.ForwardRefExoticComponent<Omit<ProgressProps & React__default.RefAttributes<HTMLDivElement>, "ref"> & React__default.RefAttributes<HTMLDivElement>>;
declare const Label: React__default.FC<Omit<LabelProps & React__default.RefAttributes<HTMLLabelElement>, "ref"> & class_variance_authority.VariantProps<(props?: class_variance_authority_types.ClassProp | undefined) => string> & React__default.RefAttributes<HTMLLabelElement>>;
declare const SuccessAnimation: () => React__default.JSX.Element;
declare const CustomComponents: typeof CustomUI;

export { Accordion, Button, Card, CustomComponents, DropdownMenu, Label, LiorGameProvider, Progress, SandboxProvider, ScrollArea, Select, Slider, SuccessAnimation, Switch, Toggle, ToggleGroup, useLiorGame, useSandboxContext };

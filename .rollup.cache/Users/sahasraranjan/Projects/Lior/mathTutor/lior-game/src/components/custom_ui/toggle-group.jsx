"use client";
import { __rest } from "tslib";
import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import withEventLogging from '@/components/EventLogger';
import { cn } from "@/lib/utils";
import { toggleVariants } from "@/components/ui/toggle";
const ToggleGroupContext = React.createContext({
    size: "default",
    variant: "default",
});
const MyToggleGroup = React.forwardRef((_a, ref) => {
    var { className, variant, size, children } = _a, props = __rest(_a, ["className", "variant", "size", "children"]);
    return (<ToggleGroupPrimitive.Root ref={ref} className={cn("flex items-center justify-center gap-1", className)} {...props}>
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>);
});
MyToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;
const ToggleGroup = withEventLogging(MyToggleGroup);
const MyToggleGroupItem = React.forwardRef((_a, ref) => {
    var { className, children, variant, size } = _a, props = __rest(_a, ["className", "children", "variant", "size"]);
    const context = React.useContext(ToggleGroupContext);
    return (<ToggleGroupPrimitive.Item ref={ref} className={cn(toggleVariants({
            variant: context.variant || variant,
            size: context.size || size,
        }), className)} {...props}>
      {children}
    </ToggleGroupPrimitive.Item>);
});
MyToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;
const ToggleGroupItem = withEventLogging(MyToggleGroupItem);
export { ToggleGroup, ToggleGroupItem };
//# sourceMappingURL=toggle-group.jsx.map
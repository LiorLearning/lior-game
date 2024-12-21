"use client";
import { __rest } from "tslib";
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";
import withEventLogging from '@/components/EventLogger';
import { cn } from "@/lib/utils";
const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
const MyLabel = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (<LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props}/>);
});
MyLabel.displayName = LabelPrimitive.Root.displayName;
const Label = withEventLogging(MyLabel);
export { Label };
//# sourceMappingURL=label.jsx.map
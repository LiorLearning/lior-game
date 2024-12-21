import { __rest } from "tslib";
import * as React from "react";
import withEventLogging from '@/components/EventLogger';
import { cn } from "@/lib/utils";
const MyInput = React.forwardRef((_a, ref) => {
    var { className, type } = _a, props = __rest(_a, ["className", "type"]);
    return (<input type={type} className={cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className)} ref={ref} {...props}/>);
});
MyInput.displayName = "Input";
const Input = withEventLogging(MyInput);
export { Input };
//# sourceMappingURL=input.jsx.map
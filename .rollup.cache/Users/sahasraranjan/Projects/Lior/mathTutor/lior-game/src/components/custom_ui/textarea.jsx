import { __rest } from "tslib";
import * as React from "react";
import withEventLogging from '@/components/EventLogger';
import { cn } from "@/lib/utils";
const MyTextarea = React.forwardRef((_a, ref) => {
    var { className } = _a, props = __rest(_a, ["className"]);
    return (<textarea className={cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className)} ref={ref} {...props}/>);
});
MyTextarea.displayName = "Textarea";
const Textarea = withEventLogging(MyTextarea);
export { Textarea };
//# sourceMappingURL=textarea.jsx.map
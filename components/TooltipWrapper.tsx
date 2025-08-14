"use client";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ReactNode } from "react";

interface TooltipWrapperProps {
    children: ReactNode;
    content: ReactNode;
    side?: "top" | "right" | "bottom" | "left";
}

const TooltipWrapper = ({ children, content, side }: TooltipWrapperProps) => {
    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>{children}</TooltipTrigger>
                <TooltipContent side={side}>{content}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default TooltipWrapper
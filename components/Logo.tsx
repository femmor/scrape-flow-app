import { cn } from "@/lib/utils";
import { SquareDashedMousePointer } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

type LogoProps = {
    fontSize?: string;
    iconSize?: number;
    ariaLabel?: string;
    href: string;
}

function Logo({ fontSize = "text-2xl", iconSize = 20, ariaLabel, href }: LogoProps) {
    return (
        <Link className={cn("text-2xl font-bold flex items-center gap-2", fontSize)} href={href} aria-label={ariaLabel}>
            <div className="rounded-xl bg-gradient-to-r from-emerald-300 to-emerald-500 p-2">
                <SquareDashedMousePointer size={iconSize} className="stroke-white" />
            </div>
            <div>
                <span className="bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent">
                    Scrape
                </span>
                <span className="text-stone dark:text-stone-300 font-normal">Flow</span>
            </div>
        </Link>
    )
}

export default Logo;
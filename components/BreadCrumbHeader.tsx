"use client"

import { Fragment } from "react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "./ui/breadcrumb"
import { usePathname } from "next/navigation"

const BreadCrumbHeader = () => {
    const pathname = usePathname()
    const paths = pathname === "/" ? [""] : pathname.split("/")

    return (
        <div className="flex items-center">
            <Breadcrumb>
                <BreadcrumbList>
                    {paths.map((path, index) => (
                        <Fragment key={index}>
                            <BreadcrumbItem>
                                <BreadcrumbLink href={`/${path}`} className="capitalize">
                                    {path || "Home"}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            {index < paths.length - 1 && <BreadcrumbSeparator />}
                        </Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}

export default BreadCrumbHeader
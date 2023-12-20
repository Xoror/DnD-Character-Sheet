import React, { forwardRef } from "react";

const Table = ({children, size="lg", className, ...restProps}, ref) => {
    let classesComputed = `sg-table${className ? " "+className:""}${size === "sm" ? " "+"sg-table-sm":""}`
    return (
        <table className={classesComputed} {...restProps}>
            {children}
        </table>
    )
}

export default forwardRef(Table)
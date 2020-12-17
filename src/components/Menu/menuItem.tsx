import React, { FC, ReactNode, useContext, CSSProperties } from "react"
import classnames from "classnames"
import { MenuContext } from "./menu"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import Icon from "../Icon/icon"

export interface MenuItemProps {
    /**
     * 菜单项的唯一标识key
     */
    index?: string;
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * ReactNode子节点
     */
    children?: ReactNode;
     /**
     * 自定义类名
     */
    classNames?: string;
    /**
     * css样式
     */
    style?: CSSProperties;
    /**
     * 菜单项图标
     */
    icon?: IconProp
}


export const MenuItem: FC<MenuItemProps> = (props) => {
    const {
        index,
        disabled,
        classNames,
        style,
        children,
        icon
    } = props

    const {
        index: currentActive,
        onSelect
    } = useContext(MenuContext)

    const classes = classnames("menu-item", classNames, {
        "is-active": currentActive === index,
        "is-disabled": disabled === true
    })

    const handleClick = () => {
        if (onSelect && !disabled) {
            onSelect(index as string)
        }
    }

    return <li key={index} style={style} className={classes} onClick={handleClick}>
        {/* 添加图标 */}
        { icon && <Icon className="menu-icon" icon={icon}></Icon> }
        {children}
    </li>
}

MenuItem.defaultProps = {
    disabled: false
}

MenuItem.displayName = "MenuItem"

export default MenuItem
import React, { CSSProperties, FC, ReactNode, useContext, useState, MouseEvent } from "react"
import classnames from "classnames"
import { MenuContext } from "./menu"
import { MenuItemProps } from "./menuItem"
import { Transition } from "../Transition/transition"
import Icon from "../Icon/icon"
import { IconProp} from '@fortawesome/fontawesome-svg-core'



export interface SubMenuItemProps {
    /**
     * 子菜单的唯一标识index
     */
    index?: string;
    /**
     * 子菜单标题
     */
    title?: string;
    /**
     * 自定义类名
     */
    classNames?: string;
    /**
     * css样式
     */
    style?: CSSProperties;
    /**
     * ReactNode子节点
     */
    children?: ReactNode;
    /**
     * 菜单图标
     */
    icon?: IconProp;
}

export const SubMenuItem: FC<SubMenuItemProps> = (props) => {
    const {
        index,
        title,
        style,
        classNames,
        icon,
        children
    } = props

    const {
        mode,
        defaultOpenSubMenus,
    } = useContext(MenuContext)

    const isOpened = (index && mode === "vertical") ? (defaultOpenSubMenus as Array<string>).includes(index) : false

    const [menuOpen, setMenuOpen] = useState(isOpened)

    const subMenuItemClasses = classnames("menu-item submenu-item", classNames, {
        "is-opened": menuOpen,
        "is-active": menuOpen,
        "is-vertical": mode === "vertical"
    })
    const submenuClasses = classnames("vshark-submenu", {
        "menu-opened": menuOpen
    })

    const handleClick = (e: MouseEvent) => {
        e.preventDefault()
        setMenuOpen(!menuOpen)
    }
    let timer: any;
    const handleMouse = (e: MouseEvent, toggle: boolean) => {
        e.preventDefault()
        /** 节流并解决hover之后不能立刻将子菜单submenu隐藏不能移动到子菜单上 */
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            setMenuOpen(toggle)
        }, 300)
    }
    const clickEvents = mode === "vertical" ? {
        onClick: handleClick
    } : {}
    const hoverEvents = mode === "horizontal" ? {
        onMouseEnter: (e: MouseEvent) => handleMouse(e, true),
        onMouseLeave: (e: MouseEvent) => handleMouse(e, false)
    } : {}

    const renderChildren = () => {
        const childrenComponent = React.Children.map(children, (child, idx) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
            if (displayName === "MenuItem") {
                return React.cloneElement(childElement, {
                    index: String(`${index}-${idx}`)
                })
            } else {
                console.error("Warning: SubMenu has a child which is not a MenuItem component")
            }
        })

        return (
            <Transition
                showIn={menuOpen}
                timeout={300}
                animation="zoom-in-top"
            >
                <ul className={submenuClasses}>
                    {childrenComponent}
                </ul>
            </Transition>
        )
    }

    return <li key={index} style={style} className={subMenuItemClasses} {...hoverEvents}>
        <div className="submenu-title" {...clickEvents}>
            { icon && <Icon className="menu-icon" icon={icon as IconProp}></Icon> }
            {title}
            {mode === "vertical" ? <Icon className="submenu-arrow" size="sm" icon="angle-down"></Icon> : null}
        </div>
        {renderChildren()}
    </li>
}

SubMenuItem.displayName = "SubMenuItem"

export default SubMenuItem
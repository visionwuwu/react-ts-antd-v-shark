import React, { CSSProperties, FC, useState, createContext }  from "react"
import classnames from "classnames"
import { MenuItemProps } from "./menuItem"

type MenuMode = "horizontal" | "vertical"

export interface MenuProps {
    /**
     * 菜单类型，水平&垂直
     */
    mode?: MenuMode;
    /**
     * 默认选中的菜单项key的数组
     */
    defaultOpenSubMenus?: string[];
    /**
     * 默认选中的菜单项的index
     */
    defaultIndex?: string;
    /**
     * 自定义类名
     */
    classNames?: string;
    /**
     * 根节点样式
     */
    style?: CSSProperties;
    /**
     * 菜单被选中时的回调
     */
    onSelect?: (index: string) => void;
}

export interface IMenuContext {
    index?: string;
    mode?: MenuMode;
    onSelect?: (index: string) => void;
    defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({ index: "0" })

/**
 * ### Menu 导航菜单
 * ~~~ts
 *  import { Menu } from "v-shark"
 * ~~~
 */
export const Menu: FC<MenuProps> = (props) => {
    const {
        mode,
        classNames,
        style,
        defaultIndex,
        onSelect,
        defaultOpenSubMenus,
        children
    } = props

    const [currentActive, setCurrentActive] = useState(defaultIndex)

    const classes = classnames("vshark-menu", classNames, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    })

    const handleClick = (idx: string) => {
        if (currentActive === idx) return;
        setCurrentActive(idx)
        if (onSelect) {
            onSelect(idx)
        }
    }

    const passContext:IMenuContext = {
        index: currentActive ? currentActive : "0",
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus
    }

    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type
            if (displayName === "MenuItem" || displayName === "SubMenuItem") {
                return React.cloneElement(childElement, {
                    index: String(index)
                })
            } else {
                console.error("Warning: Menu is a child whice is not a MenuItem Component")
            }
        })
    }
    return <ul className={classes} style={style} data-testid="test-menu">
        <MenuContext.Provider value={passContext}>
            {renderChildren()}
        </MenuContext.Provider>
    </ul>
}

Menu.defaultProps = {
    mode: "horizontal",
    defaultIndex: "0",
    defaultOpenSubMenus: []
}

export default Menu
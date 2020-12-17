import React from "react"
import { render, fireEvent, RenderResult, waitFor  } from "@testing-library/react"
import { Menu, MenuProps} from "./menu"
import { MenuItem, MenuItemProps } from "./menuItem"
import SubMenuItem from "./subMenuItem"

jest.mock("../Icon/icon", () => {
    return () => {
        return <i className="fa"></i>
    }
})

jest.mock("react-transition-group", () => {
    return {
        CSSTransition: (props: any) => {
            return props.children
        }
    }
})

const defaultMenuProps: MenuProps = {
    mode: "horizontal",
    defaultIndex: "0",
    classNames: "test-menu",
    onSelect: jest.fn()
}

const testVerticalMenuProps: MenuProps = {
    mode: "vertical",
    defaultOpenSubMenus: ["5"],
    onSelect: jest.fn()
}

const defaultMenuItemProps: MenuItemProps = {
    classNames: "menu-item-disabled",
    disabled: true
}

const createStyleFile = () => {
    const cssFile: string = `
        .vshark-menu {
            display: none;
        }
        .vshark-menu.menu-opened {
            display: block;
        }
    `
    const style = document.createElement("style")
    style.innerHTML = cssFile
    return style
}

const renderMenu = (menuProps: MenuProps, menuItemProps: MenuItemProps) => {
    return render(<Menu {...menuProps} data-testid="test-menu">
        <MenuItem>active</MenuItem>
        <MenuItem {...menuItemProps}>disabled</MenuItem>
        <MenuItem>item3</MenuItem>
        <MenuItem>item4</MenuItem>
        <SubMenuItem title="dropdown">
            <MenuItem>drop1</MenuItem>
        </SubMenuItem>
        <SubMenuItem title="opened">
            <MenuItem>opened1</MenuItem>
        </SubMenuItem>
    </Menu>)
}

let wrapper: RenderResult , wrapper2: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe("test horizontal menu component", () => {
    /** 每个测试运行之前的回调 */
    beforeEach(() => {
        wrapper = renderMenu(defaultMenuProps, defaultMenuItemProps)
        wrapper.container.append(createStyleFile())
        menuElement = wrapper.getByTestId("test-menu")
        activeElement = wrapper.getByText("active")
        disabledElement = wrapper.getByText("disabled")
    })

    it("should render the correct Menu and MenuItem default props", () => {
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass("test-menu vshark-menu menu-horizontal")
        expect(menuElement.querySelectorAll(":scope > li").length).toBe(6)
        expect(activeElement).toHaveClass("menu-item is-active")
        expect(disabledElement).toHaveClass("menu-item-disabled is-disabled")
    })

    it("click items should change active props and call the right callback", () => {
        const thirdItem = wrapper.getByText("item3")
        // Act-active
        fireEvent.click(thirdItem)
        expect(activeElement).not.toHaveClass("is-active")
        expect(thirdItem).toHaveClass("is-active")
        expect(defaultMenuProps.onSelect).toBeCalledWith("2")
        // Act-disabled
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass("is-active")
        expect(defaultMenuProps.onSelect).not.toHaveBeenCalledWith("1")
    })
    
    it("when mouse hover dropdown after can display correct drop1", async () => {
        const dropdownElement = wrapper.getByText("dropdown")
        // mouseEnter
        // expect(wrapper.queryByText("drop1")).not.toBeVisible()
        fireEvent.mouseEnter(dropdownElement)
        await waitFor(() => expect(wrapper.queryByText("drop1")).toBeInTheDocument())
        // click drop1 item
        fireEvent.click(wrapper.getByText("drop1"))
        expect(wrapper.getByText("drop1")).toHaveClass("is-active")
        expect(defaultMenuProps.onSelect).toHaveBeenCalledWith("4-0")
        // mouseLeave
        fireEvent.mouseLeave(dropdownElement)
        await waitFor(() => expect(wrapper.queryByText("drop1")).not.toBeVisible())
    })
})

describe("test vertical menu component", () => {
    beforeEach(() => {
        wrapper2 = renderMenu(testVerticalMenuProps, defaultMenuItemProps)
        wrapper2.container.append(createStyleFile())
    })

    it("should render vertical mode when mode set is to vertical", () => {
        const menuElement = wrapper2.getByTestId("test-menu")
        expect(menuElement).toBeInTheDocument()
        expect(menuElement).toHaveClass("menu-vertical")
    })

    it("should show dropdown items when click on SubMenu for vertical mode", async () => {
        const dropdownElement = wrapper2.getByText("dropdown")
        expect(wrapper2.getByText("drop1")).not.toBeVisible()
        fireEvent.click(dropdownElement)
        await waitFor(() => expect(wrapper2.getByText("drop1")).toBeInTheDocument())
    })

    it("test defaultOpenSubMenu", () => {
        expect(wrapper2.queryByText("opened1")).toBeInTheDocument()
    })
})
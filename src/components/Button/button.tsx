import React, { FC, ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes, MouseEvent } from "react"
import classnames from "classnames"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import Icon from "../Icon/icon"

export declare type ButtonSize = "lg" | "sm" | "default"
export declare type ButtonType = "default" | "link" | "primary" | "danger"
export declare type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>
export declare type NativateButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>
export declare type ButtonProps = Partial<AnchorButtonProps & NativateButtonProps>

export interface BaseButtonProps {
    /**
     * react子节点
     */
    children?: ReactNode;
    /**
     * 用户自定义class
     */
    className?: string;
    /**
     * 按钮尺寸
     */
    size?: ButtonSize;
    /**
     * 按钮类型
     */
    btnType?: ButtonType;
    /**
     * 禁用状态
     */
    disabled?: boolean;
    /**
     * 点击跳转的地址，指定属性btnType = link 时生效
     */
    href?: string;
    /**
     * 带图标的按钮
     */
    icon?: IconProp;
    /**
     * 按钮click事件的回调函数
     */
    onClick?: (e: MouseEvent) => void;
}


/**
 * ### 基础按钮
 * ~~~ts
 *  import { Button } from "v-shark"
 * ~~~
 */
export const Button: FC<ButtonProps> = (props) => {
    /** 解构组件属性 */
    let {
        className,
        size,
        btnType,
        disabled,
        href,
        children,
        icon,
        ...restProps
    } = props

    console.log("displayName" in restProps)

    /**
     * 利用classnames拼接按钮组件class,包含基础class、用户自定义class、组件属性class
     */
    const classes = classnames("btn", className, {
        [`btn-${size}`]: size,
        [`btn-${btnType}`]: btnType,
        disabled: btnType === "link" && disabled
    })


    /** 判断btnType和href属性返回不同类型的jsx */
    if (btnType === "link" && href !== undefined) {
        return (
            <a
                className={classes}
                href={href}
                {...restProps}
            >  
                {children}
            </a>
        )
    } else {
        return (
            <button
                disabled={disabled}
                className={classes}
                {...restProps}
            >
                { icon && <Icon className={`btn-icon`} icon={icon} /> }
                { children && <span>{children}</span> }
            </button>
        )
    }
}
/** 组件的默认值 */
Button.defaultProps = {
    btnType: "default",
    disabled: false
}

export default Button
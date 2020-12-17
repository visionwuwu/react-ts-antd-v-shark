import React, { CSSProperties, FC, MouseEvent } from "react"
import classnames from "classnames"
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome"
import { library, IconProp, SizeProp, RotateProp } from '@fortawesome/fontawesome-svg-core'
import { fas } from "@fortawesome/free-solid-svg-icons"
library.add(fas)
export declare type ThemeProps = "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark"
export const displayIcons: Array<IconProp> = ["ad", "address-book", "address-card", "adjust", "air-freshener", "align-center", "align-justify", "align-left", "align-right", "allergies", "ambulance", "american-sign-language-interpreting", "anchor", "angle-double-down", "angle-double-left", "angle-double-right", "angle-double-up", "angle-down", "angle-left", "angle-right", "angle-up", "angry", "ankh", "apple-alt", "archive", "archway", "arrow-alt-circle-down", "arrow-alt-circle-left", "arrow-alt-circle-right", "arrow-alt-circle-up", "arrow-circle-down", "arrow-circle-left", "arrow-circle-right", "arrow-circle-up", "arrow-down", "arrow-left", "arrow-right", "arrow-up", "arrows-alt", "arrows-alt-h", "arrows-alt-v", "assistive-listening-systems", "asterisk", "at", "atlas", "atom", "audio-description", "award", "baby", "baby-carriage", "backspace", "backward", "bacon", "bacteria", "bacterium", "bahai", "balance-scale", "balance-scale-left", "balance-scale-right", "ban", "band-aid", "barcode", "bars", "baseball-ball", "basketball-ball", "bath", "battery-empty", "battery-full", "battery-half", "battery-quarter", "battery-three-quarters", "bed", "beer", "bell", "bell-slash", "bezier-curve", "bible", "bicycle", "biking", "binoculars", "biohazard", "birthday-cake", "blender", "blender-phone", "blind", "blog", "bold", "bolt", "bomb", "bone", "bong", "book", "book-dead", "book-medical", "book-open", "book-reader", "bookmark", "border-all", "border-none", "border-style", "bowling-ball", "box"]

export interface IconProps extends FontAwesomeIconProps {
    /**
     * 图标样式名
     */
    className?: string;
    /**
     * 图标的style样式
     */
    style?: CSSProperties;
    /**
     * 图标主题
     */
    theme?: ThemeProps;
    /**
     * 图标名称
     */
    icon: IconProp;
    /**
     * 图标尺寸
     */
    size?: SizeProp;
    /**
     * 图标旋转角度(IE9无效)
     */
    rotation?: RotateProp;
    /**
     * 是否有旋转动画
     */
    spin?: boolean;
    /**
     * 点击图标时的回调函数
     */
    onClick?: (e: MouseEvent) => void
}


/**
 * ### 基础图标
 * ~~~ts    
 * import { Icon } from "v-shark"
 * ~~~
 */
export const Icon: FC<IconProps> = (props) => {
    const {
        theme,
        className,
        ...restProps
    } = props

    const classes = classnames("v-shark-icon", className, {
        [`icon-${theme}`]: theme !== undefined
    })
    return <FontAwesomeIcon className={classes} {...restProps}></FontAwesomeIcon>
}

Icon.defaultProps = {
    theme: 'dark',
    icon: 'coffee',
    size: '3x',
    spin: false
};

export default Icon;
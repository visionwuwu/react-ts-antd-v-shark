import React, { CSSProperties, FC } from "react"
import classnames from "classnames"
import { ThemeProps } from "../Icon/icon"

export interface ProgressProps {
    /** 内容的模板函数 */
    format?: (percent: number) => any;
    /** 进度条百分比 */
    percent: number;
    /** 是否显示进度条数值 */
    showText?: boolean;
    /** 进度条高度 */
    strokeHeight?: number;
    /** 进度条的颜色 */
    strokeColor?: string;
    /** 进度条两边圆帽形状 */
    strokeLinecap?: "round" | "square";
    /** 进度条主题 */
    theme?: ThemeProps;
    /** 进度条style样式 */
    styles?: CSSProperties;
}

/**
 * ### 进度条
 * ~~~ts
 *  import { Progress } from "v-shark"
 * ~~~
 */
export const Progress: FC<ProgressProps> = (props) => {
    const {
        showText,
        strokeHeight,
        strokeColor,
        strokeLinecap,
        theme,
        styles,
        format
    } = props

    let percent = props.percent === undefined ? 0 : props.percent;
    if (percent > 100) {
        percent = 100
    } else if (percent < 0){
        percent = 0
    }

    const progressBarStyle = {
        width: `${percent}%`,
        backgroundColor: strokeColor
    }
    const classes = classnames("vshark-progress-bar-inner", {
        [`color-${theme}`]: theme,
        [`linecap-${strokeLinecap}`]: strokeLinecap
    })

    return <div data-testid="progress-bar" className="vshark-progress-bar" style={styles}>
        <div data-testid="progress-bar-outer" className="vshark-progress-bar-outer" style={{ height: `${strokeHeight}px` }}>
            <div data-testid="progress-bar-inner" className={classes} style={progressBarStyle}>
                {showText && <span className="inner-text">{ format ? format(percent) : `${percent}%`}</span>}
            </div>
        </div>
    </div>
}

Progress.defaultProps = {
    showText: true,
    strokeHeight: 12,
    theme: "primary",
    strokeLinecap: "round"
}

export default Progress
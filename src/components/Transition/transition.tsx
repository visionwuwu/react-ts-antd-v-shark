import React, { FC } from "react"
import { CSSTransition } from "react-transition-group"
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'
export declare type AnimationProps = "zoom-in-top" | "zoom-in-bottom" | "zoom-in-left" | "zoom-in-right" 

export interface BaseTransitionProps {
    /**
     * 动画外部是否包裹一层div
     */
    wrapper?: boolean;
    /**
     * 内置动画类名
     */
    animation?: AnimationProps;
    /**
     * 是否需要在初次时添加动画 (需要和in同时为true)
     */
    appear?: boolean;
    /**
     * 显示组件;触发进入和退出状态 | 如果添加了unmountOnExit={true},那么该组件会在执行退出动画结束后被移除掉
     */
    showIn?: boolean;
    /**
     * 是否在退出动画结束后移除元素
     */
    unmountOnExit?: boolean;
}

export declare type TransitionProps = CSSTransitionProps & BaseTransitionProps

/**
 * ### 过渡动画组件
 * ~~~ts
 * import { Transition } from "v-shark"
 * ~~~
 */
export const Transition: FC<TransitionProps> = (props) => {
    const {
        showIn,
        classNames,
        animation,
        children,
        wrapper,
        ...restProps
    } = props

    const classes = classNames ? classNames : animation

    return <CSSTransition in={showIn} classNames={classes} {...restProps}>
        { wrapper ? <div>{children}</div> : children }
    </CSSTransition>
}

Transition.defaultProps = {
    showIn: false,
    timeout: 500,
    wrapper: false,
    appear: true,
    unmountOnExit: true,
    animation: "zoom-in-top",
}

export default Transition
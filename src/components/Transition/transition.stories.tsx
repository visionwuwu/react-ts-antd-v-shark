import React, { useState } from "react"
import { Story, Meta } from "@storybook/react/types-6-0"
import { Transition, TransitionProps, AnimationProps } from "./transition"
import { Button } from "../Button/button"

export default {
    title: "动画组件/Transition",
    component: Transition,
    argTypes: {
        timeout: {
            control: "number",
            defaultValue: 500,
            description: "过渡动画的时间",
            table: {
                type: {
                    summary: "number"
                }
            }
        },
        classNames: {
            data: 'text',
            description: "自定义动画类名",
            control: {
                type: "text"
            }
        }
    }
} as Meta

export const BaseTransition: Story<TransitionProps> = (args) => {
    const [showIn, setShowIn] = useState(true)
    return <div style={{ height: "400px" }}>
        <Button size="lg" onClick={() => setShowIn(!showIn)}>zoom-in-top</Button>
        <br/>
        <br/>
        <Transition {...args} showIn={showIn}>
            <div>
                <p>Transition Component add default props</p>
                <p>Transition Component add default props</p>
                <p>Transition Component add default props</p>
                <p>Transition Component add default props</p>
                <p>Transition Component add default props</p>
                <p>Transition Component add default props</p>
                <p>Transition Component add default props</p>
            </div>
        </Transition>
    </div>
}
BaseTransition.storyName = "基础过渡"


export const AnimateTransition: Story<TransitionProps> = (args) => {
    enum AnimationName {
        "zoom-in-bottom",
        "zoom-in-top",
        "zoom-in-left",
        "zoom-in-right"
    }
    const [animation, setAnimation] = useState(AnimationName[0])
    const [showIn, setShowIn] = useState(true)

    const setAnimationByName = (name: AnimationProps) => {
        setAnimation(name)
        setShowIn(!showIn)
    }
    return <div style={{ height: "400px" }}>
        <div>
            <Button className="mx-1" size="lg" onClick={() => setAnimationByName("zoom-in-bottom")}>zoom-in-bottom</Button>
            <Button className="mx-1" size="lg" onClick={() => setAnimationByName("zoom-in-top")}>zoom-in-top</Button>
            <Button className="mx-1" size="lg" onClick={() => setAnimationByName("zoom-in-left")}>zoom-in-left</Button>
            <Button className="mx-1" size="lg" onClick={() => setAnimationByName("zoom-in-right")}>zoom-in-right</Button>
        </div>
        <br />
        <Transition {...args} showIn={showIn} animation={animation as AnimationProps}>
            <div>

                <p>Transition Component add animation props is zoom-in-bottom</p>
                <p>Transition Component add animation props is zoom-in-top</p>
                <p>Transition Component add animation props is zoom-in-left</p>
                <p>Transition Component add animation props is zoom-in-right</p>
                <p>Transition Component add animation props is zoom-in-right</p>
                <p>Transition Component add animation props is zoom-in-right</p>
                <p>Transition Component add animation props is zoom-in-right</p>
            </div>
        </Transition>
    </div>
}
AnimateTransition.storyName = "内置动画"

import React, { ChangeEvent, FC, ReactElement, useState, useEffect, useRef, KeyboardEvent } from "react"
import classnames from "classnames"
import { Input, InputProps } from "../Input/input"
import Icon from "../Icon/icon"
import { Transition } from "../Transition/transition"
import useDebounce from "../../hooks/useDebounce"
import useClickOutside from "../../hooks/useClickOutside"

export interface DataSourceObject {
    value: string
}
export declare type DataSourceType<T = {}> = T & DataSourceObject

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
    /**
     * 下拉菜单dropdown的className属性
     */
    dropdownClassName?: string;
    /**
     * 搜索补全项的时候调用
     */
    onSearch?: (value: string) => DataSourceType[] | Promise<DataSourceType[]>;
    /**
     * 被选中时调用，参数为选中的value值
     */
    onSelect?: (item: DataSourceType) => void;
    /**
     * 自定义渲染补全项
     */
    renderOptions?: (item: DataSourceType) => ReactElement;
}

/**
 * ### 搜索补全组件
 * ~~~ts
 * import { AutoComplete } from "v-shark"
 * ~~~
 */
export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const {
        value,
        dropdownClassName,
        className,
        onSearch,
        onSelect,
        renderOptions,
        onClear,
        ...restProps
    } = props

    const classesAutoComplete = classnames("vshark-auto-complete", className)

    const [inputValue, setInputValue] = useState<string>(value as string)
    const [options, setOptions] = useState<DataSourceType[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const [activeIndex, setActiveIndex] = useState(-1)
    const debounceValue = useDebounce(inputValue, 500)
    const triggerSearch = useRef(false)
    const autoCompleteRef = useRef(null)
    useClickOutside(autoCompleteRef, () => { 
        setShowDropdown(false)
     })

    useEffect(() => {
        if (debounceValue && triggerSearch.current) {
            setOptions([])
            if (onSearch) {
                let suggestions = onSearch(debounceValue)
                if (suggestions instanceof Promise) {
                    setLoading(true)
                    suggestions.then(data => {
                        setLoading(false)
                        setOptions(data)
                        data.length && setShowDropdown(true)
                    })
                } else {
                    setOptions(suggestions)
                    suggestions.length && setShowDropdown(true)
                }
            }
        } else {
            setShowDropdown(false)
        }
    }, [debounceValue, onSearch])

    /** Input组件change后setInputValue新值 */
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.trim()
        setInputValue(value)
        triggerSearch.current = true
    }

    const handleSelect = (item: DataSourceType) => {
        setInputValue(item.value)
        triggerSearch.current = false
        setShowDropdown(false)
        setActiveIndex(-1)
        if (onSelect) {
            onSelect(item)
        }
    }

    const handleClear = () => {
        setInputValue("")
        setShowDropdown(false)
        onClear && onClear()
    }

    const highlight = (index: number) => {
        if (index < 0) index = 0
        if (index >= options.length) {
            index = options.length - 1
        }
        setActiveIndex(index)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.keyCode) {
            case 13:
                if (options[activeIndex]) {
                    handleSelect(options[activeIndex])
                }
                break;
            case 38:
                highlight(activeIndex - 1)
                break;
            case 40:
                highlight(activeIndex + 1)
                break;
            case 27:
                setShowDropdown(false)
                break;
            default:
                break;
        }
    }

    /** options有数据生成dropdown */
    const generateDropdown = () => {
        const classesDropdown = classnames("vshark-auto-complete-dropdown", dropdownClassName)
        return (
            <Transition
                showIn={showDropdown || loading}
                timeout={300}
                animation="zoom-in-top"
            >
                <ul className={classesDropdown} data-testid="auto-complete-dropdown">
                    {loading && <div className="vshark-auto-complete-dropdown-icon"><Icon icon="spinner" spin /></div>}
                    {
                        options.map((item, index) => (
                            <li
                                key={index}
                                className={classnames("vshark-auto-complete-dropdown-item", { "is-active": activeIndex === index })}
                                onClick={() => handleSelect(item)}
                            >
                                { !renderOptions ? item.value : renderOptions(item)}
                            </li>
                        ))
                    }

                </ul>
            </Transition>
        )
    }

    return <div data-testid="auto-complete-component" className={classesAutoComplete} ref={autoCompleteRef}>
        <Input
            value={inputValue}
            onChange={handleChange}
            onClear={handleClear}
            onKeyDown={handleKeyDown}
            {...restProps}
        />
        {generateDropdown()}
    </div>
}

export default AutoComplete
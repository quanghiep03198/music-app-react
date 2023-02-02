import { useState } from "react"
import tw from "tailwind-styled-components"

const Tab = tw.a`tab ${(props) => {
    switch (props.type) {
        case "bordered":
            return "tab-bordered"
        case "lifted":
            return "tab-lifted"
        default:
            return ""
    }
}}

    ${(props) => (props.active ? "tab-active" : "")}

`
export const TabPannel = tw.div`w-full h-full flex flex-col gap-10 ${(props) => (props.active ? "" : "hidden")}`

const Tabs = ({ data, tabType }) => {
    const [currentTabIndex, setCurrentTabIndex] = useState(0)

    return (
        <div className="flex flex-col gap-10">
            <div className={`bg-transparent ${tabType === "boxed" ? "tabs tabs-boxed" : "tabs"}`}>
                {Array.isArray(data) &&
                    data.map((item, index) => (
                        <Tab type={item.type} active={currentTabIndex === index} onClick={() => setCurrentTabIndex(index)}>
                            {item.title}
                        </Tab>
                    ))}
            </div>
            {Array.isArray(data) &&
                data.map((item, index) => {
                    return <TabPannel active={currentTabIndex === index}>{item.pannelElement}</TabPannel>
                })}
        </div>
    )
}

export default Tabs

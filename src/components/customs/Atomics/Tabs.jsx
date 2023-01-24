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
export const TabPannel = tw.div`w-full h-full flex flex-col gap-10 ${(props) =>
    props.isActive ? "" : "hidden"}`

const Tabs = ({ tabData, currentTabIndex, onChangeTab, tw }) => {
    const changeTab = (tabIndex) => {
        onChangeTab(tabIndex)
    }

    return (
        <div className={`tabs bg-transparent ${tw}`}>
            {Array.isArray(tabData) &&
                tabData.map((item, index) => (
                    <Tab
                        type={item.type}
                        active={currentTabIndex === index + 1}
                        onClick={() => changeTab(index + 1)}
                    >
                        {item.children}
                    </Tab>
                ))}
        </div>
    )
}

export default Tabs

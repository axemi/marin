import { ReactNode, useState } from "react"
import "./tabs.css"
export function Tabs({items, defaultTab}:tabsProps) {
    const [selectedTab, setSelectedTab] = useState(defaultTab)
    const onTabClick = (name:string) => {
        setSelectedTab(name)
    }
    return (
        <div>
            <div className="tab-header-section">
                {items.map(item => <button className={`tab-header ${item.name == selectedTab ? "tab-header-active": ""}`} key={item.name} onClick={()=> onTabClick(item.name)}>{item.displayName}</button>)}
            </div>
            <div className="tab-content">{items.find(item => item.name == selectedTab)?.content}</div>
        </div>
    )
}


type tabsProps = {
    defaultTab:string
    items: Tab[]
}

export interface Tab {
    name: string
    displayName: string
    content: ReactNode
}
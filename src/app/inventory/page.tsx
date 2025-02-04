'use client'

import React, { useState } from 'react';
import styles from "../styles/inventory.module.css";
import styles_inv from '../styles/tray.module.css';
import {
    Input,
    Button,
    Link,
    Tabs,
    Tab
} from '@nextui-org/react';

export default function assembly() {
    const [inputValue, setInputValue] = useState("");
    const [activeTab, setActiveTab] = useState("Trays");
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleFilterClick = (filter: string) => {
        setSelectedFilters((prevFilters) =>
            prevFilters.includes(filter) ? prevFilters.filter((f) => f !== filter) : [...prevFilters, filter]
        );
    };

    const trayComponents: { title: string; id: string; tags: string[] }[] = [
        { title: "XIA-3 INSTRUMENT SET", id: "26011", tags:["Spine"] },
        { title: "XIA-3 SCREW TRAY", id: "26012", tags: ["Ortho", "General"] },
        { title: "XIA-3 INSTRUMENT SET 2", id: "26013", tags: ["General"] },
    ];
    
    const toolComponents: { title: string; id: string; tags: string[] }[] = [
        { title: "Spoon", id: "45001", tags: ["Spine"] },
        { title: "Fork", id: "45002", tags: ["Ortho"] },
        { title: "Knife", id: "45003", tags: ["General"] },
        { title: "Spatula", id: "45003", tags: ["Ortho", "Spine"] },
        { title: "Spare Kneecaps", id: "45003", tags: ["Ortho"] },
    ];

    const filters: string[] = ["Spine", "Ortho", "General"];

    const filteredItems = (activeTab === "Trays" ? trayComponents : toolComponents)
        .filter((item) => item.title.toLowerCase().includes(inputValue.toLowerCase()))
        .filter((item) => selectedFilters.length === 0 || selectedFilters.every(filter => item.tags.includes(filter)))

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>Inventory</h1>
            </div>
            <div className={styles.body}>
                <div className={styles_inv.tabs}>
                    <Tabs aria-label="Options" selectedKey={activeTab} onSelectionChange={(key) => setActiveTab(String(key))}>
                        <Tab className={`${styles_inv.tab} ${activeTab === 'Trays' ? styles.activeTab : styles.inactiveTab}`} key="Trays" title="Trays" />
                        <Tab className={`${styles_inv.tab} ${activeTab === 'Tools' ? styles.activeTab : styles.inactiveTab}`} key="Tools" title="Tools" />
                    </Tabs>
                </div>
                <hr />
                <div className={styles.search}>
                    <Input type="search" placeholder={`Search ${activeTab}`} value={inputValue} onChange={handleInputChange} />
                </div>
                <div className={styles.filters}>
                    <p className={styles.filterTitle}>Filters:</p>
                    <div className={styles.filterTabs}>
                        {filters.map((filter, index) => (
                            <button 
                            key={index} 
                            onClick={() => handleFilterClick(filter)} 
                            className={`${styles.filterBtn} ${selectedFilters.includes(filter) ? styles.selected : ""}`}>
                            {filter} {selectedFilters.includes(filter) && <span className={styles.closeIcon}>✕</span>}
                        </button>
                        ))}
                    </div>
                </div>
                <div className={styles.results}>
                    {filteredItems.length > 0 ? (
                        <div className={styles.searchedItems}>
                            {filteredItems.map((item, index) => (
                                <div key={index} className={styles.item}>
                                    <div className={styles.itemInfo}>
                                        <h3 className={styles.resultName}>{item.title}</h3>
                                        <p className={styles.id}>ID: {item.id}</p>
                                        <div className={styles.tags}>
                                            {item.tags.map((tag, idx) => (
                                                <span key={idx} className={styles.tag}>{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={styles.detailsBtn}>
                                        <Button className={"btn-primary"} as={Link} href="/inventory/tray">View Details</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No results found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};
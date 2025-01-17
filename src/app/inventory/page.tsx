'use client'

import React, { useState } from 'react';
import styles from "../styles/inventory.module.css";
import {
    Input
} from '@nextui-org/react';

export default function assembly() {
    const [inputValue, setInputValue] = useState("");
    const trays = ["XIA-3 Instrument Set", "Tray 2", "Tray 3"];
    const filteredTrays = trays.filter((tray) =>
        tray.toLowerCase().includes(inputValue.toLowerCase())
    );

    const [selectedFilter, setSelectedFilter] = useState<string | null>("Spine");
    const filters = ["Spine", "Ortho", "IDK", "what else is there", "numba5", "numba6"];
    const handleFilterClick = (filter: string) => {
        setSelectedFilter(filter === selectedFilter ? null : filter);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
      };

    const trayComponents: { title: string; id: string; tag: string }[] = [
    { title: "XIA-3 INSTRUMENT SET", id: "26011", tag: "Spine" },
    { title: "XIA-3 - SCREW TRAY", id: "26012", tag: "Spine" },
    { title: "XIA-3 INSTRUMENT SET", id: "26013", tag: "Spine" },
    ];

    return(
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>Inventory</h1>
                {/* <p>Search for instruments, trays, surgeries, and more.</p> */}
            </div>
            <div className={styles.body}>
                {/* TABS GO HERE?? */}
                <p>|    TAB1    |    TAB2   |</p>
                <hr></hr>
                <div className={styles.search}>
                    <Input type="search" placeholder="Search Trays" value={inputValue} onChange={handleInputChange}/>
                </div>
                <div className={styles.filters}>
                    <p className={styles.filterTitle}>Filters</p>
                    <div className={styles.filterTabs}>
                        {filters.map((filter, index) => (
                            <button key={index} onClick={() => handleFilterClick(filter)} className={`${styles.filterBtn} ${selectedFilter === filter ? styles.selected : ""}`}>
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
                <div className={styles.results}>
                    <p>Search Term: {inputValue}</p>
                    {filteredTrays.length > 0 ? (
                        <ul>
                            {filteredTrays.map((tray, index) => (<li key={index}>{tray}</li>))}
                        </ul>
                    ):(
                        <p>No results found.</p>
                    )}
                    <div className={styles.searchedItems}>
                    {trayComponents.map((tray, index) => (
                        <div key={index} className={styles.item}>
                            <div className={styles.itemInfo}>
                                <h3 className={styles.resultName}>{tray.title}</h3>
                                <p className={styles.id}>ID: {tray.id}</p>
                                <span className={styles.tag}>{tray.tag}</span>
                            </div>
                            <div className={styles.detailsBtn}>
                                <button className={"btn-primary"}>View Details</button>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    )
};
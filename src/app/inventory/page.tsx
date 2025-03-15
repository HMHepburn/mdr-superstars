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
} from '@heroui/react';

import { ToolModal } from '../components/ToolModal';

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

    const trayComponents: { imagePath: string; name: string; cat: string;qty: string; tags: string[]; trays: any[] }[] = [
        { imagePath: "", name: "BASIC ORTHOPAEDIC SET", cat: "26011", qty: "", tags: ["Ortho"], trays: [] },
        { imagePath: "",name: "BLEPHAROPLASTY SET", cat: "26015",qty: "", tags: ["Cosmetic"], trays: [] },
        { imagePath: "",name: "DERMATOLOGY SET", cat: "26012", qty: "",tags: ["Derm"] , trays: []},
        { imagePath: "", name: "DENTAL TRAY SET", cat: "26019", qty: "",tags: ["Dental"], trays: [] },
        
    ];
    
    
    // const toolComponents: { img: string; title: string; id: string; tags: string[]; trays: any[] }[] = [
    //         { img: "fibre-optic-cord.jpg", title: "Fibre Optic Cord", id: "A-56" , tags: ["Derm"], trays:[
    //             {name: "DERMATOLOGY SET", QTY: 1, cat: "26012"}]},
    //         { img: "baby-hohman.jpg", title: "Baby Hohman", id: "B-11" , tags:["Ortho"] , trays:[
    //             {name: "BASIC ORTHOPAEDIC SET", QTY: 1, cat: "26011"}]},
    //         { img: "hip-retractor.jpg", title: "Hip Retractor", id: "B-33" , tags: ["Dental"], trays:[
    //             {name: "DENTAL TRAY SET", QTY: 1, cat: "26019"}]},
    //         { img: "hemoclip-applier.jpg", title: "Hemoclip Applier", id: "B-54", tags: ["Cosmetic"], trays:[
    //             {name: "BLEPHAROPLASTY SET", QTY: 1, cat: "26015"}] },
    //         { img: "needle-driver.jpg", title: "Needle Driver", id: "C-41" , tags: ["Dental"], trays:[
    //             {name: "DENTAL TRAY SET", QTY: 1, cat: "26019"}]},
    //         { img: "metz-scissor.jpg", title: "Metz Scissor", id: "C-12" , tags: ["Cosmetic"], trays:[
    //             {name: "BLEPHAROPLASTY SET", QTY: 1, cat: "26015"}]},
    //         { img: "bayonet-forcep.jpg", title: "Bayonet Forcep", id: "D-30", tags: ["Cosmetic"] , trays:[
    //             {name: "BLEPHAROPLASTY SET", QTY: 1, cat: "26015"}]},
    //         { img: "mirror1.jpg", title: "Mirror", id: "D-22" , tags:["Ortho", "Dental", "Derm", "Cosmetic"], trays:[
    //             {name: "BASIC ORTHOPAEDIC SET", QTY: 1, cat: "26011"},
    //             {name: "DENTAL TRAY SET", QTY: 2, cat: "26019"}, 
    //             {name: "BLEPHAROPLASTY SET", QTY: 1, cat: "26015"},
    //                 {name: "DERMATOLOGY SET", QTY: 1, cat: "26012"}]},
    //         { img: "debakey-forcep.jpg", title: "Debakey Forcep", id: "E-17" , tags:["Ortho"] , trays:[
    //             {name: "BASIC ORTHOPAEDIC SET", QTY: 1, cat: "26011"}]},
    //         { img: "bone-hook.jpg", title: "Bone Hook", id: "E-65" , tags: ["Cosmetic"], trays:[
    //             {name: "BLEPHAROPLASTY SET", QTY: 1, cat: "26015"}]},
    //         { img: "lap-handle.jpg", title: "Lap Handle", id: "F-45", tags:["Ortho"] , trays:[
    //             {name: "BASIC ORTHOPAEDIC SET", QTY: 1, cat: "26011"}] },
    //         { img: "alignment-guide.jpg", title: "Alignment Guide", id: "G-23", tags: ["Derm"], trays:[
    //             {name: "DERMATOLOGY SET", QTY: 1, cat: "26012"}] },
    //         { img: "tonsil-gag.jpg", title: "Tonsil Gag", id: "H-38" , tags: ["Derm"], trays:[
    //             {name: "DERMATOLOGY SET", QTY: 1, cat: "26012"}]},
    //         { img: "scalpel-handle1.jpg", title: "Scalpel Handle", id: "I-50" , tags: ["Dental", "Cosmetic"], trays:[
    //             {name: "DENTAL TRAY SET", QTY: 1, cat: "26019"}]},
    //         { img: "electrosurgery-bipolar-forceps.jpg", title: "Electrosurgery Bipolar Foreceps", id: "J-16" , tags:["Ortho"], trays:[
    //             {name: "BASIC ORTHOPAEDIC SET", QTY: 1, cat: "26011"}]},
    //         { img: "angled-serrated-forceps.jpg", title: "Angled Serrated Forceps", id: "J-19" , tags: ["Cosmetic"], trays:[
    //             {name: "BLEPHAROPLASTY SET", QTY: 1, cat: "26015"}] },
    //         { img: "tweezer-tissue-forceps.jpg", title: "Tweezer Tissue Forceps", id: "K-24" , tags: ["Cosmetic"], trays:[
    //             {name: "BLEPHAROPLASTY SET", QTY: 1, cat: "26015"}]},
    //         { img: "skin-hook.jpg", title: "Skin Hook", id: "K-50" , tags: ["Derm"], trays:[
    //             {name: "DERMATOLOGY SET", QTY: 1, cat: "26012"}]},
    //         { img: "needle-holder.jpg", title: "Needle Holder", id: "L-12" , tags: ["Dental"], trays:[
    //             {name: "DENTAL TRAY SET", QTY: 1, cat: "26019"}]},
    //         { img: "broach-handle1.jpg", title: "Broach Handle", id: "M-42" , tags:["Ortho", "Derm"], trays:[
    //             {name: "BASIC ORTHOPAEDIC SET", QTY: 1, cat: "26011"}]},
    //         { img: "wire-and-pin1.jpg", title: "Wire And Pin", id: "N-66", tags:["Ortho","Derm"], trays:[
    //             {name: "BASIC ORTHOPAEDIC SET", QTY: 1, cat: "26011"},
    //                 {name: "DERMATOLOGY SET", QTY: 3, cat: "26012"}] },
    //         { img: "ear-syringe.jpg", title: "Ear Syringe", id: "O-10" , tags: ["Cosmetic"], trays:[
    //             {name: "BLEPHAROPLASTY SET", QTY: 1, cat: "26015"}]},
    //         { img: "suction-tube1.jpg", title: "Suction Tube", id: "P-30" , tags:["Ortho", "Dental"], trays:[
    //             {name: "BASIC ORTHOPAEDIC SET", QTY: 1, cat: "26011"},
    //             {name: "DENTAL TRAY SET", QTY: 2, cat: "26019"}]},
    //         { img: "miltex-forceps.jpg", title: "Miltex Forceps", id: "Q-27" , tags:["Ortho"], trays:[
    //             {name: "BASIC ORTHOPAEDIC SET", QTY: 1, cat: "26011"}]},
    //         { img: "scope-element.jpg", title: "Scope Element", id: "R-18" , tags:["Ortho"] , trays:[
    //             {name: "BASIC ORTHOPAEDIC SET", QTY: 1, cat: "26011"}]},
    //         { img: "straight-needle-holder.jpg", title: "Straight Needle Holder", id: "S-40", tags: ["Cosmetic"] , trays:[
    //             {name: "BLEPHAROPLASTY SET", QTY: 1, cat: "26015"}]},
    //         { img: "dilator1.jpg", title: "Dilator", id: "T-28" , tags: ["Dental"], trays:[
    //             {name: "DENTAL TRAY SET", QTY: 2, cat: "26019"}]},
    //         { img: "baron-suction-tube.jpg", title: "Baron Suction Tube", id: "U-35", tags: ["Derm"] , trays:[
    //             {name: "DERMATOLOGY SET", QTY: 1, cat: "26012"}]},
    //         { img: "laproscopic-insufflation-instrument.jpg", title: "Laproscopic Insufflation Instrument", id: "V-49" , tags: ["Cosmetic"], trays:[
    //             {name: "BLEPHAROPLASTY SET", QTY: 1, cat: "26015"}]},
    //         { img: "yankauer-suction-tube.jpg", title: "Yankauer Suction Tube", id: "W-21" , tags:["Ortho"], trays:[
    //             {name: "BASIC ORTHOPAEDIC SET", QTY: 1, cat: "26011"}]},
    //         { img: "sponge-holding-cotton-swab-forceps.jpg", title: "Sponge Holding Cotton Swab Forceps", id: "X-44" , tags: ["Dental"], trays:[
    //             {name: "DENTAL TRAY SET", QTY: 1, cat: "26019"}]},
    //         { img: "backhaus-towel-forceps2.jpg", title: "Backhaus Towel Forceps", id: "Y-13" , tags:["Ortho"], trays:[
    //             {name: "BASIC ORTHOPAEDIC SET", QTY: 1, cat: "26011"}]},
    //         { img: "bone-clamp.jpg", title: "Bone Clamp", id: "Z-36" , tags:["Ortho"], trays:[
    //             {name: "BASIC ORTHOPAEDIC SET", QTY: 1, cat: "26011"}]},
    //         { img: "bipolar-forceps.jpg", title: "Bipolar Forceps", id: "A1-20", tags: ["Derm"] , trays:[
    //             {name: "DERMATOLOGY SET", QTY: 1, cat: "26012"}]},
    //         { img: "backhaus-towel-forceps.jpg", title: "Backhaus Towel Forceps", id: "B1-37" , tags: ["Cosmetic"], trays:[
    //             {name: "BLEPHAROPLASTY SET", QTY: 1, cat: "26015"}]},
    //         { img: "nasal-chisel.jpg", title: "Nasal Chisel", id: "C1-39", tags: ["Dental"], trays:[
    //             {name: "DENTAL TRAY SET", QTY: 1, cat: "26019"}]},
    //         { img: "kerrison-rongeur.jpg", title: "Kerrison Rongeur", id: "E1-15", tags: ["Derm"], trays:[
    //             {name: "DERMATOLOGY SET", QTY: 1, cat: "26012"}]},
    //         { img: "periosteal-elevator.jpg", title: "Periosteal Elevator", id: "F1-34", tags: [], trays:[] }
    // ];

    const toolComponents: { imagePath: string; name: string; cat: string; qty: string; tags: string[]; trays: any[] }[] = [
    {name: "Bone Hook", cat: "I-71", imagePath: "/tools/bone-hook.jpg" , qty: "1" , tags: ["Cosmetic"], trays:
        [{id: "4oDzNiAA8AARSGq0", set: "BLEPHAROPLASTY" ,status: "GOOD", numCycles: 40 }]
    },
    { name: "Debakey Forcep", cat: "G-63", imagePath: "/tools/debakey-forcep.jpg" , qty: "1", tags: ["Ortho"], trays:
        [{id: "4oDzNiAA8AARSGUq", set: "ORTHOPAEDIC" ,status: "GOOD", numCycles: 243 }]},
    { name: "Hemoclip Applier", cat: "B-54", imagePath: "/tools/hemoclip-applier.jpg", qty: "1" , tags: ["Cosmetic"], trays:
        [{id: "4oDzNiAA8AARSIjQ", set: "BLEPHAROPLASTY" ,status: "GOOD", numCycles: 598 }]},
    { name: "Tonsil Gag", cat: "K-14", imagePath: "/tools/tonsil-gag.jpg" , qty: "1", tags: ["Derm"], trays:
        [{id: "4oDzNiAA8AARSJqj", set: "DERMATOLOGY" ,status: "GOOD", numCycles: 370 }]},
    { name: "Metz Scissor", cat: "C-50", imagePath: "/tools/metz-scissor.jpg", qty: "1" , tags: ["Cosmetic"], trays:
        [{id: "4oDzNiAA8AARSIGF", set: "BLEPHAROPLASTY" ,status: "CHECK", numCycles: 790 }]},
    { name: "Baby Hohman", cat: "B-11", imagePath: "/tools/baby-hohman.jpg" , qty: "1", tags: ["Ortho"], trays:
        [{ id: "4oDzNiAA8AARSHX/", set: "ORTHOPAEDIC" ,status: "GOOD", numCycles: 234 }]},
    { name: "Fibre Optic Cord", cat: "A-56", imagePath: "/tools/fibre-optic-cord.jpg", qty: "1", tags: ["Derm"], trays:
        [{id: "4oDzNiAA8AARSF+v", set: "DERMATOLOGY" ,status: "GOOD", numCycles: 347 }] },
    { name: "Hip Retractor", cat: "B-33", imagePath: "/tools/hip-retractor.jpg" , qty: "1", tags: ["Dental"], trays:
        [{ id: "4oDzNiAA8AARSFQt", set: "DENTAL" ,status: "GOOD", numCycles: 190 }]},
    { name: "Mirror", cat: "E-14", imagePath: "/tools/mirror.jpg" , qty: "5", tags: ["Cosmetic", "Derm", "Dental", "Ortho"], trays:
        [{id: "4oDzNiAA8AARSJSo",  set: "BLEPHAROPLASTY" ,status: "GOOD", numCycles: 269 },
         {id: "4oDzNiAA8AARSCwp", set: "DERMATOLOGY" ,status: "GOOD", numCycles: 245 }, 
         {id: "4oDzNiAA8AARSBrx", set: "DENTAL" ,status: "GOOD", numCycles: 202 },
         {id: "4oDzNiAA8AARSA5J", set: "ORTHOPAEDIC" ,status: "GOOD", numCycles: 20 },
         {id: "4oDzNiAA8AARSAk7", set: "" ,status: "MISSING", numCycles: 567 }
        ]},
    { name: "Lap Handle", cat: "J-55", imagePath: "/tools/lap-handle.jpg" , qty: "1", tags: ["Ortho"], trays:
        [{ id: "4oDzNiAA8AARSI63", set: "ORTHOPAEDIC" ,status: "GOOD", numCycles: 489 }]},
    { name: "Scalpel Handle", cat: "L-22", imagePath: "/tools/scalpel-handle.jpg" , qty: "2", tags: ["Cosmetic", "Dental"], trays:
        [{ id: "4oDzNiAA8AARSErI", set: "BLEPHAROPLASTY" ,status: "CHECK", numCycles: 698 },
         { id: "4oDzNiAA8AARSBFj", set: "DENTAL" ,status: "GOOD", numCycles: 20 }
        ]},
    { name: "Needle Driver", cat: "C-41", imagePath: "/tools/needle-driver.jpg" , qty: "1", tags: ["Dental"], trays:
        [{ id: "4oDzNiAA8AARSHu7", set: "DENTAL" ,status: "GOOD", numCycles: 290 }]},
    { name: "Bayonet Forcep", cat: "C-87", imagePath: "/tools/bayonet-forcep.jpg" , qty: "1", tags: ["Cosmetic"], trays:
        [{ id: "4oDzNiAA8AARSS62", set: "BLEPHAROPLASTY" ,status: "GOOD", numCycles: 546 }]},
    {  name: "Electrosurgery Bipolar Foreceps", cat: "L-29", imagePath: "/tools/electrosurgery-bipolar-forceps.jpg", qty: "1", tags: ["Ortho"], trays:
        [{id: "4oDzNiAA8AARSED1", set: "ORTHOPAEDIC" ,status: "GOOD", numCycles: 20 }] },
    {  name: "Angled Serrated Forceps", cat: "L-45", imagePath: "/tools/angled-serrated-forceps.jpg", qty: "1" , tags: ["Cosmetic"], trays:
        [{id: "4oDzNiAA8AARSWbj", set: "BLEPHAROPLASTY" ,status: "GOOD", numCycles: 560 }]},
    {  name: "Tweezer Tissue Forceps", cat: "L-9", imagePath: "/tools/tweezer-tissue-forceps.jpg", qty: "1", tags: ["Cosmetic"], trays:
        [{id: "4oDzNiAA8AARSAnT", set: "BLEPHAROPLASTY" ,status: "GOOD", numCycles: 178 }] },
    {  name: "Skin Hook", cat: "M-35", imagePath: "/tools/skin-hook.jpg", qty: "1" , tags: ["Derm"], trays:
        [{id: "4oDzNiAA8AARSBgz", set: "DERMATOLOGY" ,status: "GOOD", numCycles: 634 }]},
    {  name: "Needle Holder", cat: "N-14", imagePath: "/tools/needle-holder.jpg" , qty: "1", tags: ["Dental"], trays:
        [{id: "4oDzNiAA8AARSUKE", set: "DENTAL" ,status: "GOOD", numCycles: 145 }]},
    {  name: "Broach Handle", cat: "N-57", imagePath: "/tools/broach-handle.jpg" , qty: "2", tags: ["Derm", "Ortho"], trays:
        [{id: "4oDzNiAA8AARSDdv", set: "DERMATOLOGY" ,status: "GOOD", numCycles: 349 }, 
         {id: "4oDzNiAA8AARSDLU", set: "ORTHOPAEDIC" ,status: "GOOD", numCycles: 309 },
         {id: "4oDzNiAA8AARSVds", set: "" ,status: "GOOD", numCycles: 279 },
         {id: "4oDzNiAA8AARSDLU", set: "ORTHOPAEDIC" ,status: "GOOD", numCycles: 347 }]},
    {  name: "Wire And Pin", cat: "P-10", imagePath: "/tools/wire-and-pin.jpg", qty: "4" , tags: ["Derm", "Ortho"], trays:
        [{id: "4oDzNiAA8AARSBMD", set: "DERMATOLOGY" ,status: "GOOD", numCycles: 542 },
         {id: "4oDzNiAA8AARSDdw", set: "ORTHOPAEDIC" ,status: "GOOD", numCycles: 156 },
         {id: "4oDzNiAA8AARSAcS", set: "DERMATOLOGY" ,status: "GOOD", numCycles: 560 },
         {id: "4oDzNiAA8AARSVds", set: "DERMATOLOGY" ,status: "GOOD", numCycles: 145 }]},
    {  name: "Ear Syringe", cat: "P-51", imagePath: "/tools/ear-syringe.jpg" , qty: "1", tags: ["Cosmetic"], trays:
        [{id: "4oDzNiAA8AARSTx1", set: "BLEPHAROPLASTY" ,status: "GOOD", numCycles: 234 }]},
    {  name: "Suction Tube", cat: "Q-76", imagePath: "/tools/suction-tube.jpg" , qty: "3", tags: ["Dental", "Ortho"], trays:
        [{id: "4oDzNiAA8AARSARG", set: "DENTAL" ,status: "GOOD", numCycles: 531 },
         {id: "4oDzNiAA8AARSAWz", set: "ORTHOPAEDIC" ,status: "GOOD", numCycles: 123 },
         {id: "4oDzNiAA8AARSB7B", set: "" ,status: "GOOD", numCycles: 634 }]},
    {  name: "Miltex Forceps", cat: "S-1", imagePath: "/tools/miltex-forceps.jpg" , qty: "1", tags: ["Ortho"], trays:
        [{id: "4oDzNiAA8AARSAxe", set: "ORTHOPAEDIC" ,status: "GOOD", numCycles: 256 }]},
    {  name: "Scope Element", cat: "S-32", imagePath: "/tools/scope-element.jpg" , qty: "1", tags: ["Ortho"], trays:
        [{id: "4oDzNiAA8AARSBvi", set: "ORTHOPAEDIC" ,status: "GOOD", numCycles: 234 }]},
    {  name: "Straight Needle Holder", cat: "S-31", imagePath: "/tools/straight-needle-holder.jpg" , qty: "1", tags: ["Cosmetic"], trays:
        [{id: "4oDzNiAA8AARSAVK", set: "BLEPHAROPLASTY" ,status: "GOOD", numCycles: 12 }]},
    {  name: "Dilator", cat: "S-40", imagePath: "/tools/dilator.jpg" , qty: "3", tags: ["Dental"], trays:
        [{id: "4oDzNiAA8AARSBdN", set: "DENTAL" ,status: "GOOD", numCycles: 457 },
         {id: "4oDzNiAA8AARSCO8",  set: "" ,status: "GOOD", numCycles: 34 },
         {id: "4oDzNiAA8AARSBA4", set: "" ,status: "GOOD", numCycles: 123 }
        ]},
    {  name: "Baron Suction Tube", cat: "T-61", imagePath: "/tools/baron-suction-tube.jpg", qty: "1", tags: ["Derm"], trays:
        [{id: "4oDzNiAA8AARSDLV", set: "DERMATOLOGY" ,status: "GOOD", numCycles: 654 }] },
    {  name: "Laproscopic Insufflation Instrument", cat: "U-74", imagePath: "/tools/laproscopic-insufflation-instrument.jpg", qty: "1" , tags: ["Cosmetic"], trays:
        [{id: "4oDzNiAA8AARSAeV", set: "BLEPHAROPLASTY" ,status: "GOOD", numCycles: 450 }]},
    {  name: "Yankauer Suction Tube", cat: "V-23", imagePath: "/tools/yankauer-suction-tube.jpg", qty: "1", tags: ["Ortho"], trays:
        [{id: "4oDzNiAA8AARSVAD", set: "ORTHOPAEDIC" ,status: "GOOD", numCycles: 290 }] },
    {  name: "Sponge Holding Cotton Swab Forceps", cat: "W-27", imagePath: "/tools/sponge-holding-cotton-swab-forceps.jpg" , qty: "1", tags: ["Dental"], trays:
        [{id: "4oDzNiAA8AARSDwm", set: "DENTAL" ,status: "GOOD", numCycles: 456 }]},
    {  name: "Bone Clamp", cat: "X-34", imagePath: "/tools/bone-clamp.jpg", qty: "1" , tags: ["Ortho"], trays:
        [{id: "4oDzNiAA8AARSUiK", set: "ORTHOPAEDIC" ,status: "GOOD", numCycles: 254 }]},
    {  name: "Bipolar Forceps", cat: "X-59", imagePath: "/tools/bipolar-forceps.jpg", qty: "1" , tags: ["Derm"], trays:
        [{id: "4oDzNiAA8AARSAu0", set: "DERMATOLOGY" ,status: "GOOD", numCycles: 432 }]},
    {  name: "Backhaus Towel Forceps", cat: "X-81", imagePath: "/tools/backhaus-towel-forceps.jpg" , qty: "2", tags: ["Cosmetic", "Ortho"], trays:
        [{id: "4oDzNiAA8AARSC1B", set: "BLEPHAROPLASTY" ,status: "GOOD", numCycles: 230 },
         {id: "4oDzNiAA8AARSB+7", set: "ORTHOPAEDIC" ,status: "GOOD", numCycles: 456 }]},
    {  name: "Nasal Chisel", cat: "Y-28", imagePath: "/tools/nasal-chisel.jpg", qty: "1" , tags: ["Dental"], trays:
        [{id: "4oDzNiAA8AARSA9B", set: "DENTAL" ,status: "GOOD", numCycles: 34 }]},
    { name: "Kerrison Rongeur", cat: "Y-87", imagePath: "/tools/kerrison-rongeur.jpg", qty: "1" , tags: ["Derm"], trays:
        [{ id: "4oDzNiAA8AARSCbT", set: "DERMATOLOGY" ,status: "GOOD", numCycles: 22 }]},
    {  name: "Periosteal Elevator", cat: "Z-3", imagePath: "/tools/periosteal-elevator.jpg" , qty: "1", tags: [""], trays:
        [{ id: "4oDzNiAA8AARSWEh", set: "" ,status: "CHECK", numCycles: 700 }]},
    { name: "Alignment Guide", cat: "K-10", imagePath: "/tools/alignment-guide.jpg" , qty: "1", tags: ["Derm"], trays:
        [{ id: "4oDzNiAA8AARSEXX", set: "DERMATOLOGY" ,status: "GOOD", numCycles: 202 }]},
  ];

    // id, status, cycles, cat, name

    const filters: string[] = ["Derm", "Ortho", "Dental", "Cosmetic"];

    const filteredItems = (activeTab === "Trays" ? trayComponents : toolComponents)
        .filter((item) => item.name.toLowerCase().includes(inputValue.toLowerCase()))
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
                <p className={styles.filterTitle}>Results:</p>
                <div className={styles.results}>
                    {filteredItems.length > 0 ? (
                        <div className={styles.searchedItems}>
                            {filteredItems.map((item, index) => (
                                <div key={index} className={styles.item}>
                                    <div className={styles.itemInfo}>
                                        <h3 className={styles.resultName}>{item.name}</h3>
                                        <p className={styles.id}>CAT #: {item.cat}</p>
                                        <div className={styles.tags}>
                                            {item.tags.map((tag, idx) => (
                                                <span key={idx} className={styles.tag}>{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={styles.detailsBtn}>
                                        {activeTab == 'Tools' ?
                                            <ToolModal toolInfo={item} tray={item.trays} />
                                            :<Button className={"btn-primary"} as={Link} href="/inventory/tray">View Details</Button>
                                        }
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
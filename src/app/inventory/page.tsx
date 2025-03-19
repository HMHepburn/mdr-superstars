'use client'

import React, { useEffect, useState } from 'react';
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

type Tool = {
    id: string;
    name: string;
    cat: string;
    imagePath: string;
    // trays: any[]; // Add trays property
  };
  
type ToolComponent = { 
    imagePath: string; 
    name: string; 
    cat: string; 
    qty: string; 
    tags: string[];
    trays: any[] }
    
export default function assembly() {
    const [inputValue, setInputValue] = useState("");
    const [activeTab, setActiveTab] = useState("Tools");
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [detectedTools, setDetectedTools] = useState<ToolComponent[]>([]);

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

    const toolComponents: ToolComponent[] = [
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

    const tools: Tool[] = [
        { id: "4oDzNiAA8AARSGq0", name: "Bone Hook", cat: "I-71", imagePath: "/tools/bone-hook.jpg" },
        { id: "4oDzNiAA8AARSGUq", name: "Debakey Forcep", cat: "G-63", imagePath: "/tools/debakey-forcep.jpg" },
        { id: "4oDzNiAA8AARSIjQ", name: "Hemoclip Applier", cat: "B-54", imagePath: "/tools/hemoclip-applier.jpg" },
        { id: "4oDzNiAA8AARSJqj", name: "Tonsil Gag", cat: "K-14", imagePath: "/tools/tonsil-gag.jpg" },
        { id: "4oDzNiAA8AARSIGF", name: "Metz Scissor", cat: "C-50", imagePath: "/tools/metz-scissor.jpg" },
        { id: "4oDzNiAA8AARSHX/", name: "Baby Hohman", cat: "B-11", imagePath: "/tools/baby-hohman.jpg" },
        { id: "4oDzNiAA8AARSF+v", name: "Fibre Optic Cord", cat: "A-56", imagePath: "/tools/fibre-optic-cord.jpg" },
        { id: "4oDzNiAA8AARSFQt", name: "Hip Retractor", cat: "B-33", imagePath: "/tools/hip-retractor.jpg" },
        { id: "4oDzNiAA8AARSJSo", name: "Mirror", cat: "E-14", imagePath: "/tools/mirror.jpg" },
        { id: "4oDzNiAA8AARSCwp", name: "Mirror", cat: "E-14", imagePath: "/tools/mirror.jpg" },
        { id: "4oDzNiAA8AARSBrx", name: "Mirror", cat: "E-14", imagePath: "/tools/mirror.jpg" },
        { id: "4oDzNiAA8AARSA5J", name: "Mirror", cat: "E-14", imagePath: "/tools/mirror.jpg" },
        { id: "4oDzNiAA8AARSAk7", name: "Mirror", cat: "E-14", imagePath: "/tools/mirror.jpg" },
        { id: "4oDzNiAA8AARSI63", name: "Lap Handle", cat: "J-55", imagePath: "/tools/lap-handle.jpg" },
        { id: "4oDzNiAA8AARSErI", name: "Scalpel Handle", cat: "L-22", imagePath: "/tools/scalpel-handle.jpg" },
        { id: "4oDzNiAA8AARSBFj", name: "Scalpel Handle", cat: "L-22", imagePath: "/tools/scalpel-handle.jpg" },
        { id: "4oDzNiAA8AARSHu7", name: "Needle Driver", cat: "C-41", imagePath: "/tools/needle-driver.jpg" },
        { id: "4oDzNiAA8AARSS62", name: "Bayonet Forcep", cat: "C-87", imagePath: "/tools/bayonet-forcep.jpg" },
        { id: "4oDzNiAA8AARSED1", name: "Electrosurgery Bipolar Foreceps", cat: "L-29", imagePath: "/tools/electrosurgery-bipolar-forceps.jpg" },
        { id: "4oDzNiAA8AARSWbj", name: "Angled Serrated Forceps", cat: "L-45", imagePath: "/tools/angled-serrated-forceps.jpg" },
        { id: "4oDzNiAA8AARSAnT", name: "Tweezer Tissue Forceps", cat: "L-9", imagePath: "/tools/tweezer-tissue-forceps.jpg" },
        { id: "4oDzNiAA8AARSBgz", name: "Skin Hook", cat: "M-35", imagePath: "/tools/skin-hook.jpg" },
        { id: "4oDzNiAA8AARSUKE", name: "Needle Holder", cat: "N-14", imagePath: "/tools/needle-holder.jpg" },
        { id: "4oDzNiAA8AARSDdv", name: "Broach Handle", cat: "N-57", imagePath: "/tools/broach-handle.jpg" },
        { id: "4oDzNiAA8AARSDLU", name: "Broach Handle", cat: "N-87", imagePath: "/tools/broach-handle.jpg" },
        { id: "4oDzNiAA8AARSBMD", name: "Wire And Pin", cat: "P-10", imagePath: "/tools/wire-and-pin.jpg" },
        { id: "4oDzNiAA8AARSDdw", name: "Wire And Pin", cat: "P-29", imagePath: "/tools/wire-and-pin.jpg" },
        { id: "4oDzNiAA8AARSTx1", name: "Ear Syringe", cat: "P-51", imagePath: "/tools/ear-syringe.jpg" },
        { id: "4oDzNiAA8AARSVds", name: "Wire And Pin", cat: "P-59", imagePath: "/tools/wire-and-pin.jpg" },
        { id: "4oDzNiAA8AARSARG", name: "Suction Tube", cat: "Q-76", imagePath: "/tools/suction-tube.jpg" },
        { id: "4oDzNiAA8AARSAWz", name: "Suction Tube", cat: "Q-76", imagePath: "/tools/suction-tube.jpg" },
        { id: "4oDzNiAA8AARSB7B", name: "Suction Tube", cat: "Q-76", imagePath: "/tools/suction-tube.jpg" },
        { id: "4oDzNiAA8AARSAxe", name: "Miltex Forceps", cat: "S-1", imagePath: "/tools/miltex-forceps.jpg" },
        { id: "4oDzNiAA8AARSBvi", name: "Scope Element", cat: "S-32", imagePath: "/tools/scope-element.jpg" },
        { id: "4oDzNiAA8AARSAVK", name: "Straight Needle Holder", cat: "S-31", imagePath: "/tools/straight-needle-holder.jpg" },
        { id: "4oDzNiAA8AARSBdN", name: "Dilator", cat: "S-40", imagePath: "/tools/dilator.jpg" },
        { id: "4oDzNiAA8AARSCO8", name: "Dilator", cat: "S-40", imagePath: "/tools/dilator.jpg" },
        { id: "4oDzNiAA8AARSBA4", name: "Dilator", cat: "S-40", imagePath: "/tools/dilator.jpg" },
        { id: "4oDzNiAA8AARSDLV", name: "Baron Suction Tube", cat: "T-61", imagePath: "/tools/baron-suction-tube.jpg" },
        { id: "4oDzNiAA8AARSAeV", name: "Laproscopic Insufflation Instrument", cat: "U-74", imagePath: "/tools/laproscopic-insufflation-instrument.jpg" },
        { id: "4oDzNiAA8AARSVAD", name: "Yankauer Suction Tube", cat: "V-23", imagePath: "/tools/yankauer-suction-tube.jpg" },
        { id: "4oDzNiAA8AARSDwm", name: "Sponge Holding Cotton Swab Forceps", cat: "W-27", imagePath: "/tools/sponge-holding-cotton-swab-forceps.jpg" },
        { id: "4oDzNiAA8AARSC1B", name: "Backhaus Towel Forceps", cat: "W-74", imagePath: "/tools/backhaus-towel-forceps.jpg" },
        { id: "4oDzNiAA8AARSUiK", name: "Bone Clamp", cat: "X-34", imagePath: "/tools/bone-clamp.jpg" },
        { id: "4oDzNiAA8AARSAu0", name: "Bipolar Forceps", cat: "X-59", imagePath: "/tools/bipolar-forceps.jpg" },
        { id: "4oDzNiAA8AARSB+7", name: "Backhaus Towel Forceps", cat: "X-81", imagePath: "/tools/backhaus-towel-forceps.jpg" },
        { id: "4oDzNiAA8AARSA9B", name: "Nasal Chisel", cat: "Y-28", imagePath: "/tools/nasal-chisel.jpg" },
        { id: "4oDzNiAA8AARSAcS", name: "Wire And Pin", cat: "Y-40", imagePath: "/tools/wire-and-pin.jpg" },
        { id: "4oDzNiAA8AARSCbT", name: "Kerrison Rongeur", cat: "Y-87", imagePath: "/tools/kerrison-rongeur.jpg" },
        { id: "4oDzNiAA8AARSWEh", name: "Periosteal Elevator", cat: "Z-3", imagePath: "/tools/periosteal-elevator.jpg" },
        { id: "4oDzNiAA8AARSEXX", name: "Alignment Guide", cat: "K-10", imagePath: "/tools/alignment-guide.jpg" },
      ];

    // id, status, cycles, cat, name

    
    useEffect(() => {
      const ws = new WebSocket("ws://localhost:8080");
    
      ws.onopen = () => console.log("WebSocket connection established.");
    
      ws.onmessage = (event) => {
        console.log("WebSocket message received:", event.data);
        try {
          const data = JSON.parse(event.data);
    
          if (data.tags && Array.isArray(data.tags)) {
            console.log("Received RFID Tags:", data.tags);

            // ✅ Detect Tools
            const matchingTools = tools
              .filter((tool) => data.tags.includes(tool.id))
              .map((tool) => ({
                ...tool,
                id: tool.id, // Assign a unique id
              }));
    
              const matchingToolComponents = toolComponents
              .filter((tool) => matchingTools.map((t) => t.cat).includes(tool.cat)) // Ensure matchingTools contains 'cat' values
              .map((toolComponent) => ({
                ...toolComponent,
                id: toolComponent.cat, // Assign 'cat' as a unique id
              }));
    
            console.log("Matching Tools Found:", matchingTools);
            setDetectedTools(matchingToolComponents);
            console.log("tool commponents", matchingToolComponents);
          }
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };
    
      ws.onerror = (error) => console.error("WebSocket error:", error);
      ws.onclose = () => console.log("WebSocket connection closed.");
    
      return () => ws.close();
    }, []);
    

    const filters: string[] = ["Derm", "Ortho", "Dental", "Cosmetic"];

    const filteredItems = (activeTab === "Tools" ?  toolComponents : trayComponents)
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
                         <Tab className={`${styles_inv.tab} ${activeTab === 'Tools' ? styles.activeTab : styles.inactiveTab}`} key="Tools" title="Tools" />
                        <Tab className={`${styles_inv.tab} ${activeTab === 'Trays' ? styles.activeTab : styles.inactiveTab}`} key="Trays" title="Trays" />
                    </Tabs>
                </div>
                <hr />
                <div className={styles.search}>
                    <Input type="search" placeholder={`Search ${activeTab}`} value={inputValue} onChange={handleInputChange} />
                </div>

            {activeTab == 'Tools' ?
                <>
                <div className={styles.results}>
                    {detectedTools.length > 0 ? (
                    <>
                    <br></br>
                    <p className={styles.filterTitle}>Detected Tools:</p>
                    <div className={styles.searchedItems}>
                    {detectedTools.map((item, index) => (
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
                                <ToolModal toolInfo={item} tray={item.trays} />
                             </div>
                         </div>
                        ))}
                    </div>
                    </>
                    ) : (
                        <>
                        <br></br>
                        <i style={{margin: "1rem 0"}}>No tools currently detected. Scan tool to view details.</i>
                        </>
                    )}
                </div>
                </>:<></>}
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
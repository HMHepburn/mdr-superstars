'use client'
import Image from "next/image";
import styles from "../styles/assembly.module.css";
import styles_inv from "../styles/tray.module.css"
import React, { useState , useEffect, useRef} from 'react';
import { CompleteModal } from '../components/CompleteModal';
import { TrayInformation } from '../components/TrayInformation';
import { MissingTool } from '../components/MissingTool';
import {
  Button, Accordion, AccordionItem
} from "@heroui/react";
//import trayImage from "../assets/XIA_tray_image.png";

type Item = {
  id: string;
  name: string;
  label: string;
  cat: string;
};

export default function assembly() {
  const [correctActive, setCorrectActive] = useState<string | null>(null);
  const [incorrectActive, setIncorrectActive] = useState<string | null>('incorrectItems');
  const [missingActive, setMissingActive] = useState<string | null>('missingItems');

  // TEMPORARY ARRAY OF RFID TAGS FROM WEBSOCKET
  const [rfidTags, setRfidTags] = useState<string[]>([]);

  const toggleSection = (id: string) => {
    setIncorrectActive(prev => (id === 'incorrectItems' ? (prev === id ? null : id) : prev));
    setMissingActive(prev => (id === 'missingItems' ? (prev === id ? null : id) : prev));
    setCorrectActive(prev => (id === 'correctItems' ? (prev === id ? null : id) : prev));
  };
  const [trayData, setTrayData] = useState<any>([]);
  // const [correctItems, setCorrectItems] = useState([]);
  // const [incorrectItems, setIncorrectItems] = useState([]);
  // const [missingItems, setMissingItems] = useState([]);

  const [correctItems, setCorrectItems] = useState<Item[]>([]);
  const [missingItems, setMissingItems] = useState<Item[]>([]);
  const [incorrectItems, setIncorrectItems] = useState<Item[]>([]);

  // TEMPORARY - test tray data

  const tools = [
    { id: "4oDzNiAA8AARSGq0", name: "Bone Hook", label: "--", cat: "F-20" },
    { id: "4oDzNiAA8AARSGUq", name: "Debakey Forcep", label: "--", cat: "G-33" },
    { id: "4oDzNiAA8AARSIjQ", name: "Hemoclip Applier", label: "--", cat: "B-21" },
    { id: "4oDzNiAA8AARSJqj", name: "Tonsil Gag", label: "--", cat: "F-08" },
    { id: "4oDzNiAA8AARSAnT", name: "Fork Teardrop", label: "--", cat: "E-55" },
    { id: "4oDzNiAA8AARSIGF", name: "Metz Scissor", label: "--", cat: "B-51" },
    { id: "4oDzNiAA8AARSHX/", name: "Baby Hohman", label: "--", cat: "C-99" },
    { id: "4oDzNiAA8AARSF+v", name: "Fibre Optic Cord", label: "--", cat: "A-80" },

    { id: "4oDzNiAA8AARSHBS", name: "Hip Retractor", label: "6", cat: "F-76" },
    { id: "4oDzNiAA8AARSCjv", name: "Fork Straight", label: "4", cat: "E-22" },
    { id: "4oDzNiAA8AARSJSo", name: "Mirror", label: "5", cat: "D-30" },
    { id: "4oDzNiAA8AARSI63", name: "Lap Handle", label: "3", cat: "A-15" },
    { id: "4oDzNiAA8AARSFqL", name: "Scalpel Handle", label: "2", cat: "C-66" },
    { id: "4oDzNiAA8AARSHu7", name: "Needle Driver", label: "1", cat: "B-12" },
    { id: "4oDzNiAA8AARSE/d", name: "Bayonet Forcep", label: "7", cat: "G-45" },
  ];

  // fetching initial assembly data
  // useEffect(() => {
  //   fetch('/api/getAssemblyData')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setTrayData(data.data[0].traydata as any);
  //       console.log("DATA",data.data[0].traydata.additionalInfo)
  //       setCorrectItems(data.data.find((list: any) => list.list === 'correct')?.items || []);
  //       setIncorrectItems(data.data.find((list: any) => list.list === 'Incorrect')?.items || []);
  //       setMissingItems(data.data.find((list: any) => list.list === 'Missing')?.items || []);
  //     })
  //     .catch((error) => console.error('Error fetching data:', error));
  // }, []);

  // websocket server instantiation
  
  useEffect(() => {
    fetch("/api/websocket") // Ensure the server is running
        .then((res) => res.json())
        .then((data) => console.log("WebSocket API Response:", data));

    const ws = new WebSocket("ws://localhost:8080"); // Connect to WebSocket server

    ws.onopen = () => {
        console.log("WebSocket connection established.");
    };

    ws.onmessage = (event) => {
      console.log("websocket message recieved: " + event.data);
        try {
            const data = JSON.parse(event.data);
            if (data.tags && Array.isArray(data.tags)) {
                console.log("Received RFID Tags:", data);
                setRfidTags(data.tags);
            }
        } catch (error) {
            console.error("Error parsing WebSocket message:", error);
        }
    };

    ws.onerror = (error) => {
        console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
        console.log("WebSocket connection closed.");
    };

    return () => ws.close(); // Cleanup WebSocket on unmount
}, []);

useEffect(() => {
  const detectedIDs = new Set(rfidTags);
// detectedIDs = currentRFID tags

  const correct = tools.filter((tool) => detectedIDs.has(tool.id) && tool.label != "--");
  const missing = tools.filter((tool) => !detectedIDs.has(tool.id) && tool.label != "--");

  const incorrect = tools.filter((tool) => detectedIDs.has(tool.id) && tool.label == "--");

  setCorrectItems(correct);
  setMissingItems(missing);
  setIncorrectItems(incorrect);
}, [rfidTags]);

  
  return (
    <div className={styles.page}>
      <div className={styles.headerContainer}>
        <div className={styles.title}>
            {/* <h1 className={styles.setName}>{trayData.title}</h1>  */}
            <h1 className={styles.setName}>{"User Testing Tray"}</h1> 
            <TrayInformation />
        </div>
        <div className={styles.buttonBar}>
          {/* <Button className="btn-primary btn-blue">Scan Again</Button> */}
          <CompleteModal />
        </div>
      </div>
      <main className={styles.main}>

       <div className={styles.topSection}>
         <div className={styles.leftSection}>
           <div className={styles.instrumentBreakdown}>
              <h4 className={styles.subtitle}>INSTRUMENT BREAKDOWN</h4>
              <div className={styles.section}>
                <div className={styles.container}>
                 {/* Table Header */}
                 <div className={styles.header + ' ' + styles.row}>
                   <div className={styles.colSmall}>QTY.</div>
                   <div className={styles.col}>NAME</div>
                   <div className={styles.colSmall}>LABEL</div>
                   <div className={styles.col}>CAT. #</div>
                 </div>

                  {/* INCORRECT ITEMS */}
                  <div className={styles.sectionTitle} onClick={() => toggleSection('incorrectItems')}>
                    Incorrect Items ({incorrectItems.length}) <span>{incorrectActive === 'incorrectItems' ? '−' : '+'}</span>
                  </div>
                  <div id='incorrectItems' className={`${styles.sectionContent} ${incorrectActive === 'incorrectItems' ? styles.active : ''}`}>
                    {incorrectItems.map((item: any, index: number) => (
                      <div key={index} className={styles.row}>
                        {/* <div className={styles.colSmall}>{item.QTY}</div>
                        <div className={styles.col}>{item.Name}</div>
                        <div className={styles.colSmall}><span className={styles.badge}>{item.Label}</span></div>
                        <div className={styles.col}>{item.CAT}</div> */}
                        <div className={styles.colSmall}>{"1"}</div>
                        <div className={styles.col}>{item.name}</div>
                        <div className={styles.colSmall}><span className={styles.badge}>{item.label}</span></div>
                        <div className={styles.col}>{item.cat}</div>
                      </div>
                    ))}
                  </div>
                  {/* MISSING ITEMS */}
                  <div className={styles.sectionTitle} onClick={() => toggleSection('missingItems')}>
                    Missing Items ({missingItems.length}) <span>{missingActive === 'missingItems' ? '−' : '+'}</span>
                  </div>
                  <div id='missingItems' className={`${styles.sectionContent} ${missingActive === 'missingItems' ? styles.active : ''}`}>
                    {missingItems.map((item:any, index:number) => (
                      <div key={index} className={styles.row}>
                        {/* <div className={styles.colSmall}>{item.QTY}</div>
                        <div className={styles.col}>{item.Name}</div>
                        <div className={styles.colSmall}><span className={styles.badge}>{item.Label}</span></div>
                        <div className={styles.col}>{item.CAT}</div> */}
                        <div className={styles.colSmall}>{"1"}</div>
                        <div className={styles.col}>{item.name}</div>
                        <div className={styles.colSmall}><span className={styles.badge}>{item.label}</span></div>
                        <div className={styles.col}>{item.cat}</div>
                      </div>
                    ))}
                  </div>

                  {/* CORRECT ITEMS */}
                  <div className={styles.correctItems} onClick={() => toggleSection('correctItems')}>
                    Correct Items ({correctItems.length}) <span>{correctActive === 'correctItems' ? '−' : '+'}</span>
                  </div>
                  <div id='correctItems' className={`${styles.sectionContent} ${correctActive === 'correctItems' ? styles.active : ''}`}>
                    {correctItems.map((item:any, index:number) => (
                      <div key={index} className={styles.row}>
                        {/* <div className={styles.colSmall}>{item.QTY}</div>
                        <div className={styles.col}>{item.Name}</div>
                        <div className={styles.colSmall}><span className={styles.badge}>{item.Label}</span></div>
                        <div className={styles.col}>{item.CAT}</div> */}
                        <div className={styles.colSmall}>{"1"}</div>
                        <div className={styles.col}>{item.name}</div>
                        <div className={styles.colSmall}><span className={styles.badge}>{item.label}</span></div>
                        <div className={styles.col}>{item.cat}</div>
                      </div>
                    ))}
                  </div>

                  {/* removed for GW */}
                  {/* <div className={styles.reportMissing}>
                     <MissingTool />
                  </div> */}
                </div>
              </div>
          </div>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.trayOverview}>
            <h4 className={styles.substitle}>TRAY OVERVIEW</h4>
            {/* ADD ICON */}
            <div className={styles.section}>
              <div className={styles.container}>
                <h1 className={styles.wrongNumber}>{incorrectItems.length}</h1>
                <p>Incorrect Items</p>
              </div>
              <div className={styles.container}>
                <h1 className={styles.wrongNumber}>{missingItems.length}</h1>
                <p>Missing Items</p>
              </div>
              <div className={styles.container}>
                <h1 className={styles.correctNumber}>{correctItems.length}</h1>                  
                <p>Correct Items</p>
              </div>
            </div>
          </div>
          
          <div className={styles.referenceImage}>
            <h4 className={styles.substitle}>REFERENCE IMAGE</h4>
            <div className={styles.section}>
            <div className={styles.container}>
              {/* <p>Bottom Tray</p> */}
              {/* <Image src={trayImage} className={styles.trayImage}alt="Full tray image"/> */}
              {/* FOR SOME REASON I HAVE TO MANUALLY THROW THIS IMAGE IN LOL */}
              <Image src="/XIA_tray_image1.png" className={styles.trayImage} alt="Full tray image" width={500} height={500}/>
            </div>
            </div>
      
          </div>
        </div>  
      </div>

{/* removed for GW*/}
      {/* <div className={styles.bottomSection} >
        <h2 className={styles.subtitle}>OTHER DETAILS</h2>
          <div className={styles.section}>
          <Accordion selectionMode='multiple' className={styles_inv.accordion}>
              {trayData.additionalInfo.map((item:any, index: number) => (
                <AccordionItem className={styles_inv.accordionItem} key={index} aria-label={item.title} title={item.title}>
                  <p>{item.description}</p>
                  <Image src={item.img} alt={item.title} className={styles.trayImage} />
                </AccordionItem>
              ))}
            </Accordion>
          </div>
      </div> 
      */}

{/* temporary: live list of RFID tags */}
        <div>
            <h1>RFID Tags</h1>
            <ul>
                {rfidTags.map((id, index) => (
                    <li key={index}>{id}</li>
                ))}
            </ul>
        </div>
      
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}


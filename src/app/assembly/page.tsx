'use client'
import Image from "next/image";
import styles from "../styles/assembly.module.css";
import styles_inv from "../styles/tray.module.css"
import React, { useState , useEffect} from 'react';
import { CompleteModal } from '../components/CompleteModal';
import { TrayInformation } from '../components/TrayInformation';
import { MissingTool } from '../components/MissingTool';
import {
  Button, Accordion, AccordionItem
} from "@heroui/react";
import trayImage from "../assets/XIA_tray_image.png"


export default function assembly() {
  const [correctActive, setCorrectActive] = useState<string | null>(null);
  const [incorrectActive, setIncorrectActive] = useState<string | null>('incorrectItems');
  const [missingActive, setMissingActive] = useState<string | null>('missingItems');

  const toggleSection = (id: string) => {
    setIncorrectActive(prev => (id === 'incorrectItems' ? (prev === id ? null : id) : prev));
    setMissingActive(prev => (id === 'missingItems' ? (prev === id ? null : id) : prev));
    setCorrectActive(prev => (id === 'correctItems' ? (prev === id ? null : id) : prev));
  };
  const [trayData, setTrayData] = useState<any>([]);
  const [correctItems, setCorrectItems] = useState([]);
  const [incorrectItems, setIncorrectItems] = useState([]);
  const [missingItems, setMissingItems] = useState([]);
  
  useEffect(() => {
    fetch('/api/getAssemblyData')
      .then((res) => res.json())
      .then((data) => {
        setTrayData(data.data[0].traydata as any);
        console.log("DATA",data.data[0].traydata.additionalInfo)
        setCorrectItems(data.data.find((list: any) => list.list === 'correct')?.items || []);
        setIncorrectItems(data.data.find((list: any) => list.list === 'Incorrect')?.items || []);
        setMissingItems(data.data.find((list: any) => list.list === 'Missing')?.items || []);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);
  
  return (
    <div className={styles.page}>
      <div className={styles.headerContainer}>
        <div className={styles.title}>
            <h1 className={styles.setName}>{trayData.title}</h1> 
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
                        <div className={styles.colSmall}>{item.QTY}</div>
                        <div className={styles.col}>{item.Name}</div>
                        <div className={styles.colSmall}><span className={styles.badge}>{item.Label}</span></div>
                        <div className={styles.col}>{item.CAT}</div>
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
                        <div className={styles.colSmall}>{item.QTY}</div>
                        <div className={styles.col}>{item.Name}</div>
                        <div className={styles.colSmall}><span className={styles.badge}>{item.Label}</span></div>
                        <div className={styles.col}>{item.CAT}</div>
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
                        <div className={styles.colSmall}>{item.QTY}</div>
                        <div className={styles.col}>{item.Name}</div>
                        <div className={styles.colSmall}><span className={styles.badge}>{item.Label}</span></div>
                        <div className={styles.col}>{item.CAT}</div>
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
              <Image src={trayImage} className={styles.trayImage}alt="Full tray image"/>
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
      </div> */}
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}


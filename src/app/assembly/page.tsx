'use client'
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/assembly.module.css";
import styles_inv from "../styles/tray.module.css"
import React, { useState } from 'react';
import { CompleteModal } from '../components/CompleteModal';
import { TrayInformation } from '../components/TrayInformation';
import { MissingTool } from '../components/MissingTool';
import {
  Button, Accordion, AccordionItem
} from "@heroui/react";
import trayImage from "../assets/XIA_tray_image.png"

// Make changes to take in data - 3 different lists or 1 list and categorized


export default function assembly() {
  const [correctActive, setCorrectActive] = useState<string | null>(null);
  const [incorrectActive, setIncorrectActive] = useState<string | null>('incorrectItems');
  const [missingActive, setMissingActive] = useState<string | null>('missingItems');

  const toggleSection = (id: string) => {
    setIncorrectActive(prev => (id === 'incorrectItems' ? (prev === id ? null : id) : prev));
    setMissingActive(prev => (id === 'missingItems' ? (prev === id ? null : id) : prev));
    setCorrectActive(prev => (id === 'correctItems' ? (prev === id ? null : id) : prev));
  };

  const trayData = [
    {
      layer: "Bottom TRAY",
      items: [
        { QTY: 1, Name: "Anti Torque Key", Label: "--", CAT: 123456 },
        { QTY: 1, Name: "Rod Fork", Label: "--", CAT: 123456 },
        { QTY: 1, Name: "Balanced T-Torque", Label: "--", CAT: 123456 },
        { QTY: 2, Name: "5mm Hex Square", Label: "--", CAT: 123456 },
        { QTY: 1, Name: "Inserter Tube", Label: "--", CAT: 123456 },
      ],
      image: "/assets/XIA_bottom_tray.png",
      additionalInfo: [
          { title: "Cork Screw Persuader",
            description: "assembly instructions" ,
            img: "/assets/XIA_top_tray.png" 
          }, 
          { title: "Cork Screw Persuader",
            description: "assembly instructions" ,
            img: "/assets/XIA_top_tray.png" 
            }]
    }]

  
  return (
    <div className={styles.page}>
      <div className={styles.headerContainer}>
        <div className={styles.title}>
            <h1 className={styles.setName}>XIA-3 INSTRUMENT SET</h1> 
            <TrayInformation />
        </div>
        <div className={styles.buttonBar}>
          <Button className="btn-primary btn-blue">Scan Again</Button>
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

                {/* Incorrect Items Section */}
                <div>
                  <div
                    className={styles.sectionTitle}
                    onClick={() => toggleSection('incorrectItems')}
                  >
                    Incorrect Items (2) <span>{incorrectActive === 'incorrectItems' ? '−' : '+'}</span>
                  </div>
                  <div
                    id="incorrectItems"
                    className={`${styles.sectionContent} ${
                      incorrectActive === 'incorrectItems' ? styles.active: ''
                    }`}
                  >
                    <div className={styles.row}>
                      <div className={styles.colSmall}>1</div>
                      <div className={styles.col}>Anti Torque Key</div>
                      <div className={styles.colSmall}>--</div>
                      <div className={styles.col}>48237026</div>
                    </div>
                    <div className={styles.row}>
                      <div className={styles.colSmall}>1</div>
                      <div className={styles.col}>Anti Torque Key</div>
                      <div className={styles.colSmall}>--</div>
                      <div className={styles.col}>48237026</div>
                    </div>
                  </div>
                </div>

                {/* Missing Items Section */}
                <div>
                <div
                    className={styles.sectionTitle}
                    onClick={() => toggleSection('missingItems')}
                  >
                    Missing Items (2) <span>{incorrectActive === 'missingItems' ? '−' : '+'}</span>
                  </div>
                  <div
                    id="missingItems"
                    className={`${styles.sectionContent} ${
                      missingActive === 'missingItems' ? styles.active: ''
                    }`}
                  >
                    <div className={styles.row}>
                      <div className={styles.colSmall}>1</div>
                      <div className={styles.col}>Bending Iron</div>
                      <div className={styles.colSmall}><span className={styles.badge}>D</span></div>
                      <div className={styles.col}>12345678</div>
                    </div>
                    {/* <div className={styles.details}>
                      AESCULAP CAT. 1234-12345, 1234-12345<br />
                      Image Label: E
                    </div> */}
                    <div className={styles.row}>
                    <Accordion selectionMode="multiple" className={styles.accordion}>
                      {trayData[0].items.map((item, i) => (
                        <AccordionItem
                          key={i}
                          className={styles.accordionItem}
                          title={
                            <div className={styles.row}>
                              <div className={styles.colSmall}>{item.QTY}</div>
                              <div className={styles.col}>{item.Name}</div>
                              <div className={styles.colSmall}>
                                <span className={styles.badge}>{item.Label}</span>
                              </div>
                              <div className={styles.col}>{item.CAT}</div>
                            </div>
                          }
                        >
                          {/* Content inside the accordion */}
                          <p>Additional details about {item.Name}.</p>
                        </AccordionItem>
                      ))}
                    </Accordion>

                    </div>
                  </div>
                </div>

                {/* Correct Items Section */}
                <div>
                  <div
                    className={styles.correctItems}
                    onClick={() => toggleSection('correctItems')}
                  >
                    Correct Items (13) <span>{correctActive === 'correctItems' ? '−' : '+'}</span>
                  </div>
                  <div
                    id="correctItems"
                    className={`${styles.sectionContent} ${
                      correctActive === 'correctItems' ? styles.active : ''
                    }`}
                  >
                    <p>Details of correct items can go here.</p>
                  </div>
                </div>
              <div className={styles.reportMissing}>
                <MissingTool />
              </div>
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
                <h1 className={styles.wrongNumber}>2</h1>
                <p>Incorrect Items</p>
              </div>
              <div className={styles.container}>
                <h1 className={styles.wrongNumber}>2</h1>
                <p>Missing Items</p>
              </div>
              <div className={styles.container}>
                <h1 className={styles.correctNumber}>13</h1>                  
                <p>Correct Items</p>
              </div>
            </div>
          </div>
          
          <div className={styles.referenceImage}>
            <h4 className={styles.substitle}>REFERENCE IMAGE</h4>
            <div className={styles.section}>
            <div className={styles.container}>
              <p>Bottom Tray</p>
              <Image src={trayImage} className={styles.trayImage}alt="Full tray image"/>
            </div>
            </div>
      
          </div>
        </div>  
      </div>
      <div className={styles.bottomSection} >
        <h2 className={styles.subtitle}>OTHER DETAILS</h2>
          <div className={styles.section}>
              <Accordion selectionMode="multiple" className={styles_inv.accordion}>
              {trayData[0].additionalInfo.map((item, i) => (  
                  <AccordionItem className={styles_inv.accordionItem} key={i} aria-label={item.title} title={item.title}>
                    <p>{item.description}</p>
                    <img src={item.img}></img>
                  </AccordionItem>
              ))}  
              </Accordion>
          </div>
      </div>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}

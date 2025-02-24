"use client";
import styles_inv from '../../styles/tray.module.css'
import styles from '../../styles/assembly.module.css'
import Image from 'next/image';
import React from 'react';
import { Tabs , Tab, Card, CardBody, Button, Accordion, AccordionItem} from "@heroui/react";
import { TrayInformation } from '@/app/components/TrayInformation';


export default function Tray() {
    // tray data
    const layers = [
      {
        layer: "TOP TRAY",
        items: [
          { QTY: 1, Name: "Anti Torque Key", Label: "--", CAT: 123456 },
          { QTY: 1, Name: "Rod Fork", Label: "--", CAT: 123456 },
          { QTY: 1, Name: "Balanced T-Torque", Label: "--", CAT: 123456 },
          { QTY: 2, Name: "5mm Hex Square", Label: "--", CAT: 123456 },
          { QTY: 1, Name: "Inserter Tube", Label: "--", CAT: 123456 },
        ],
        image: "/assets/XIA_top_tray.png",
        additionalInfo: [
            { title: "Cork Screw Persuader",
              description: "assembly instructions" ,
              img: "/assets/XIA_top_tray.png" 
            }, 
            { title: "Cork Screw Persuader",
              description: "assembly instructions" ,
              img: "/assets/XIA_top_tray.png" 
              }
        ]
      },
      {
        layer: "MIDDLE TRAY",
        items: [
          { QTY: 1, Name: "Distractor Small", Label: "--", CAT: 123456 },
          { QTY: 1, Name: "Compressor Small", Label: "--", CAT: 123456 },
          { QTY: 1, Name: "Long Template Rod", Label: "--", CAT: 123456 },
        ],
        image: "/assets/XIA_middle_tray.png",
        additionalInfo: [
            { title: "Cork Screw Persuader",
              description: "assembly instructions" ,
              img: "/assets/XIA_middle_tray.png" 
            }
        ]
      },
      {
        layer: "BOTTOM TRAY",
        items: [
          { QTY: 1, Name: "Mono-Driver", Label: "--", CAT: 123456 },
          { QTY: 1, Name: "Rod Pusher", Label: "--", CAT: 123456 },
          { QTY: 2, Name: "Bending Iron", Label: "--", CAT: 123456 },
          { QTY: 1, Name: "Cork Screw Persuader (2pcs)", Label: "--", CAT: 123456 },
          { QTY: 1, Name: "Curved Blunt Probe", Label: "--", CAT: 123456 },
          { QTY: 1, Name: "Rod Insertion Forceps", Label: "--", CAT: 123456 },
          { QTY: 1, Name: "Thoracic Feeer Sound", Label: "--", CAT: 123456 },
          { QTY: 1, Name: "French Bender", Label: "--", CAT: 123456 },

        ],
        image: "/assets/XIA_tray_image.png",
        additionalInfo: [
            { title: "Ctest",
              description: "assembly instructions" ,
              img: "/assets/XIA_tray_image.png" 
            }
        ]
      },
    ];
  
    return (
        <div>
        <div className={styles.page}>
          <div className={styles.headerContainer}>
            <div className={styles.title}>
                  <div>
                      <h1 className={styles.setName}>XIA-3 INSTRUMENT SET</h1> 
                      <TrayInformation />
                  </div>
                      {/* add edit button */}
              </div>
          </div>
             <div className={styles_inv.tabs}>
             <Tabs aria-label="Options" >
             {layers.map((layer, index) => (    
                <Tab className={styles_inv.tab} key={index} title={layer.layer}>
                <Card>
                    <CardBody>    
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
                                            {/* Table Items */}
                                            {layer.items.map((item, idx) => (
                                                <div className={styles.row} key={idx}>
                                                    <div className={styles.colSmall}>{item.QTY}</div>
                                                    <div className={styles.col}>{item.Name}</div>
                                                    <div className={styles.colSmall}>{item.Label}</div>
                                                    <div className={styles.col}>{item.CAT}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.rightSection}> 
                                <div className={styles.referenceImage}>
                                    <h4 className={styles.substitle}>REFERENCE IMAGE</h4>
                                    <div className={styles.section}>
                                    <div className={styles.container}>
                                        <p>{layer.layer}</p>
                                        {/* <Image src={trayImage} className={styles.trayImage}alt="Full tray image"/> */}
                                        {/* <div className={styles_inv.image}> */}
                                        <div className={styles_inv.image}>
                                            <img 
                                                src={layers[index].image} 
                                                alt={layers[index].layer} 
                                            />
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div className={styles.bottomSection} >
                                <h2 className={styles.subtitle}>OTHER DETAILS</h2>
                                <div className={styles.section}>
                                <Accordion selectionMode="multiple" className={styles_inv.accordion}>
                                    {layer.additionalInfo.map((item, i) => (  
                                        <AccordionItem className={styles_inv.accordionItem} key={i} aria-label={item.title} title={item.title}>
                                            <p>{item.description}</p>
                                            <img src={item.img}></img>
                                        </AccordionItem>
                                    ))}  
                                </Accordion>
                                </div>
                            </div>
                    </main>
                    </CardBody>
                </Card>
                </Tab>
              ))}
            </Tabs>
            </div>
        </div>
        </div>
    );
  }
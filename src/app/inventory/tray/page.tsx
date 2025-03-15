"use client";
import styles_inv from '../../styles/tray.module.css'
import styles from '../../styles/assembly.module.css'
import Image from 'next/image';
import React, { FormEvent, useState , useEffect} from 'react';
import {Tabs , Tab, Card, CardBody, Button, Accordion, AccordionItem} from "@heroui/react";
import { TrayInformation } from '@/app/components/TrayInformation';
import editIcon from '../../assets/edit.png'
  
export default function Tray() {
    // tray data
    // const layers: Layer[] = [
    //   {
    //     layer: "TOP TRAY",
    //     items: [
    //       { QTY: 1, Name: "Anti Torque Key", Label: "--", CAT: 123456 },
    //       { QTY: 1, Name: "Rod Fork", Label: "--", CAT: 123456 },
    //       { QTY: 1, Name: "Balanced T-Torque", Label: "--", CAT: 123456 },
    //       { QTY: 2, Name: "5mm Hex Square", Label: "--", CAT: 123456 },
    //       { QTY: 1, Name: "Inserter Tube", Label: "--", CAT: 123456 },
    //     ],
    //     image: "/assets/XIA_top_tray.png",
    //     additionalInfo: [
    //         { title: "Cork Screw Persuader",
    //           description: "assembly instructions" ,
    //           img: "/assets/XIA_top_tray.png" 
    //         }, 
    //         { title: "Cork Screw Persuader",
    //           description: "assembly instructions" ,
    //           img: "/assets/XIA_top_tray.png" 
    //           }
    //     ]
    //   },
    //   {
    //     layer: "MIDDLE TRAY",
    //     items: [
    //       { QTY: 1, Name: "Distractor Small", Label: "--", CAT: 123456 },
    //       { QTY: 1, Name: "Compressor Small", Label: "--", CAT: 123456 },
    //       { QTY: 1, Name: "Long Template Rod", Label: "--", CAT: 123456 },
    //     ],
    //     image: "/assets/XIA_middle_tray.png",
    //     additionalInfo: [
    //         { title: "Cork Screw Persuader",
    //           description: "assembly instructions" ,
    //           img: "/assets/XIA_middle_tray.png" 
    //         }
    //     ]
    //   },
    //   {
    //     layer: "BOTTOM TRAY",
    //     items: [
    //       { QTY: 1, Name: "Mono-Driver", Label: "--", CAT: 123456 },
    //       { QTY: 1, Name: "Rod Pusher", Label: "--", CAT: 123456 },
    //       { QTY: 2, Name: "Bending Iron", Label: "--", CAT: 123456 },
    //       { QTY: 1, Name: "Cork Screw Persuader (2pcs)", Label: "--", CAT: 123456 },
    //       { QTY: 1, Name: "Curved Blunt Probe", Label: "--", CAT: 123456 },
    //       { QTY: 1, Name: "Rod Insertion Forceps", Label: "--", CAT: 123456 },
    //       { QTY: 1, Name: "Thoracic Feeer Sound", Label: "--", CAT: 123456 },
    //       { QTY: 1, Name: "French Bender", Label: "--", CAT: 123456 },

    //     ],
    //     image: "/assets/XIA_tray_image.png",
    //     additionalInfo: [
    //         { title: "Ctest",
    //           description: "assembly instructions" ,
    //           img: "/assets/XIA_tray_image.png" 
    //         }
    //     ]
    //   },
    // ];
    
      // turn on edit mode 
    const [editMode, setEditMode] = useState(false);
    const [TrayData, setTrayData] = useState<any>([]);

    //get data
    useEffect(() => {
        // Fetch data from the API route
        const fetchTrayData = async () => {
            try {
                const response = await fetch('/api/getInventoryData');
                const data = await response.json();
                setTrayData(data.trays); // Set the tray data in the state
                console.log("THIS", data.trays)
            } catch (error) {
                console.error('Error fetching tray data:', error);
            } 
        };

        fetchTrayData();
    }, []);

    //post data
    async function updateData(updatedData: any) {
        console.log("PUT", updateData)
        try {
          const res = await fetch('/api/updateInventoryData', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({"trays":updatedData}),
          });
      
          if (!res.ok) throw new Error(`Error: ${res.status}`);
          const result = await res.json();
          alert(result.message);
        } catch (err: any) {
          alert(`Failed to update: ${err.message}`);
        }
      }
      

    const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevent page refresh
    
        // Get the data from the form
        const formData = new FormData(e.currentTarget);
        const updatedData = TrayData.map((layer: any, layerIndex: number) => ({
          ...layer,
          items: layer.items.map((item: any, itemIndex: number) => ({
            ...item,
            QTY: Number(
              formData.get(`QTY-${layerIndex}-${itemIndex}`) || item.QTY
            ),
            Name: formData.get(`Name-${layerIndex}-${itemIndex}`) || item.Name,
            Label: formData.get(`Label-${layerIndex}-${itemIndex}`) || item.Label,
            CAT: formData.get(`CAT-${layerIndex}-${itemIndex}`) || item.CAT,
          })),
        }));
    
        // Update state
        setTrayData(updatedData);
        console.log("Updated Data:", updatedData);
        updateData(updatedData)
    
        // Exit edit mode
        setEditMode(false);
      };

    return (
        <div>
        <div className={styles.page}>
          <div className={styles.headerContainer}>
            <div className={styles_inv.title}>
                  <div>
                      <h1 className={styles.setName}>XIA-3 INSTRUMENT SET</h1> 
                      <TrayInformation />
                  </div>
                  <div className={styles_inv.buttons}>
                    {editMode?<Button  isDisabled className="btn-primary btn-primary-inverted btn-icon" startContent={<Image src={editIcon} style={{paddingRight:'2px'}}height={20} width={20} alt="edit icon"/>}> Edit</Button>:  <Button onPress={() => setEditMode(true)} className="btn-primary btn-primary-inverted btn-icon" startContent={<Image src={editIcon} style={{paddingRight:'2px'}}height={20} width={20} alt="edit icon"/>}> Edit</Button>}
                    <Button type='submit' form='form' className="btn-primary btn-primary-inverted btn-icon" startContent={<Image src={editIcon} style={{paddingRight:'2px'}}height={20} width={20} alt="edit icon"/>}> Save</Button>
                </div>
              </div>
          </div>
             <div className={styles_inv.tabs}>
             <Tabs aria-label="Options" >
             {TrayData.map((layer:any, layerIndex: number) => (    
                <Tab className={styles_inv.tab} key={layerIndex} title={layer.layer}>
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
                                            <form id="form" onSubmit={handleSave}>
                                            {layer.items.map((item:any, itemIndex: number) => (
                                                <div className={styles.row} key={itemIndex}>
                                                     {editMode ? (
                                                            <>
                                                                <input
                                                                    className={styles_inv.input}
                                                                    type="number"
                                                                    name={`QTY-${layerIndex}-${itemIndex}`}
                                                                    defaultValue={item.QTY}
                                                                />
                                                                <input
                                                                    className={styles_inv.input}
                                                                    type="text"
                                                                    name={`Name-${layerIndex}-${itemIndex}`}
                                                                    defaultValue={item.Name}
                                                                />
                                                                <input
                                                                    className={styles_inv.input}
                                                                    type="text"
                                                                    name={`Label-${layerIndex}-${itemIndex}`}
                                                                    defaultValue={item.Label}
                                                                />
                                                                <input
                                                                    className={styles_inv.input}
                                                                    type="text"
                                                                    name={`CAT-${layerIndex}-${itemIndex}`}
                                                                    defaultValue={item.CAT}
                                                                />
                                                            </>
                                                            ) : (
                                                            <>
                                                                <div className={styles.colSmall}>{item.QTY}</div>
                                                                <div className={styles.col}>{item.Name}</div>
                                                                <div className={styles.colSmall}>{item.Label}</div>
                                                                <div className={styles.col}>{item.CAT}</div>
                                                            </>)}
                                                </div>
                                            ))}
                                            </form>
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
                                                src={TrayData[layerIndex].image} 
                                                alt={TrayData[layerIndex].layer} 
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
                                    {layer.additionalInfo.map((item:any, i:number) => (  
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
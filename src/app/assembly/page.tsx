'use client'
import Image from "next/image";
import styles from "../styles/assembly.module.css";
import styles_inv from "../styles/tray.module.css"
import React, { useState , useEffect, useRef} from 'react';
import { CompleteModal } from '../components/CompleteModal';
import { TrayInformation } from '../components/TrayInformation';
import { PleasePlaceTray } from "../components/PleasePlaceTray";
import { MissingTool } from '../components/MissingTool';
import {
  Button, Accordion, AccordionItem,
  Modal
} from "@heroui/react";
//import trayImage from "../assets/XIA_tray_image.png";
import trayImage from "../assets/trays/test-tray-1.png"

type Item = {
  id: string;
  name: string;
  label: string;
  cat: string;
  imagePath: string;
  //imagePath: string;
};

type Tray = {
  id: string;
  name: string;
  imagePath: string;
  instruments: string[]; // category numbers
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
  //
  const [correctItems, setCorrectItems] = useState<Item[]>([]);
  const [missingItems, setMissingItems] = useState<Item[]>([]);
  const [incorrectItems, setIncorrectItems] = useState<Item[]>([]);

  

  const [trayDetected, setTrayDetected] = useState<Boolean>(false);
  const [trayData, setTrayData] = useState<Tray>();
  const [isTrayCompleted, setIsTrayCompleted] = useState<Boolean>(false);

  // TEMPORARY - test tray data

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
    { id: "4oDzNiAA8AARSC1B", name: "Backhaus Towel Forceps", cat: "X-81", imagePath: "/tools/backhaus-towel-forceps.jpg" },
    { id: "4oDzNiAA8AARSUiK", name: "Bone Clamp", cat: "X-34", imagePath: "/tools/bone-clamp.jpg" },
    { id: "4oDzNiAA8AARSAu0", name: "Bipolar Forceps", cat: "X-59", imagePath: "/tools/bipolar-forceps.jpg" },
    { id: "4oDzNiAA8AARSB+7", name: "Backhaus Towel Forceps", cat: "X-81", imagePath: "/tools/backhaus-towel-forceps.jpg" },
    { id: "4oDzNiAA8AARSA9B", name: "Nasal Chisel", cat: "Y-28", imagePath: "/tools/nasal-chisel.jpg" },
    { id: "4oDzNiAA8AARSAcS", name: "Wire And Pin", cat: "Y-40", imagePath: "/tools/wire-and-pin.jpg" },
    { id: "4oDzNiAA8AARSCbT", name: "Kerrison Rongeur", cat: "Y-87", imagePath: "/tools/kerrison-rongeur.jpg" },
    { id: "4oDzNiAA8AARSWEh", name: "Periosteal Elevator", cat: "Z-3", imagePath: "/tools/periosteal-elevator.jpg" },
    { id: "4oDzNiAA8AARSEXX", name: "Alignment Guide", cat: "K-10", imagePath: "/tools/alignment-guide.jpg" },
  ];

  const trays = [
    { id: "4oDzNiAA8AARSErH", name: "Basic Orthopaedic Set", imagePath: "../assets/trays/test-tray-1.png", 
      instruments: [
        "B-11", "G-63", "J-55", "L-29", "N-57", "P-10", "Q-76", "S-1", "S-32", "V-23", "X-34", "X-81", "E-14"
      ]
    },
    { id: "4oDzNiAA8AARSCK3", name: "Dental Tray Set", imagePath: "../assets/trays/test-tray-2.png",
      instruments: [
        "S-40", "S-40", "B-33", "E-14", "E-14", "Y-28", "C-41", "N-14", "L-22", "W-27", "Q-76", "Q-76"
      ]
    },
    { id: "4oDzNiAA8AARSHBR", name: "Dermatology Set", imagePath: "../assets/trays/test-tray-3.png",
      instruments: [
        "K-10", "T-61", "X-59", "N-57", "A-56", "Y-87", "E-14", "M-35", "K-14", "P-10", "P-10", "P-10"
      ]
    },
    { id: "4oDzNiAA8AARSEXW", name: "Blepharoplasty Set", imagePath: "../assets/trays/test-tray-4.png",
      instruments: [
        "L-45", "X-81", "C-87", "I-71", "P-51", "B-54", "U-74", "C-50", "E-14", "L-22", "S-31", "L-9"
      ]
    }
  ]

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

// detecting and sorting tools into different categories
useEffect(() => {
  setTrayDetected(true);
  const detectedIDs = new Set(rfidTags);
// detectedIDs = currentRFID tags

  if(trayDetected && trayData) {
    const trayInstrumentCategories = new Set(trayData.instruments);

    const detectedTools = tools.filter((tool) => detectedIDs.has(tool.id));
    const detectedCategories = new Set(detectedTools.map((tool) => tool.cat));

    // Categorization based on category matching
    const correct = detectedTools.filter((tool) => trayInstrumentCategories.has(tool.cat));
    const incorrect = detectedTools.filter((tool) => !trayInstrumentCategories.has(tool.cat));

    const missing = tools.filter(
      (tool) => trayInstrumentCategories.has(tool.cat) && !detectedCategories.has(tool.cat)
    );

    setCorrectItems(correct);
    setMissingItems(missing);
    setIncorrectItems(incorrect);

    setIsTrayCompleted(incorrect.length === 0 && missing.length === 0);
    // const correct = tools.filter((tool) => detectedIDs.has(tool.id) && tool.label != "--");
    // const missing = tools.filter((tool) => !detectedIDs.has(tool.id) && tool.label != "--");

    // const incorrect = tools.filter((tool) => detectedIDs.has(tool.id) && tool.label == "--");

    // setCorrectItems(correct);
    // setMissingItems(missing);
    // setIncorrectItems(incorrect);

    // if(incorrect.length == 0 && missing.length == 0) {
    //   setIsTrayCompleted(true);
    // }
    // else {
    //   setIsTrayCompleted(false);
    // }
  }

  else {
    // set to true if a detected ID matches a tray ID
    const detectedTray = trays.find((tray) => detectedIDs.has(tray.id));
    
    // setTrayDetected(trays.some((tray) => detectedIDs.has(tray.id)));
    // setTrayData()
    setTrayDetected(!!detectedTray);
    setTrayData(detectedTray);

    console.log(trayData);
  }

}, [rfidTags]);

  
  return (
    <div className={styles.page}>

    {!trayDetected && 
      <PleasePlaceTray></PleasePlaceTray>
    }

    {trayDetected && 
      <div className={styles.headerContainer}>
        <div className={styles.title}>
            {/* <h1 className={styles.setName}>{trayData.title}</h1>  */}
            <h1 className={styles.setName}>{trayData?.name}</h1> 

            {/* maybe pass some data to this? from the trayData if there's time */}
            <TrayInformation />
        </div>
        <div className={styles.buttonBar}>
          {/* <Button className="btn-primary btn-blue">Scan Again</Button> */}

          {/* UPDATE COMPLETED MODAL TO NOTIFY THAT TRAY IS OR IS NOT COMPLETED! */}
          <CompleteModal isCompleted={isTrayCompleted} />


        </div>
      </div>
    }

    {trayDetected && 
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
              <Image src={trayImage} className={styles.trayImage} alt="Full tray image" width={500} height={500}/>
            </div>
            </div>
      
          </div>
        </div>  
      </div>


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
    }
      
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}


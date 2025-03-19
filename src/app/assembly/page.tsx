'use client'
import Image from "next/image";
import styles from "../styles/assembly.module.css";
// import styles_inv from "../styles/tray.module.css"
import React, { useState , useEffect, useRef} from 'react';
import { CompleteModal } from '../components/CompleteModal';
import { TrayInformation } from '../components/TrayInformation';
import { PleasePlaceTray } from "../components/PleasePlaceTray";
import { ExpansiveToolInformation } from "../components/ExpansiveToolInformation";
import { MissingTool } from '../components/MissingTool';
import trayImage from "../assets/GRHLogo.png"

type Tool = {
  id: string;
  name: string;
  cat: string;
  label?: string
  imagePath: string;
  //imagePath: string;
};

type Tray = {
  id: string;
  name: string;
  imagePath: string;
  instruments: {
    cat: string,
    label: string,
    quantity: number
  }[]; // category numbers
};

type MissingTool = Tool & { missingQuantity: number };
type IncorrectTool = Tool & { incorrectQuantity: number };
type CorrectTool = Tool & { correctQuantity: number };

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
  const [correctItems, setCorrectItems] = useState<CorrectTool[]>([]);
  const [missingItems, setMissingItems] = useState<MissingTool[]>([]);
  const [incorrectItems, setIncorrectItems] = useState<IncorrectTool[]>([]);

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

  const trays: Tray[] = [
    { id: "4oDzNiAA8AARSErH", name: "Basic Orthopaedic Set", imagePath: "/trays/basic-orthopaedic-set.jpg", 
      instruments: [
        {cat: "B-11", label: "A", quantity: 1},
        {cat: "G-63", label: "B", quantity: 1},
        {cat: "J-55", label: "C", quantity: 1},
        {cat: "L-29", label: "D", quantity: 1},
        {cat: "N-57", label: "E", quantity: 1},
        {cat: "P-10", label: "F", quantity: 1},
        {cat: "Q-76", label: "G", quantity: 1},
        {cat: "S-1", label: "H", quantity: 1},
        {cat: "S-32", label: "I", quantity: 1},
        {cat: "V-23", label: "J", quantity: 1},
        {cat: "X-34", label: "K", quantity: 1},
        {cat: "X-81", label: "L", quantity: 1},
        {cat: "E-14", label: "M", quantity: 1}
      ]
    },
    { id: "4oDzNiAA8AARSCK3", name: "Dental Tray Set", imagePath: "/trays/dental-set.jpg",
      instruments: [
        {cat: "S-40", label: "A", quantity: 2}, 
        {cat: "B-33", label: "B", quantity: 1}, 
        {cat: "E-14", label: "C", quantity: 2}, 
        {cat: "Y-28", label: "D", quantity: 1}, 
        {cat: "C-41", label: "E", quantity: 1}, 
        {cat: "N-14", label: "F", quantity: 1}, 
        {cat: "L-22", label: "G", quantity: 1}, 
        {cat: "W-27", label: "H", quantity: 1}, 
        {cat: "Q-76", label: "I", quantity: 2}, 
      ]
    },
    { id: "4oDzNiAA8AARSHBR", name: "Dermatology Set", imagePath: "/trays/dermatology-set.jpg",
      instruments: [
        {cat: "K-10", label: "A", quantity: 1}, 
        {cat: "T-61", label: "B", quantity: 1}, 
        {cat: "X-59", label: "C", quantity: 1}, 
        {cat: "N-57", label: "D", quantity: 1}, 
        {cat: "A-56", label: "E", quantity: 1}, 
        {cat: "Y-87", label: "F", quantity: 1}, 
        {cat: "E-14", label: "G", quantity: 1}, 
        {cat: "M-35", label: "H", quantity: 1}, 
        {cat: "K-14", label: "I", quantity: 1}, 
        {cat: "P-10", label: "J", quantity: 3}, 
      ]
    },
    { id: "4oDzNiAA8AARSEXW", name: "Blepharoplasty Set", imagePath: "/trays/blepharoplasty-set.jpg",
      instruments: [
        {cat: "L-45", label: "A", quantity: 1}, 
        {cat: "X-81", label: "B", quantity: 1}, 
        {cat: "C-87", label: "C", quantity: 1}, 
        {cat: "I-71", label: "D", quantity: 1}, 
        {cat: "P-51", label: "E", quantity: 1}, 
        {cat: "B-54", label: "F", quantity: 1}, 
        {cat: "U-74", label: "G", quantity: 1}, 
        {cat: "C-50", label: "H", quantity: 1}, 
        {cat: "E-14", label: "I", quantity: 1}, 
        {cat: "L-22", label: "J", quantity: 1}, 
        {cat: "S-31", label: "K", quantity: 1}, 
        {cat: "L-9", label: "L", quantity: 1}
      ]
    }
  ]

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

  if (trayDetected && trayData) {
    // Step 1: Map required quantities per category
    const trayInstrumentMap = new Map<string, { tool: Tool; requiredQuantity: number; label: string }>();
    trayData.instruments.forEach(({ cat, quantity, label }) => {
      const matchingTool = tools.find((tool) => tool.cat === cat);
      if (matchingTool) {
        trayInstrumentMap.set(cat, { tool: { ...matchingTool, label }, requiredQuantity: quantity, label });
      }
    });

    // Step 2: Count detected tools per category
    const detectedTools = tools.filter((tool) => detectedIDs.has(tool.id));
    const detectedCategoryCounts = new Map<string, Tool[]>();
    detectedTools.forEach((tool) => {
      if (!detectedCategoryCounts.has(tool.cat)) {
        detectedCategoryCounts.set(tool.cat, []);
      }
      detectedCategoryCounts.get(tool.cat)!.push(tool);
    });

    const trayCategories = new Set(trayData.instruments.map((instrument) => instrument.cat));

    // Step 3: Classify tools into correct, missing, and incorrect
    const correct: CorrectTool[] = [];
    const incorrect: IncorrectTool[] = [];
    const missing: MissingTool[] = [];

    trayInstrumentMap.forEach(({ tool, requiredQuantity, label }, cat) => {
      const detectedToolsForCat = detectedCategoryCounts.get(cat) || [];
      const detectedQuantity = detectedToolsForCat.length;

      if (detectedQuantity < requiredQuantity) {
        // If detected tools are fewer than required, mark as missing
        missing.push({ ...tool, missingQuantity: requiredQuantity - detectedQuantity, label });
      }

      if (detectedQuantity > requiredQuantity) {
        // Extra tools are incorrect with incorrectQuantity
        incorrect.push(
          ...detectedToolsForCat.slice(requiredQuantity).map((tool) => ({
            ...tool,
            label,
            incorrectQuantity: detectedToolsForCat.length - requiredQuantity,
          }))
        );
      }

      // Correct tools (only up to required quantity)
      correct.push(
        ...detectedToolsForCat.slice(0, Math.min(detectedQuantity, requiredQuantity)).map((tool) => ({
          ...tool,
          label,
          correctQuantity: Math.min(detectedQuantity, requiredQuantity),
        }))
      );
    });

    // Step 4: Assign incorrect tools that are not part of the tray
    detectedTools.forEach((tool) => {
      if (!trayCategories.has(tool.cat)) {
        const existingIncorrectTool = incorrect.find((incorrectTool) => incorrectTool.cat === tool.cat);

        if (existingIncorrectTool) {
          // Increment quantity if already present
          existingIncorrectTool.incorrectQuantity += 1;
        } else {
          // Add new incorrect tool entry
          incorrect.push({ ...tool, label: "", incorrectQuantity: 1 });
        }
      }
    });

    // Step 4: Update state
    setCorrectItems(correct);
    setMissingItems(missing);
    setIncorrectItems(incorrect);

    setIsTrayCompleted(incorrect.length === 0 && missing.length === 0);
  } else {
    // Step 5: Detect tray itself if not already detected
    const detectedTray = trays.find((tray) => detectedIDs.has(tray.id));

    setTrayDetected(!!detectedTray);
    setTrayData(detectedTray);
  }

}, [rfidTags]);
  
  return (
    <div className={styles.page}>

    {!trayDetected && 
        <div style={{display: "flex", flexDirection: "column", width:"200px", height:"100%", marginTop:"8rem"}}>
          <div className={styles.pleasePlaceTray}>
              <div>
                  <h2 className={styles.plsLabel}>Please place a tray in the scanning area to begin assembly.</h2>
                  <img src="/assets/placeTray.gif" alt="place tray" className={styles.gif}></img>
                  <div className={styles.plsOverride}>
                    <button className="btn-primary btn-primary-inverted" onClick={() => {setTrayDetected(true)}}>Manual Override</button>
                  </div>
              </div>
          </div>
        </div>
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
                      <ExpansiveToolInformation item={item} quantity={item.incorrectQuantity} index={index} ></ExpansiveToolInformation>
                    ))}
                  </div>
                  {/* MISSING ITEMS */}
                  <div className={styles.sectionTitle} onClick={() => setMissingActive(missingActive === 'missingItems' ? null : 'missingItems')}>
                    Missing Items ({missingItems.reduce((total, item) => total + item.missingQuantity, 0)}) 
                    <span>{missingActive === 'missingItems' ? '−' : '+'}</span>
                  </div>
                  <div id='missingItems' className={`${styles.sectionContent} ${missingActive === 'missingItems' ? styles.active : ''}`}>
                    {missingItems.map((item, index) => (
                      <ExpansiveToolInformation item={item} quantity={item.missingQuantity} index={index} ></ExpansiveToolInformation>
                    ))}
                  </div>

                  {/* CORRECT ITEMS */}
                  <div className={styles.correctItems} onClick={() => toggleSection('correctItems')}>
                    Correct Items ({correctItems.length}) <span>{correctActive === 'correctItems' ? '−' : '+'}</span>
                  </div>
                  <div id='correctItems' className={`${styles.sectionContent} ${correctActive === 'correctItems' ? styles.active : ''}`}>
                    {correctItems.map((item:any, index:number) => (
                      <ExpansiveToolInformation item={item} quantity={item.correctQuantity} index={index} ></ExpansiveToolInformation>
                    ))}
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.trayOverview}>
            <h4 className={styles.subtitle}>TRAY OVERVIEW</h4>
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
            <h4 className={styles.subtitle}>REFERENCE IMAGE</h4>
            <div className={styles.section}>
            <div className={styles.container}>
              <Image
                src={trayData?.imagePath || trayImage}
                alt="Tray Image"
                width={1000}
                height={800}
              />
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
        {/* <div>
            <h1>RFID Tags</h1>
            <ul>
                {rfidTags.map((id, index) => (
                    <li key={index}>{id}</li>
                ))}
            </ul>
        </div> */}
      
      </main>
    }
      
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}


'use client'
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/assembly.module.css";
import React, { useState } from 'react';
import { CompleteModal } from '../components/CompleteModal';
import { TrayInformation } from '../components/TrayInformation';
import {
  Button
} from "@nextui-org/react";

// to change to dynamic content after styles
// Do i make this a component for displaying the tray - but switch for the inventory vs the assembly page? 

export default function assembly() {

  const [correctActive, setCorrectActive] = useState<string | null>(null);
  const [incorrectActive, setIncorrectActive] = useState<string | null>('incorrectItems');
  const [missingActive, setMissingActive] = useState<string | null>('missingItems');

  const toggleSection = (id: string) => {
    setIncorrectActive(prev => (id === 'incorrectItems' ? (prev === id ? null : id) : prev));
    setMissingActive(prev => (id === 'missingItems' ? (prev === id ? null : id) : prev));
    setCorrectActive(prev => (id === 'correctItems' ? (prev === id ? null : id) : prev));
  };
  
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
                      <div className={styles.colSmall}>1</div>
                      <div className={styles.col}>Anti Torque Key</div>
                      <div className={styles.colSmall}><span className={styles.badge}>H</span></div>
                      <div className={styles.col}> 48237026</div>
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
            </div>
          </div>

          </div>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.trayOverview}>
            <h4 className={styles.substitle}>TRAY OVERVIEW</h4>
            {/* ADD ICON */}
            <div className={styles.items}>
              <div className={styles.section}>
                <h1 className={styles.wrongNumber}>2</h1>
                <p>Incorrect Items</p>
              </div>
              <div className={styles.section}>
                <h1 className={styles.wrongNumber}>2</h1>
                <p>Missing Items</p>
              </div>
              <div className={styles.section}>
                <h1 className={styles.correctNumber}>13</h1>                  
                <p>Correct Items</p>
              </div>
            </div>
          </div>
          
          <div className={styles.referenceImage}>
            <h4 className={styles.substitle}>REFERENCE IMAGE</h4>
            <div className={styles.section}>
              {/* ADD IN TRAY IMAGE */}
              {/* <Image src={                                                                                                  } alt='Tray Image'></Image> */}
            </div>
          </div>
        </div>  
      </div>
      <div className={styles.bottomSection}>
      <h2 className={styles.subtitle}>OTHER DETAILS</h2>
      </div>

      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}

'use client'
// Images
import Image from "next/image";
import { useState } from 'react';
import styles from "../styles/assembly.module.css";

interface CompleteModalProps {
    item: {
        id: string;
        name: string;
        cat: string;
        label?: string
        imagePath: string;
    }
    quantity: number;
    index: number;
}

export const ExpansiveToolInformation: React.FC<CompleteModalProps> = ({ item, quantity, index }) => {
    const [isOpen, setIsOpen] = useState<Boolean>(false);

    return(
        <div>
            <div key={index} className={styles.row}>
                <div className={styles.colSmall}>{quantity}</div>
                <div className={styles.col}><a onClick={() => setIsOpen(!isOpen)}>{item.name}</a></div>
                {item.label != "" && 
                    <div className={styles.colSmall}><span className={styles.badge}>{item.label}</span></div>
                }
                {item.label === "" && 
                    <div className={styles.colSmall}>--</div>
                }
                <div className={styles.col}>{item.cat}</div>
                {isOpen && 
                    <Image
                    src={item.imagePath}
                    alt={"Image of " + item.name}
                    width={100}
                    height={100}
                  />
                }
            </div>
        </div>
    );
};

{/* <div key={index} className={styles.row}>
        <div className={styles.colSmall}>{"1"}</div>
        <div className={styles.col}>{item.name}</div>
        <div className={styles.colSmall}><span className={styles.badge}>{item.label}</span></div>
        <div className={styles.col}>{item.cat}</div>
    </div> */}

// <div key={index} className={styles.row}>
//     <div className={styles.colSmall}>{item.missingQuantity}</div> {/* Corrected quantity */}
//     <div className={styles.col}>{item.name}</div>
//     <div className={styles.colSmall}><span className={styles.badge}>{item.label}</span></div>
//     <div className={styles.col}>{item.cat}</div>
// </div>

{/* <div key={index} className={styles.row}>
    <div className={styles.colSmall}>{"1"}</div>
    <div className={styles.col}>{item.name}</div>
    <div className={styles.colSmall}><span className={styles.badge}>{item.label}</span></div>
    <div className={styles.col}>{item.cat}</div>
</div> */}
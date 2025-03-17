import React from "react";
import styles from "../styles/assembly.module.css";
import styles_modal from "../styles/modal.module.css"
import Image from "next/image";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";

export const ToolModal = ({toolInfo, tray}: any) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();


  return (
    <>
      <Button onPress={onOpen} className='btn-primary'>View Details</Button>
      <div className={styles_modal.modalContainer}>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={"outside"} className={`${styles_modal.modal} ${styles_modal.toolsModal}`} closeButton={false}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className={styles_modal.trayHeader}>{toolInfo.name}</ModalHeader>
                <ModalBody className={styles_modal.modalBody}>
                  {/* <main className={styles.main}> */}
                      <div className={styles_modal.topSection}>
                        <div className={styles.leftSection}>
                        <div className={`${styles.trayOverview} ${styles_modal.sectionMargin}`}>
                              <h4 className={styles.substitle}>TOOL OVERVIEW</h4>
                              <div className={styles_modal.toolSection}>
                                <div className={styles.container}>
                                  <h1 className={styles_modal.number}>{toolInfo.qty}</h1>
                                  <p>Quantity</p>
                                </div>
                                <div className={styles.container}>
                                  <h1 className={styles_modal.number}>{toolInfo.cat}</h1>
                                  <p>CAT #</p>
                                </div>
                              </div>
                            </div>
                            <div className={`${styles.instrumentBreakdown} ${styles_modal.sectionMargin}`}>
                                <h4 className={styles.subtitle}>CONTAINING TRAYS</h4>
                                <div className={styles.section}>
                                  <div className={styles.container}>
                                  {/* Table Header */}
                                  <div className={styles.header + ' ' + styles.row}>
                                    <div className={styles.colSmall}>ID</div>
                                    <div className={styles.col}>SET</div>
                                    <div className={styles.col}>STATUS</div>
                                    <div className={styles.colSmall}>NUM. CYCLES</div> 
                                  </div>
                                    {/* TRAYS */}
                                    <div className={`${styles.sectionContent} ${styles_modal.rowSection}`}>
                                      {tray.map((item: any, index: number) => (
                                        <div key={index} className={styles.row}>
                                          <div className={styles.colSmall}>{[".." , item.id.slice(-4)].join("")}</div>
                                          <div className={styles.col}>{item.set}</div>
                                          <div className={styles.col}>{item.status}</div>
                                          <div className={styles.colSmall}>{item.numCycles}</div>
                                          
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                            </div>
                          </div>
                          <div className={styles.rightSection}>

                            <div className={`${styles.referenceImage} ${styles_modal.sectionMargin}`}>
                              <h4 className={styles.substitle}>REFERENCE IMAGE</h4>
                              <div className={styles.section}>
                              <div className={styles.container}>
                                <Image src={toolInfo.imagePath} className={styles_modal.toolImage} alt="Full tray image" width={500} height={500}/>
                              </div>
                              </div>
                        
                            </div>
                          </div>  
                      </div>
                  {/* </main> */}
                </ModalBody>
                <ModalFooter className={styles_modal.modalFoot}>
                  <Button className="btn-primary btn-alert" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};

import React from "react";
import styles from "../styles/modal.module.css";
import Image from "next/image";
import Link from "next/link";
import checkCircle from "../assets/CheckCircle.png";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Radio,
  } from "@heroui/react";
  
  export const MissingTool = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const items = [
        { id: "48237026", name: "Anti Torque Key", quantity: 1 },
        { id: "48237026", name: "Anti Torque Key", quantity: 1 },
    ];
    return (
      <>
        <Button onPress={onOpen} className='btn-primary btn-alert'>Report Missing Item</Button>
        <div className={styles.modalContainer}>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={"outside"} className={styles.modal}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className={styles.missingHeader}>Would you like to report an item as missing?</ModalHeader>
                  <ModalBody>
                <p className={styles.missingDesc}><strong>
                  In order to complete the tray in-app, any missing components
                  must be found and added to the tray to be scanned, or flagged
                  as missing.
                  </strong></p>
                <p className={styles.missingDesc}>
                  You can report an item as missing if you were unable to locate
                  it in any viable locations such as:
                </p>
                <ul className={styles.missingList}>
                  <li>Neighboring trays</li>
                  <li>Sterile storage</li>
                  <li>etc.</li>
                </ul>

                <h3 className={styles.flagItem}>
                  Please select the item to flag:
                </h3>

                <div className={styles.radioGroup}>
                  {items.map((item, index) => (
                    <React.Fragment key={index}>
                      <input
                        type="radio"
                        id={`radio-${index}`}
                        name="missingItem"
                        value={item.id}
                        className={styles.radioInput}
                      />
                      <label
                        htmlFor={`radio-${index}`}
                        className={styles.radioLabel}
                      >
                        <div className={styles.missingItemRow}>
                          <span>{item.quantity}</span>
                          <span>{item.name}</span>
                          <span>--</span>
                          <span>{item.id}</span>
                        </div>
                      </label>
                    </React.Fragment>
                  ))}
                </div>
              </ModalBody>
                  <ModalFooter className={styles.modalFoot}>
                    <Button className='btn-primary' onPress={onClose}>
                      Report Item(s)
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </>
    );
  }
  
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
    Checkbox,
  } from "@nextui-org/react";
  
  export const CompleteModal = () => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
      const checklistItems = [
        {
          label: "I have arranged every instrument in its proper place.",
          description: "Reference the provided images and labels."
        },
        {
          label: "I have reassembled any instruments that need to be reassembled.",
          description: "Reference the provided images and labels."
        },
        {
          label: "I have checked every instrument, tray, and mat for bio-burden.",
          description: "Use the brush for tube-shaped objects."
        },
        {
          label: "I have tested the quality of every instrument.",
          description: "Test scissors for sharpness."
        },
        {
          label: "I have inserted the Sterile Indicator.",
          description: "Trim the end and attach it on the outside of the tray."
        },
        {
          label: "I have marked my initials on the sticker/label.",
          description: "Description"
        }
      ];

    return (
      <>
        <Button onPress={onOpen} className='btn-primary'>Complete Tray</Button>
        <div className={styles.modalContainer}>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={"outside"} className={styles.modal}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className={styles.completeHeader}>Looks like you have all your items!</ModalHeader>
                  <ModalBody className={styles.modalBody}>
                    <Image src={checkCircle} alt="check" className={styles.checkIcon}/>
                    <div id="checkboxes">
                      <p className={styles.subheader}>Please ensure the following tasks are completed:</p>
                      <div className={styles.checklistContainer}>
                        {checklistItems.map((item, index) => (
                          <div key={index} className={styles.checklistItem}>
                            <label className={styles.label}>
                              <input type="checkbox" className={styles.checkbox} />
                              {item.label}
                            </label>
                            <p className={styles.description}>{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter className={styles.modalFoot}>
                    <Button className='btn-primary btn-alert'onPress={onClose}>
                      I'm not Finished.
                    </Button>
                    <Button className='btn-primary' onPress={onClose}>
                      Complete Tray
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
  
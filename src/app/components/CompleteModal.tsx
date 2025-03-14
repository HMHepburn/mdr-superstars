"use client";

import React from "react";
import styles from "../styles/modal.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import checkCircle from "../assets/CheckCircle.png";
import alertSymbol from "../assets/AlertSymbol.png";
import { useState } from "react";

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Checkbox,
  } from "@heroui/react";

  interface CompleteModalProps {
    isCompleted: Boolean;
  }
  
  export const CompleteModal: React.FC<CompleteModalProps> = ({ isCompleted }) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [canSubmit, setCanSubmit] = useState<Boolean>(false);

    let checklistItems = [
      {
        label: "I have arranged every instrument in its proper place.",
        description: "Reference the provided images and labels.",
        checked: false
      },
      {
        label: "I have reassembled any instruments that need to be reassembled.",
        description: "Reference the provided images and labels.",
        checked: false
      },
      {
        label: "I have checked every instrument, tray, and mat for bio-burden.",
        description: "Use the brush for tube-shaped objects.",
        checked: false
      },
      {
        label: "I have tested the quality of every instrument.",
        description: "Test scissors for sharpness.",
        checked: false
      },
      {
        label: "I have inserted the Sterile Indicator.",
        description: "Trim the end and attach it on the outside of the tray.",
        checked: false
      },
      {
        label: "I have marked my initials on the sticker/label.",
        description: "Description",
        checked: false
      }
    ];

    const router = useRouter(); // Initialize useRouter

    const handleCheckboxChange = (index: number) => {
      checklistItems[index].checked = !checklistItems[index].checked;

      if(checklistItems.every(checklistItem => checklistItem.checked) == true) {
        setCanSubmit(true);
      }
    }

    const handleComplete = (onClose: () => void) => {
        onClose(); // Close the modal
        router.push("/"); // Redirect to homepage
    };

    return (
      <>
        <Button onPress={onOpen} className='btn-primary'>Complete Tray</Button>
        <div className={styles.modalContainer}>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={"outside"} className={styles.modal}>
            <ModalContent>
              {(onClose) => (
                <>
                {/* isCompleted goes here to change output! */}
                  <ModalHeader className={isCompleted ? styles.incompleteHeader : styles.completeHeader}>
                    {isCompleted ? "Looks like you have all your items!" : "The tray has missing or incorrect items!"}
                  </ModalHeader>
                  <ModalBody className={styles.modalBody}>
                    <Image src={isCompleted ? checkCircle : alertSymbol} alt="check" className={styles.checkIcon}/>
                    <div id="checkboxes">
                      <p className={styles.subheader}>Please ensure the following tasks are completed:</p>
                      <div className={styles.checklistContainer}>
                        {checklistItems.map((item, index) => (
                          <div key={index} className={styles.checklistItem}>
                            <label className={styles.label}>
                              <input type="checkbox" className={styles.checkbox} onChange={() => handleCheckboxChange(index)}/>
                              {item.label}
                            </label>
                            <p className={styles.description}>{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter className={styles.modalFoot}>
                    <Button className='btn-primary btn-alert' onPress={onClose}>
                      I'm not Finished.
                    </Button>
                    {canSubmit &&
                      <Button className='btn-primary' onPress={() => handleComplete(onClose)}>
                        {isCompleted ? "Complete Tray" : "Confirm and Submit Incomplete Tray"}
                      </Button>
                    }
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </>
    );
  }
  
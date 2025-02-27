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
} from "@heroui/react";

export const TrayInformation = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const details = {
  service: "Spine",
        setName: "XIA-3 INSTRUMENT SET - 26011",
        shelfLocation: "N/A",
        priority: "HIGH",
        decontaminationCycle: "INSTRUMENTS SEPARATED BY PATIENT",
        sterilization: "STEAM",
        sterilizationCycle: "STANDARD",
        biRequired: "NO",
        peelPack: "NO",
        wrap: "YES",
        quantity: "2",
        version: "1",
        dateRevised: "2023-01-05",
        assemblyInstructions: "Place tray liner under pan",
        packaging: "40 x 55",
        comments: "N/A",
        consignment: "N/A",
        onTrial: "N/A"
  };

  return (
    <>
      <Link href="#" onClick={(e) => { e.preventDefault(); onOpen(); }} className={styles.triggerLink}>
        View Tray Information
      </Link>
      <div className={styles.modalContainer}>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior={"outside"} className={styles.modal} closeButton={false}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className={styles.trayHeader}>{details.setName}</ModalHeader>
                <ModalBody className={styles.modalBody}>
                  <div className={styles.detailsContainer}>
                    <hr className={styles.divider}></hr>
                    <p><strong>SERVICE:</strong> <span className={styles.tagBlue}>{details.service}</span></p>
                    <p><strong>SHELF LOCATION:</strong> {details.shelfLocation}</p>
                    <p><strong>PRIORITY:</strong> <span className={styles.tagRed}>{details.priority}</span></p>
                    <p><strong>DECONTAMINATION CYCLE:</strong> <span className={styles.textRed}>{details.decontaminationCycle}</span></p>
                    <p><strong>STERILIZATION:</strong> {details.sterilization}</p>
                    <p><strong>STERILIZATION CYCLE:</strong> {details.sterilizationCycle}</p>
                    <p><strong>BI REQUIRED:</strong> {details.biRequired}</p>
                    <p><strong>PEEL PACK:</strong> {details.peelPack}</p>
                    <p><strong>WRAP:</strong> {details.wrap}</p>
                    <p><strong>QUANTITY:</strong> {details.quantity}</p>
                    <p><strong>VERSION:</strong> {details.version}</p>
                    <p><strong>DATE REVISED:</strong> {details.dateRevised}</p>
                    <p><strong>ASSEMBLY INSTRUCTIONS:</strong> {details.assemblyInstructions}</p>
                    <p><strong>PACKAGING:</strong> {details.packaging}</p>
                    <p><strong>COMMENTS:</strong> {details.comments}</p>
                    <p><strong>CONSIGNMENT:</strong> {details.consignment}</p>
                    <p><strong>ON TRIAL:</strong> {details.onTrial}</p>
                  </div>
                </ModalBody>
                <ModalFooter className={styles.modalFoot}>
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

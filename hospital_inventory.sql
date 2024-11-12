CREATE DATABASE hospital_inventory;
USE hospital_inventory;

CREATE TABLE Tray (
    Tray_ID VARCHAR(50) PRIMARY KEY,
    Tray_Name VARCHAR(100),
    Current_Status VARCHAR(50),
    Service VARCHAR(50),
    Priority VARCHAR(50),
    Decontamination_Cycle VARCHAR(100),
    Sterilization VARCHAR(50),
    Sterilization_Cycle VARCHAR(50),
    BI_Required VARCHAR(10),
    Peel_Pack VARCHAR(10),
    Wrap VARCHAR(10),
    Quantity INT,
    Version INT,
    Assembly_Instructions TEXT,
    Packaging VARCHAR(50)
);

CREATE TABLE Tray_Images (
    Tray_ID VARCHAR(50),
    Image_ID VARCHAR(100) PRIMARY KEY,
    Image_Description VARCHAR(255),
    Image_Filepath VARCHAR(255),
    FOREIGN KEY (Tray_ID) REFERENCES Tray(Tray_ID)
);

CREATE TABLE Tray_Items (
    Item_ID VARCHAR(50),
    Tray_ID VARCHAR(50),
    Sub_Tray VARCHAR(50),
    Tray_Item_Description VARCHAR(255),
    Quantity INT,
    Image_ID VARCHAR(100),
    Placement VARCHAR(50),
    FOREIGN KEY (Tray_ID) REFERENCES Tray(Tray_ID),
    FOREIGN KEY (Image_ID) REFERENCES Tray_Images(Image_ID)
);

CREATE TABLE Item_Manufacturer (
    Item_ID VARCHAR(50) PRIMARY KEY,
    Manufacturer VARCHAR(100),
    Manufacturer_ID BIGINT,
    Effective_DateTime DATETIME,
    FOREIGN KEY (Item_ID) REFERENCES Tray_Items(Item_ID)
);

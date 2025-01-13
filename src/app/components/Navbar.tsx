'use client'

import Link from 'next/link';
import styles from "../styles/navbar.module.css";
import { useRouter } from "next/navigation";
// Images
import Image from "next/image";
import accountIcon from "../assets/accountIcon.png"
import GRHLogo from "../assets/GRHLogo.png"
import GRHLogo2 from "../assets/GRHLogo2.png"

export const Navbar = () => {
    const router = useRouter()
    const navLinks = [
        {
            name: "Admin",
            link: "/"
        },
        {
            name: "Inventory",
            link: "/inventory"
        },
        {
            name: "Assembly",
            link: "/assembly"
        },
    ];

    return(
        <nav className={styles.base}>
            <div className={styles.container}>
                <a href='/'>
                    <Image src={GRHLogo} className={styles.logo} alt="Admin Icon" />
                </a>
                <a href='/'className={styles.navbarlinks}>
                    <Image src={accountIcon} className={styles.icon} alt="Admin Icon" />
                </a>
                {navLinks.map(({ link, name }) => (
                    <Link key={name} href={link} className={styles.navbarlinks}>
                        {name}
                    </Link>
                ))}
            </div>
        </nav>
    );
};
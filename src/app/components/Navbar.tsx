'use client'

import Link from 'next/link';
import styles from "../styles/navbar.module.css";
import { useRouter } from "next/navigation";
// Images
import Image from "next/image";
import accountIcon from "../assets/accountIcon.png"
import GRHLogo from "../assets/GRHLogo.png"
import GRHLogo3 from "../assets/GRHLogo3.png"

export const Navbar = () => {
    const router = useRouter()
    const navLinks = [
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
                    <Image src={GRHLogo3} className={styles.logo} alt="GRH Logo" />
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
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import file from "./assets/file.png"
import tools from "./assets/surgical-tools.png"

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
      
      <div className={styles.titlesection}>
        <h1>Welcome!</h1>
        <p className={styles.subtitle}>Select an option or scan a tray to start.</p>
      </div>

      {/* add styles for a component */}
      <div className={styles.options}>
        <Link href="/assembly" className={[styles.option, styles.assembly].join(" ")}>
          <Image src={tools} className={styles.icon} alt="Surgical tools" />
          <div>
            <h2>ASSEMBLY</h2>
            <p>Organise tools and trays.</p>
          </div>
        </Link>
        <Link href="/inventory" className={[styles.option, styles.inventory].join(" ")}>
          <Image src={file} className={styles.icon} alt="file" />        
          <div>
            <h2>INVENTORY</h2>
            <p>Manage tools and trays.</p>
          </div>
        </Link>
      </div>


      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
  );
}

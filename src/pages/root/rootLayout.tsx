import Navigation from "../../components/Navigation/Navigation";
import styles from "./styles.module.css";

export default function RootLayout() {
  return (
    <>
      <div className={styles.container}>
        <Navigation />
      </div>
    </>
  );
}

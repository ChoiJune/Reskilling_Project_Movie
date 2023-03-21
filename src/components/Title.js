import styles from "./Title.module.css";
import logo from "../images/logo.png";

function Title({}) {
  return (
    <div className={styles.title}>
      <a href="#">
        <div className={styles.logo}>
          <img src={logo} alt="LG로고" className={styles.image}></img>
          <header>Reskilling Movie</header>
        </div>
      </a>
      <div className={styles.banner}>
        <a href="#" className={styles.option}>
          멤버십
        </a>
        <a href="#" className={styles.option}>
          영화관 찾기
        </a>
        <a href="https://www.cgv.co.kr/" className={styles.option}>
          CGV
        </a>
        <a href="https://www.megabox.co.kr/" className={styles.option}>
          메가박스
        </a>
        <a href="https://www.lottecinema.co.kr/" className={styles.option}>
          롯데시네마
        </a>
      </div>
    </div>
  );
}

export default Title;

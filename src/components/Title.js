import styles from "./Title.module.css";
import logo from "../images/logo.png";
import navermap from "../images/navermap.png";

function Title({}) {
  return (
    <div className={styles.title}>
      <a href="/">
        <div className={styles.logo}>
          <img src={logo} alt="LG로고" className={styles.image}></img>
          <header>Reskilling Movie</header>
        </div>
      </a>
      <div className={styles.banner}>
        <a href="#" className={styles.option}>
          멤버십
        </a>
        <a
          href="https://www.cgv.co.kr/"
          className={styles.option}
          target="_blank"
        >
          CGV
        </a>
        <a
          href="https://www.lottecinema.co.kr/"
          className={styles.option}
          target="_blank"
        >
          롯데시네마
        </a>
        <a
          href="https://www.megabox.co.kr/"
          className={styles.option}
          target="_blank"
        >
          메가박스
        </a>
        <a
          href="https://map.naver.com/v5/search/%20%EC%98%81%ED%99%94%EA%B4%80?c=14,0,0,0,dh"
          className={styles.findmap}
          target="_blank"
        >
          <img src={navermap} alt="네이버지도" className={styles.navermap} />
          <p className={styles.findbutton}>주변 영화관 찾기</p>
        </a>
      </div>
    </div>
  );
}

export default Title;

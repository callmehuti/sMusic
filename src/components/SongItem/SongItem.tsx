import styles from '@styles/SongItem.module.scss';

interface IProp {
  pos?: number | string;
  imgPath: string;
  title: string;
  channel: string;
  pageNumber: number;
}

function SongItem(props: IProp) {
  let pos = 0;
  if (props?.pos) {
    pos = Number(props?.pos) + props.pageNumber * 10;
  }
  return (
    <div className={styles.itemContainer}>
      {pos > 0 ? <div className={styles.pos}>{pos < 10 ? `0${pos}` : pos}</div> : null}
      <div className={styles.image}>
        <img src={props.imgPath} alt='' />
      </div>
      <div className={styles.title}>
        <p>sondev</p>
        <p>{props.channel}</p>
      </div>
    </div>
  );
}

export default SongItem;

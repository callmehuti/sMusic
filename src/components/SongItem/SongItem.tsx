import styles from "./songItem.module.scss";

interface IProp {
  pos?: number | string;
  imgPath: string;
  title: string;
  channel: string;
  pageNumber?: number;
}

function SongItem(props: IProp) {
  let pos = 0;
  if (props?.pos) {
    pos = Number(props?.pos) + props.pageNumber * 10;
  }
  return (
    <div className={styles.itemContainer}>
      {pos > 0 ? <div>{pos < 10 ? `0${pos}` : pos}</div> : null}
      <div>
        <img src={props.imgPath} alt="" />
      </div>
      <div>
        <p>{props.title}</p>
        <p>{props.channel}</p>
      </div>
    </div>
  );
}

export default SongItem;

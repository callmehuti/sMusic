import Skeleton from 'react-loading-skeleton'
import styles from '@styles/SongItem.module.scss'

interface IProps {
  quantity: number
}

const SkeletonSongItem = (props: IProps) => {
  return Array(props.quantity)
    .fill(0)
    .map((_, index) => (
      <div key={index} className={styles.itemContainer}>
        <div className={styles.pos}>
          <Skeleton width={'1.5rem'} height={'3rem'} />
        </div>
        <div className={styles.image}>
          <Skeleton width={'10rem'} height={'6rem'} />
        </div>
        <div className={styles.title}>
          <Skeleton height={'1rem'} style={{ marginBottom: '15px' }} />
          <Skeleton width='35rem' height={'1rem'} />
        </div>
      </div>
    ))
}

export default SkeletonSongItem

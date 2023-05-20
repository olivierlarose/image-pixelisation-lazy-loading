import styles from './page.module.css'
import PixelatedImage from '../components/PixelatedImage';

export default function Home() {
  return (
    <div className={styles.main}>
      {
        [...Array(7).keys()].map( (_, index) => {
          return <PixelatedImage src={`/images/${index}.png`} src10={`/images/${index}_small.png`}/>
        })
      }
    </div>
  )
}

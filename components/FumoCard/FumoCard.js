import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { getImageUrl } from '../../helpers';
import styles from './FumoCard.module.css';

export default function FumoCard({ character, image, link, rarity, releaseYears, type, version }) {

    const [showFront, setShowFront] = useState(true)
    const nameString = character.fields.name;
    const typeString = type.fields.name;

    return <div className={styles.card}>
        {!showFront ? null : <div className={styles.image}>
            <Image src={getImageUrl(image)} layout='fill' objectFit="contain" alt={`${nameString} ${typeString} ${version}`} />
        </div>}
        <h2 className={styles.fumoTitle}>{nameString} - {version}</h2>
        <div className={styles.fact}>{typeString}</div>
        {showFront ? null : <div className={styles.fact}>{rarity.fields.name}</div>}
        {showFront ? null : <div className={styles.listTitle}>Release Years</div>}
        {showFront ? null : <div className={styles.list}>
            {releaseYears.map((year, index) => {
                return <div key={index} className={styles.listEntry}>
                    {year.fields.year}
                </div>
            })}
        </div>}
        {showFront ? null : <Link href={link}>
            <a className={styles.link}>Link to Gift Website</a>
        </Link>}
        <button className={styles.button} onClick={() => setShowFront(!showFront)}>{showFront ? 'Show' : 'Hide'} Details</button>
    </div>
    
}
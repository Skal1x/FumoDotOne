import styles from "./FumoGrid.module.css";
import { Card, FumoCard } from "../components"

export default function FumoGrid({fumos, selectedChar, selectedType, minYear, maxYear, selectedRarity, selectedColor}) {
    return <div className={styles.container}>
        {fumos.map(({fields}, index) => {

            if (selectedChar !== 'none' && selectedChar !== fields.character.fields.name) return null; // Check Character
            if (selectedType !== 'none' && selectedType !== fields.type.fields.name) return null; // Check Type
            if (selectedRarity !== 'none' && selectedRarity !== fields.rarity.fields.name) return null; // Check Rarity

            // Check Color
            let hasColor = false;

            if (selectedColor === 'none') {
                hasColor = true;
            } else {
                for (let i = 0; i < fields?.colors?.length; i++) {
                    if (selectedColor === fields?.colors[i]?.fields?.name) {
                        hasColor = true;
                        break;
                    }
                }
                    
            }

            if (!hasColor) return null;

            // Check Timespan compatability
            let isInTimeSpan = false;

            for (let y = minYear; y <= maxYear; y++) {
                for (let e = 0; e < fields.releaseYears.length; e++) {
                    if (parseInt(fields.releaseYears[e].fields.year) === y) {
                        isInTimeSpan = true;
                    }
                }
            }
            
            if (!isInTimeSpan) return null;

            return <Card key={index}>
                <FumoCard {...fields} />
            </Card>
        })}
    </div>
}
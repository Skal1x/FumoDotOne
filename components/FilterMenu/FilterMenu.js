import styles from "./FilterMenu.module.css";
import 'rc-slider/assets/index.css';
import { useEffect, useRef, useState } from "react";
import { clamp, useMediaQuery } from "../../helpers";

export default function FilterMenu({ showFilter, chars, types, rarities, colors, overwriteFilters }) {

    const minValue = 2008;
    const maxValue = 2022;

    const [filter, setFilter] = useState(false);
    const [selectedChar, setSelectedChar] = useState('none');
    const [selectedType, setSelectedType] = useState('none');
    const [selectedRarity, setSelectedRarity] = useState('none');
    const [selectedColor, setSelectedColor] = useState('none');

    const isMobile = useMediaQuery(1024);
    const leftSlider = useRef();
    const rightSlider = useRef();
    const minInput = useRef();
    const maxInput = useRef();
    const progress = useRef();

    useEffect(() => {
        setFilter(showFilter)
    }, [showFilter])

    useEffect(() => {

        const addSliderListener = (element) => {
            element.current.addEventListener("input", (e) => {
                const leftVal = parseInt(leftSlider.current.value);
                const rightVal = parseInt(rightSlider.current.value);
                const yearDiff = maxValue - minValue;
    
                const leftStyle = `${((leftVal - minValue) / yearDiff) * 100}%`;
                const rightStyle = `${100 - (((rightVal - minValue) / yearDiff) * 100)}%`;
    
                if (rightVal - leftVal < 0) {
                    if (e.target.id === 'rangeMin') {
                        leftSlider.current.value = rightVal;
                    } else {
                        rightSlider.current.value = leftVal;
                    }
                } else {
                    minInput.current.value = leftSlider.current.value;
                    maxInput.current.value = rightSlider.current.value;
                    progress.current.style.left = leftStyle;
                    progress.current.style.right = rightStyle;
                }

                if (leftVal === maxValue) {
                    leftSlider.current.style.zIndex = 51;
                    rightSlider.current.style.zIndex = 50;
                } else {
                    leftSlider.current.style.zIndex = 50;
                    rightSlider.current.style.zIndex = 51;
                }
            })
        }

        addSliderListener(leftSlider);
        addSliderListener(rightSlider);

        
    }, [leftSlider, rightSlider, progress])

    const getContainerStyle = () => {
        if (isMobile) {
            if (filter) {
                return styles.containerMobile
            }

            return styles.containerMobileHidden
        } else {
            return styles.container;
        }
    }

    const handleInput = (type, element) => {

        const yearDiff = maxValue - minValue;

        let leftVal;
        let rightVal;

        // Update Slider
        if (type === 'min') {
            
            rightVal = parseInt(rightSlider.current.value);
            leftVal = clamp(rightVal, minValue, parseInt(element.value))

            leftSlider.current.value = leftVal;


        } else {

            leftVal = parseInt(leftSlider.current.value);
            rightVal = clamp(maxValue, leftVal, parseInt(element.value))

            rightSlider.current.value = rightVal;

        }

        // Update Background Bar
        const leftStyle = `${((leftVal - minValue) / yearDiff) * 100}%`;
        const rightStyle = `${100 - (((rightVal - minValue) / yearDiff) * 100)}%`;

        progress.current.style.left = leftStyle;
        progress.current.style.right = rightStyle;

    }

    const handleSelect = (type, index) => {
        switch (type) {
            case 'char': setSelectedChar(index === 0 ? 'none' : chars[index - 1].fields.name); break;
            case 'type': setSelectedType(index === 0 ? 'none' : types[index - 1].fields.name); break;
            case 'rarity': setSelectedRarity(index === 0 ? 'none' : rarities[index - 1].fields.name); break;
            case 'color': setSelectedColor(index === 0 ? 'none' : colors[index - 1].fields.name); break;
            default: console.log('HUH');
        }
    }

    const submitFilters = () => {
        overwriteFilters(selectedChar, selectedType, parseInt(leftSlider.current.value), parseInt(rightSlider.current.value), selectedRarity, selectedColor);
    }
    

    return <div className={getContainerStyle()}>
        <h3 className={styles.title}>Filters</h3>

        {/* Character Filter */}
        <div className={styles.filterSection}>
            <h4 className={styles.filterTitle}>Character</h4>
            <select className={styles.filterSelect} onChange={(e) => handleSelect('char', e.target.selectedIndex)}>
                <option className={styles.filterOption}>Choose One</option>
                {chars.map((character, index) => {
                    return <option className={styles.filterOption} key={index}>
                        {character.fields.name}
                    </option>
                })}
            </select>
        </div>

        {/* Type Filter */}
        <div className={styles.filterSection}>
            <h4 className={styles.filterTitle}>Type</h4>
            <select className={styles.filterSelect} onChange={(e) => handleSelect('type', e.target.selectedIndex)}>
                <option className={styles.filterOption}>Choose One</option>
                {types.map((type, index) => {
                    return <option className={styles.filterOption} key={index}>
                        {type.fields.name}
                    </option>
                })}
            </select>
        </div>

        {/* Release Year Range Slider */}
        <div className={styles.filterSection}>
            <h4 className={styles.filterTitle}>Release Years</h4>
            <div className={styles.rangeSliderInputContaner}>
                <span className={styles.rangeSliderInputLabel}>Min</span>
                <input ref={minInput} type={'number'} className={styles.rangeSliderInput} defaultValue={'2008'} onChange={(e) => handleInput('min', e.target)} />
                <span className={styles.rangeSliderInputLabel}>Max</span>
                <input ref={maxInput} type={'number'} className={styles.rangeSliderInput} defaultValue={'2022'} onChange={(e) => handleInput('max', e.target)} />
                <div className={styles.slider}>
                    <div ref={progress} className={styles.progress}></div>
                </div>
                <div className={styles.rangeInput}>
                    <input ref={leftSlider} type={'range'} className={styles.rangeMin} id='rangeMin' min={minValue} max={maxValue} defaultValue={minValue} />
                    <input ref={rightSlider} type={'range'} className={styles.rangeMax} id='rangeMax' min={minValue} max={maxValue} defaultValue={maxValue} />
                </div>
            </div>
        </div>

        {/* Rarity Filter */}
        <div className={styles.filterSection}>
            <h4 className={styles.filterTitle}>Rarity</h4>
            <select className={styles.filterSelect} onChange={(e) => handleSelect('rarity', e.target.selectedIndex)}>
                <option className={styles.filterOption}>Choose One</option>
                {rarities.map((rarity, index) => {
                    return <option className={styles.filterOption} key={index}>
                        {rarity.fields.name}
                    </option>
                })}
            </select>
        </div>

        {/* Color Filter */}
        <div className={styles.filterSection}>
            <h4 className={styles.filterTitle}>Color</h4>
            <select className={styles.filterSelect} onChange={(e) => handleSelect('color', e.target.selectedIndex)}>
                <option className={styles.filterOption}>Choose One</option>
                {colors.map((color, index) => {
                    return <option className={styles.filterOption} key={index}>
                        {color.fields.name}
                    </option>
                })}
            </select>
        </div>
        <button className={styles.button} onClick={() => submitFilters()}>Apply</button>
    </div>
}
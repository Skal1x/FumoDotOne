import styles from './Header.module.css';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useMediaQuery } from '../../helpers';
import { FilterMenu } from '../components';

export default function Header({ callback, showMenu, chars, types, rarities, colors, enableFilters = true }) {

    const router = useRouter();
    const isMobile = useMediaQuery(1024);

    const toggleTab = (type) => {
        callback(type);
    }

    const filterCallback = (char, type, minYear, maxYear, rarity, color) => {
        overwriteFilters(char, type, minYear, maxYear, rarity, color)
    }

    return (
        <header className={styles.header}>
            <div className={styles.navbar}>
                {enableFilters ? <div className={styles.filterToggle} onClick={() => toggleTab('filter')} >
                    <Image src={'/images/filter.svg'} width={32} height={32} alt='Filter Icon' />
                </div> : null }
                {/* <h1 className={styles.title} onClick={() => router.push('/')}>Fumo.One</h1> */}
                <div className={styles.logo}>
                    <Image src={'/images/logo-light-experimental.svg'} layout={'fill'} alt={'Fumo.One Logo'} objectFit={'contain'} objectPosition={'left center'}/>
                </div>
                <div className={styles.menuToggle} onClick={() => toggleTab('menu')} >
                    <Image src={'/images/menu.svg'} width={32} height={32} alt='Menu Icon' />
                </div>
                <div className={styles.desktop_menu_options}>
                    <div className={styles.menu_option} onClick={() => router.push('/')}>Fumo-Index</div>
                    <div className={styles.menu_option} onClick={() => router.push('/characters')}>Characters</div>
                    <div className={styles.menu_option} onClick={() => router.push('/checklist')}>Checklist</div>
                </div>
            </div>
            <div className={styles.tabContainer}>
                {isMobile && enableFilters ? <FilterMenu chars={chars} types={types} rarities={rarities} colors={colors} overwriteFilters={filterCallback} /> : null}
                {isMobile ? <div className={showMenu ? styles.mobileMenu : styles.mobileMenuHidden}>
                    <div className={styles.mobileMenuOption} onClick={() => router.push('/')}>Fumo-Index</div>
                    <div className={styles.mobileMenuOption} onClick={() => router.push('/characters')}>Characters</div>
                    <div className={styles.mobileMenuOption} onClick={() => router.push('/checklist')}>Checklist</div>
                </div> : null}
            </div>
        </header>
    )
}
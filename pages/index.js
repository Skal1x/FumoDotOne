import { getContent, useMediaQuery } from '../helpers';
import Head from 'next/head'
import { Header, FumoGrid, FilterMenu } from "../components/components"
import { useState } from 'react';

export async function getStaticProps() {

    const { success: fumoSuccess, error: fumoError, result: fumos } = await getContent('fumo');
    const { success: charSuccess, error: charError, result: chars } = await getContent('character');
    const { success: typeSuccess, error: typeError, result: types } = await getContent('type');
    const { success: raritySuccess, error: rarityError, result: rarities } = await getContent('rarity');
    const { success: colorSuccess, error: colorError, result: colors } = await getContent('color');

    if (fumoSuccess && charSuccess && typeSuccess && raritySuccess && colorSuccess) {
        return { 
            props: { 
                fumos: fumos.items,
                chars: chars.items,
                types: types.items,
                rarities: rarities.items,
                colors: colors.items,
                success: true,
                error: null,
                message: null
            }, 
            revalidate: 10 
        } 
    } else {
        let error;
        let message;

        if (!fumoSuccess) {
            error = `Couldn't Fetch Fumos :(`;
            message = fumoError;
        } else if (!charSuccess) {
            error = `Couldn't Fetch Characters :(`;
            message = charError;
        } else if (!typeSuccess) {
            error = `Couldn't Fetch Fumo-Types :(`;
            message = typeError;
        } else if (!raritySuccess) {
            error = `Couldn't Fetch Rarities :(`;
            message = rarityError;
        } else if (!colorError) {
            error = `Couldn't Fetch Colors :(`;
            message = colorError;
        } else {
            error = `Something went wrong :(`;
            message = '';
        }

        return {
            props: {
                fumos: [],
                chars: [],
                types: [],
                rarities: [],
                colors: [],
                success: false,
                error: error | 'Something went wrong :(',
                message: message | 'Unknown Error'
            },
            revalidate: 10
        }
    }
}


export default function Home({ fumos, chars, types, rarities, colors, success }) {

    const [showFilter, setShowFilter] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [selectedChar, setSelectedChar] = useState('none');
    const [selectedType, setSelectedType] = useState('none');
    const [selectedRarity, setSelectedRarity] = useState('none');
    const [selectedColor, setSelectedColor] = useState('none');
    const [minYear, setMinYear] = useState(2008);
    const [maxYear, setMaxYear] = useState(2022);

    const tabToggle = (type) => {
        if (type === 'filter') {
            if (showFilter) {
                setShowFilter(false);
            } else {
                setShowMenu(false);
                setShowFilter(true);
            }
        } else {
            if (showMenu) {
                setShowMenu(false);
            } else {
                setShowFilter(false);
                setShowMenu(true);
            }
        }
    }

    const filterCallback = (char, type, minYear, maxYear, rarity, color) => {
        setSelectedChar(char);
        setSelectedType(type);
        setMinYear(minYear);
        setMaxYear(maxYear);
        setSelectedRarity(rarity);
        setSelectedColor(color);
    }

    return (
        <div>
            <Head>
                <title>Fumo.One - Fumo Information Hub</title>
                <meta name="description" content="An updated version of old fumo information websites" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header callback={tabToggle} showMenu={showMenu} chars={chars} types={types} rarities={rarities} colors={colors} overwriteFilters={filterCallback} />
            { success ? 
            
            <main style={{ display: 'flex', flexDirection: 'row' }}>
                <FilterMenu showFilter={showFilter} chars={chars} types={types} rarities={rarities} colors={colors} overwriteFilters={filterCallback} />
                <FumoGrid fumos={fumos} selectedChar={selectedChar} selectedType={selectedType} minYear={minYear} maxYear={maxYear} selectedRarity={selectedRarity} selectedColor={selectedColor} />
            </main> 
            
            :
            
            <main style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 200px)', textAlign: 'center' }}>
                <h1 style={{ margin: '64px 0 24px 0', fontSize: '48px', fontWeight: '800' }}>ERROR</h1>
                <p style={{ margin: '0 0 12px 0', fontSize: '24px', fontWeight: '600' }}>Something went wrong :(</p>
                <p style={{ margin: '0', fontSize: '16px' }}>Sorry</p>
            </main>
            
            }
        </div>
    )
}

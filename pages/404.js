import Head from "next/head";
import { useState } from "react";
import { ErrorMessage, Header } from "../components/components";

export default function NotFoundPage() {

    const [showFilter, setShowFilter] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

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

    return (
        <div>
            <Head>
                <title>Fumo.One - Fumo Information Hub</title>
                <meta name="description" content="An updated version of old fumo information websites" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header callback={tabToggle} showMenu={showMenu} enableFilters={false} />

            <ErrorMessage title='404 NOT FOUND' message='The page you requested could not be found :(' />

        </div>
    )
}
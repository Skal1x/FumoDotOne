import styles from './ErrorMessage.module.css';

export default function ErrorMessage({ title = 'ERROR', message = 'Something went wrong :(' }) {
    return (
        <main className={styles.container}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.message}>{message}</p>
            <p className={styles.apology}>Sorry</p>
        </main>
    )
}
import PropTypes from 'prop-types';
import styles from './layout.module.css';
import Navbar from '../navbar';

interface LayoutTypes {
    children: any;
}

function Layout({ children }: LayoutTypes) {
    return (
        <>
            <Navbar />
            <main className={styles.container}>
                {children}
            </main>
        </>
    );
}

Layout.propTypes = {

}

export default Layout;
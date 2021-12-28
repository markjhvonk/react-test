

import PropTypes from 'prop-types';
import styles from './layout.module.css';


interface LayoutTypes {
    children: any;
}

function Layout({ children }: LayoutTypes) {
    return (
        <main className={styles.container}>
            {children}
        </main>
    );
}

Layout.propTypes = {

}

export default Layout;
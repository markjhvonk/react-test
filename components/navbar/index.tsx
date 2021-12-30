import { useRouter } from 'next/router'
import {Button} from '../buttons';
import SearchArtists from '../searchArtists';
import styles from './navbar.module.css';

interface NavbarTypes {
    // ...
}


function Navbar({ }: NavbarTypes) {
    const router = useRouter();

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>Album app</div>
            <div className={styles.middle}>
                <SearchArtists />
            </div>
            <div className={styles.buttons}>
                <Button href="/" state={router.route === "/"}>Home</Button>
                <Button href="/favorites" state={router.route === "/favorites"}>Favorites</Button>
            </div>
        </nav>
    );
}

export default Navbar;
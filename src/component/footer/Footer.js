import React from 'react';
import './footer.css';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="footer-top">


                <div className="footer-menu">
                    <ul>
                        <li>
                            <a href="/#">help center</a>
                        </li>
                        <li>
                            <a href="/#">privacy and cookies statement</a>
                        </li>
                        <li>
                            <a href="/#">about letsgo</a>
                        </li>
                        <li>
                            <a href="/#">careers</a>
                        </li>
                        <li>
                            <a href="/#">sitemap</a>
                        </li>
                        <li>
                            <a href="/#">supplier sign up</a>
                        </li>
                        <li>
                            <a href="/#">travel agents</a>
                        </li>
                    </ul>
                </div>
                <div className="affiliate-section">
                    <a href="#/">
                        became an affiliate
                    </a>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="footer-bottom-menu">
                    <ul>
                        <li>
                            <a href="#/">&copy; developed by TC</a>
                        </li>
                        <li>
                            <a href="#/">terms & conditions</a>
                        </li>
                        <li>
                            <a href="#/">manage settings</a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
import React from 'react';

const Footer = () => {
    return (
        <div>
            <div className="footer sm:footer-horizontal footer-center bg-gradient-to-b from-[#02071A] via-[#0c1124] to-[#1a2238] text-white/60 p-4">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by Data Price Company Ltd</p>
                </aside>
            </div>
        </div>
    );
};

export default Footer;
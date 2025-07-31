import React from 'react';

const Footer = () => {
    return (
        <div>
            <div className="footer sm:footer-horizontal footer-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white/60 p-4">
                <aside>
                    <p className='text-white/80'>Copyright © {new Date().getFullYear()} - All right reserved by | Data Price Company Ltd</p>
                </aside>
            </div>
        </div>
    );
};

export default Footer;
import { useState } from "react";
import { useLocation } from "react-router-dom";

const TelegramButton = () => {
    const location = useLocation();
    const hiddenRoutes = ['/login', '/register'];
    const [hovered, setHovered] = useState(false); // ✅ This line is fine
    console.log(hovered);

    if (hiddenRoutes.includes(location.pathname)) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
            <a
                href="https://t.me/dpcltd"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="w-16 h-16 rounded-full bg-[#0088cc] hover:bg-[#0077b0] flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110"
            >
                <img
                    src="https://cdn-icons-png.flaticon.com/512/2111/2111646.png"
                    alt="Telegram"
                    className="w-12 h-12"
                />
            </a>
        </div>
    );
};

export default TelegramButton;
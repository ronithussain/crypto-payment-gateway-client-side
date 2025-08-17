import FadeLoader from "react-spinners/FadeLoader";

const LoadingSpinner = () => {
    return (
        <div>
            <div className="flex justify-center items-center min-h-screen">
                <FadeLoader color="#12f4a3" height={12} margin={4} />
            </div>
        </div>
    );
};

export default LoadingSpinner;
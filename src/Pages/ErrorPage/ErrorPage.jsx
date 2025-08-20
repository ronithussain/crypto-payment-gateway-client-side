import { Link, useRouteError } from "react-router-dom";
// import errorImg from '../../assets/ErrorImg/errorPage.jpg'
import errorIcon from '../../assets/ErrorImg/errorIcon.png'

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);
    

    return (
        <div
            // style={{
            //     backgroundImage: `url(${errorImg})`,
            //     backgroundSize: 'cover',
            //     backgroundPosition: 'center',
            //     backgroundRepeat: 'no-repeat',
            // }}
            className="min-h-screen flex justify-center items-center flex-col space-y-4 bg-gradient-to-br from-green-600 to-blue-600">
            {/* Overlay with blur */}
            <div
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    filter: 'blur(200px)',
                    pointerEvents: 'none',
                }}
                className="absolute inset-0"
            >

            </div>
            <div id="error-page" className="text-gray-100 flex flex-col justify-center items-center ">
                <h1 className="font-bold text-3xl ">Oops!</h1>
                <p className="px-1 text-center">Sorry, an unexpected error has occurred.</p>
                <p className=" font-semibold">
                    <i>{error.statusText || error.message}</i>
                </p>
            </div>

            <div className="flex justify-center items-center ">
                <Link to='/' className="bg-[#1490DE] px-2 py-2 sm:px-6 sm:py-3 rounded-lg  font-bold text-gray-100 border-none">Back To Home</Link>
            </div>
            <div>
                <img className="w-18" src={errorIcon} alt="" />
            </div>

        </div>
    );
}

export default ErrorPage;
import { useRouteError, Link } from "react-router-dom";

export default function ErrorRoute() {
    const error = useRouteError();
    return (
        <div className='error'>
            <h2>Coming soon...</h2>
            <p><b>Error status:</b> <u>{error.status} {error.statusText} </u>&#128530;</p>
            <Link to="/">Back to home</Link>
        </div>
    )
}
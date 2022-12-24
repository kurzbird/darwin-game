import { Link } from 'react-router-dom';
import "./Error.css";

const Error = () => {
    return (
        <section>
            <div className='error-text'>
                <h2>Error</h2>
                <p>Page Not Found</p>
                <Link to='/' className="btn">Return Home</Link>
            </div>
        </section >
    )
}

export default Error;

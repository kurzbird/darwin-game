import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <section>
            <h2>Error</h2>
            <p>Page Not Found</p>
            <Link to='/' className="btn">Return to Start Page</Link>
        </section>
    )
}

export default Error;

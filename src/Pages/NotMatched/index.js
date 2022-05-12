import React from 'react';
import { useLocation } from 'react-router-dom';

const NotMatched = () => {
    let location = useLocation();
    return (
        <div>
            <h3 className='text-danger'>404 Error!!</h3>
            No match for <code>{location.pathname}</code>
        </div>
    );
};

export default NotMatched;
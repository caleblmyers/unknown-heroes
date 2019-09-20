import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div className='NotFound bg-tan h-100 p-5 indie-flower'>
    <div className="h1">Oops!</div>
    <p>
      Sorry, the page you requested cannot be found. <Link to='/'>Click
      here</Link> to return to the home page.
    </p>
  </div>
);

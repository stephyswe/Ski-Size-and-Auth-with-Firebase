import React from 'react';
import * as routes from '../constants/routes';
import { Link } from 'react-router-dom';

const LandingPage = () =>
  <div>
    <h1>Landing Page</h1>
    <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
  </div>

export default LandingPage;

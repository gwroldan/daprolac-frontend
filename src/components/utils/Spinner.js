import React from 'react';
import '../../styles/spinner.css';

const Spinner = () => (
    <div className='center'>
      <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
);

export default Spinner;

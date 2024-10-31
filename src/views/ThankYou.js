import React from 'react';

// Icons
import successIcon from '../assets/icons/success-icon.svg'

const ThankYou = () => {
    return (
      <section className="thank-you">
      <div className="thank-you-content">
        <img src={successIcon} 
              alt="Success Servisa" 
              className="thank-you-img" 
          />
          <h2 className="thank-you-title">Vaša prijava je uspješno poslana</h2>
          <p className="thank-you-text">
          Vaša prijava je uspješno poslana i zaprimljena. Kontaktirat ćemo vas u najkraćem mogućem roku. <br/>
          Hvala vam!
          </p>
      </div>
    </section>
    );
};

export default ThankYou;
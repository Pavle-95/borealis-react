import React from 'react';
import { Link } from 'react-router-dom';

// Img
import toolsIcon from 'assets/icons/tools-icon.svg';


const Home = () => {
    return (
        <section className="config-section">
          <div className="config-main-content">
            <img src={toolsIcon} 
                  alt="Konfigurator Servisa" 
                  className="config-img" 
              />
              <h1 className="config-title">Konfigurator Servisa</h1>
              <p className="config-text">
              Pošaljite upit za servis svog vozila pomoću našeg konfiguratora i naš stručan tim će vam se javiti u najkraćem mogućem roku.
              </p>
              <Link to={'/form'} className="config-btn">Pokreni konfigurator</Link>
          </div>
        </section>
    );
};

export default Home;
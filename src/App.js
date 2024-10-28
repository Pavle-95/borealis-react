// React
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Stores
import { FormProvider } from 'store/formStore';

// Components
import Navigation from 'components/Navigation';
import Home from 'views/Home';
import ConfiguratorForm from 'views/ConfiguratorForm';
import Checkout from 'views/Checkout';
import ThankYou from 'views/ThankYou';

// Styles
import 'style/main.scss';

const App = () => {
    return (
        <FormProvider>
            <Router>
                <div>
                    <Navigation />
                    <Routes>
                        <Route path="/" element={<Home />} /> 
                        <Route path="/form" element={<ConfiguratorForm />} /> 
                        <Route path='/checkout' element={<Checkout />} />
                        <Route path='/thank-you' element={<ThankYou />} />
                    </Routes>
                </div>
            </Router>
        </FormProvider>
    );
};

export default App;
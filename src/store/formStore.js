import { createContext, useContext, useState } from 'react';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [formData, setFormData] = useState({
        // Service Data
        manufacturer: '', 
        service: '',

        // Client Data        
        fullName: '',
        phoneNumber: 0,
        email: '',
        notes: '',
    });

    return (
        <FormContext.Provider value={{ formData, setFormData }}>
            {children}
        </FormContext.Provider>
    );
};

export const useFormStore = () => {
    return useContext(FormContext);
};

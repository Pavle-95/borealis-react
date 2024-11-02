import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Partials (Components)
import ManufacturerList from './partials/manufacturesList';
import ProvidedServicesList from './partials/providedServicesList';
import UserInfo from './partials/userInfo';
import CouponInput from './partials/couponInput';

// Store
import { useFormStore } from '../store/formStore';

// Service
import {
  getAllManufacturers,
  getAllServices,
} from 'services/main_service';


const Form = () => {
  const navigate = useNavigate();

  // Variables Form API
  const [manufacturers, setManufacturers] = useState(false);
  const [providedServices, setProvidedServices] = useState(false);

  // Variables for Form
  const { formData, setFormData } = useFormStore();

  // All Data From Submited Form
  const [manufacturer, setManufacturer] = useState(formData.manufacturer || '');
  const [manufacturerId, setManufacturerId] = useState(formData.manufacturerId || '');

  const [selectedServices, setSelectedServices] = useState(formData.selectedServicesPrice || []);
  const [selectedServicesID, setSelectedServicesID] = useState(formData.serviceIds || []);
  const [selectedServicesName, setSelectedServicesName] = useState(formData.selectedServices || []);
  
  const [fullName, setFullName] = useState(formData.fullName || '');
  const [phoneNumber, setPhoneNumber] = useState(formData.phoneNumber || 0);
  const [email, setEmail] = useState(formData.email || '');
  const [notes, setNotes] = useState(formData.note || '');

  // Total
  const [total, setTotal] = useState(formData.total || '');

  // Coupon
  const [couponValue, setCouponValue] = useState(formData.promoCode || '');
  const [couponPercentage, setCouponPercentage] = useState(formData.couponPercentage || '');
  const [couponAmount, setCouponAmount] = useState(formData.couponAmount || '')

  // Error state
  const [errors, setErrors] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    notes: '',
    manufacturerError: '',
    selectedServicesError: ''
  });

  // Function to validate the form
  const validateForm = () => {
    let newErrors = { fullName: '', phoneNumber: '', email: '', notes: '', coupon: '' };
    let isValid = true;

    if (!fullName) {
      newErrors.fullName = 'Ime i prezime je obavezno.';
      isValid = false;
    }
    
    if (!phoneNumber) {
      newErrors.phoneNumber = 'Broj telefona je obavezan.';
      isValid = false;
    } else if (!/^\+?\d+$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Broj telefona može sadržavati samo brojeve i opcionalno + na početku.';
      isValid = false;
    }

    if (!email) {
      newErrors.email = 'Email adresa je obavezna.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Unesite važeću email adresu.';
      isValid = false;
    }

    if(!manufacturerId) {
      newErrors.manufacturerError = 'Molimo odaberite jednog proizvođača vozila';
      isValid = false;
    }

    if(selectedServices.length === 0) {
      newErrors.selectedServicesError = 'Molimo odaberite jednog ili više usluga koju trebate';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Fetch manufacturers and services
  const fetchManufacturers = async () => {
    try {
        const data = await getAllManufacturers();
        setManufacturers(data);
    } catch (error) {
        console.log('Error fetching manufacturers on Component');
    }
  };

  const fetchServices = async () => {
    try {
      const data = await getAllServices();
      setProvidedServices(data);   
    
    } catch (error) {
        console.log('Error fetching services on Component');
    }
  };

  // Handlers for service selection
  const handleCheckboxChange = (event) => {
    const { value, checked, id } = event.target;
    const dataName = event.target.getAttribute('data-name');
    
    setSelectedServicesName((prevSelected) => {
      if (checked) {
        return [...prevSelected, dataName];
      } else {
        return prevSelected.filter((service) => service !== dataName);
      }
    });

    setSelectedServices((prevSelected) => {
        if (checked) {
          return [...prevSelected, value];
        } else {
          return prevSelected.filter((service) => service !== value);
        }
    });

    setSelectedServicesID((prevSelected) => {
      if (checked) {
        return [...prevSelected, id];
      } else {
        return prevSelected.filter((service) => service !== id);
      }
    });    
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();    

    if (validateForm()) {
      const updatedFormData = {
        manufacturer: manufacturer,
        manufacturerId: manufacturerId,
        selectedServices: selectedServicesName,
        selectedServicesPrice: selectedServices,
        serviceIds: selectedServicesID,
        promoCode: couponValue,
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        note: notes,
        total: total,
        couponPercentage: couponPercentage,
        couponAmount: couponAmount,
      };

      setFormData(prevData => ({
        ...prevData,
        ...updatedFormData
      }));
      
      navigate('/checkout');
    }
  };

  const recalculateTotal = () => {
    let newTotal = selectedServices.reduce((acc, service) => acc + parseInt(service), 0);
    const discountAmount = (newTotal * couponPercentage) / 100;
    newTotal -= discountAmount;
    setCouponAmount(discountAmount);
    setTotal(newTotal);
  }

  useEffect(() => {
    fetchManufacturers();
    fetchServices();
  }, []); 

  useEffect(() => {
    recalculateTotal();
  }, [selectedServices, couponPercentage]);

  return (
    <section className='config-form'>
      <div className="form-holder">
        <h2 className='form-title'>Konfigurator Servisa</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="chouse-manufacturers">
            <h3 className='manufacturers-sub-title'>Odaberite proizvođača vašeg vozila</h3>
            <h3 className='manufacturers-sub-title-error'>{errors.manufacturerError}</h3>
            <ManufacturerList 
              manufacturer={manufacturer}
              manufacturers={manufacturers} 
              setManufacturer={setManufacturer}
              setManufacturerId={setManufacturerId}
            />
          </div>

          <div className="chouse-services">
            <h3 className='services-sub-title'>Odaberite jednu ili više usluga koju trebate</h3>
            <h3 className='services-sub-title-error'>{errors.selectedServicesError}</h3>
            <ProvidedServicesList 
              selectedServicesID={selectedServicesID}
              providedServices={providedServices}
              handleCheckboxChange={handleCheckboxChange}
            />
          </div>

          <div className="total-holder">
            <p className='total'>ukupno: <span>{total}€</span></p>
            <CouponInput 
              couponValue={couponValue}
              setCouponValue={setCouponValue}
              setCouponPercentage={setCouponPercentage}
              recalculateTotal={recalculateTotal}
            />
          </div>

          <div className='user-info'>
              <h3 className='user-info-sub-title'>Vaši podaci</h3>
              <UserInfo 
                fullName={fullName}
                setFullName={setFullName}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                email={email}
                setEmail={setEmail}
                notes={notes}
                setNotes={setNotes}
                errors={errors}
              />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Form;
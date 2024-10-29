import React, { useState, useEffect } from 'react';

// Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Partials (Components)
import ManufacturerList from './partials/manufacturesList';
import ProvidedServicesList from './partials/providedServicesList';
import UserInfo from './partials/userInfo';

// Store
import { useFormStore } from '../store/formStore';

// Service
import {
  getAllManufacturers,
  getAllServices,
  validatePromoCode,
  contact
} from 'services/main_service';

// Icon
import checkMarkIcon from '../assets/icons/checkmark.svg'
import closeIcon from '../assets/icons/close-icon.svg'


const Form = () => {
  // Variables Form API
  const [manufacturers, setManufacturers] = useState(false);
  const [providedServices, setProvidedServices] = useState(false);

  // Variables for Form
  const { formData, setFormData } = useFormStore();

  const [manufacturer, setManufacturer] = useState(formData.manufacturer || '');

  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedServicesID, setSelectedServicesID] = useState([]);

  const [fullName, setFullName] = useState(formData.fullName || '');
  const [phoneNumber, setPhoneNumber] = useState(formData.phoneNumber || 0);
  const [email, setEmail] = useState(formData.email || '');
  const [notes, setNotes] = useState(formData.notes || '');

  // Total
  const [total, setTotal] = useState(0);

  // Coupon
  const [couponActive, setCouponActive] = useState(false);
  const [couponValue, setCouponValue] = useState('');
  const [couponValid, setCouponValid] = useState(true);
  const [couponPercentage, setCouponPercentage] = useState(0);

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
    } else if (!/^\d+$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Broj telefona može sadržavati samo brojeve.';
      isValid = false;
    }

    if (!email) {
      newErrors.email = 'Email adresa je obavezna.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Unesite važeću email adresu.';
      isValid = false;
    }

    if(!manufacturer) {
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
        manufacturerId: manufacturer,
        serviceIds: selectedServicesID,
        promoCode: couponValue,
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        note: notes,
      };
      
      console.log('Form Data Submitted:', updatedFormData);
      const response = await contact(updatedFormData)

      console.log(response);
    }
  };

  // Coupon handling
  const handleCouponSubmit = async () => {
    if(couponValue === '') {
      toast.warning("Promotional code invalid", { autoClose: 1000 });
      return;
    }

    const data = await validatePromoCode(couponValue);
    
    if(data.message) {
      toast.warning(data.message, { autoClose: 1000 });
      return;
    }

    if (data.discountPercentage && couponValid) {
      setCouponPercentage(data.discountPercentage);      
      setCouponValid(false);
      recalculateTotal();

      return;
    }
  }

  const handleRemoveCoupon = () => {
    setCouponPercentage(0);
    setCouponValid(true);
    setCouponValue('');
    recalculateTotal();
  }

  const recalculateTotal = () => {
    let newTotal = selectedServices.reduce((acc, service) => acc + parseInt(service), 0);
    const discountAmount = (newTotal * couponPercentage) / 100;
    newTotal -= discountAmount;

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
      <ToastContainer />
      <div className="form-holder">
        <h1 className='form-title'>Konfigurator Servisa</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="chouse-manufacturers">
            <h3 className='manufacturers-sub-title'>Odaberite proizvođača vašeg vozila</h3>
           <h3 className='manufacturers-sub-title-error'>{errors.manufacturerError}</h3>
            <ManufacturerList 
              manufacturers={manufacturers} 
              setManufacturer={setManufacturer}
              
            />
          </div>

          <div className="chouse-services">
            <h3 className='services-sub-title'>Odaberite jednu ili više usluga koju trebate</h3>
            <h3 className='services-sub-title-error'>{errors.selectedServicesError}</h3>
            <ProvidedServicesList 
              providedServices={providedServices}
              handleCheckboxChange={handleCheckboxChange}

            />
          </div>

          <div className="total-holder">
            <p className='total'>ukupno: <span>{total}€</span></p>
            {couponActive ? (
              <div className='coupon-holder'>
                <input 
                  type='text'
                  className={!couponValid ? 'error-border coupon-value' : 'coupon-value' }
                  placeholder='Unesi kod'
                  value={couponValue}
                  onChange={(e) => setCouponValue(e.target.value)}
                />
                <img 
                  className='coupon-submit'
                  src={checkMarkIcon}
                  onClick={handleCouponSubmit} 
                  alt='Checkmark Icon'/>

                {!couponValid ? 
                <p className='coupon-valid-value'> {couponValue} <img onClick={handleRemoveCoupon} src={closeIcon} alt='Close icon' /> </p> : null}
              </div>
            ) : 
            <div>
              <p onClick={() => setCouponActive(true)} className='coupon'>Imam kupon</p>
            </div>
          }
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
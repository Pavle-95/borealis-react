import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Store
import { useFormStore } from '../store/formStore.js';

// Service
import {
  contact,
} from 'services/main_service';

// Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {
    const navigate = useNavigate();
    const { formData } = useFormStore();
    
    async function submitForm() {
      let formSubmit = {
        manufacturerId: formData.manufacturerId,
        serviceIds: formData.serviceIds,
        promoCode: formData.promoCode,
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        note: formData.note,
      };

      const response = await contact(formSubmit)

      if(response.success === false) {
        toast.warning('Forma Nije Submitovana', { autoClose: 2000 });    
        console.log(response.error.issues);
        return;
      }
      else {
        navigate('/thank-you');
      }
    }

    return (
        <section className='config-checkout'>
            <ToastContainer />

            <div className="checkout-holder">
              <h2 className='checkout-title'>Konfigurator Servisa</h2>
              <div className='checkout-header'>
                <h3>Pregled i potvrda vašeg odabira</h3>
                <p>Molimo vas da još jednom pregledate i potvrdite podatke. Ukoliko želite promijeniti neki od podataka, vratite se na prethodni korak. Kada ste provjerili ispravnost svojih podataka, za slanje upita na servis pritisnite gumb “Pošalji”.</p>
              </div>

              <div className="checkout-review">
                <h3 className='checkout-model-title'>Model vozila</h3>
                <p className='checkout-model-content'>{formData.manufacturer}</p>

                <h3 className='checkout-model-title'>Odabrane usluge</h3>
                <ul className='checkout-list-item'>
                    {formData.selectedServices.length > 0 ? (
                        formData.selectedServices.map((service, index) => (
                            <li className='list-item' key={index}>{service} <span> {formData.selectedServicesPrice[index]},00 €</span></li>
                        ))
                    ) : (
                        <li className='list-item'>Nema Selectovanih Servica</li>
                    )}

                  {formData.promoCode ? <li className='list-item list-item-coupon'>Popust {formData.couponPercentage}%: <span> - {formData.couponAmount},00 €</span></li> : null}
                  {formData.total ? <li className='list-item list-item-total'>Ukupno: <span>{formData.total},00 €</span> </li> : null}
                </ul>

                <h3 className='checkout-user-info'>Kontakt podaci</h3>
                <span className="user-name-holder"><p className="user-name">Ime i prezime:</p> <span> {formData.fullName}</span></span>
                <span className="user-email-holder"><p className="user-email">Email adresa:</p> <span> {formData.email}</span></span>
                <span className="user-phone-holder"><p className="user-phone">Broj telefona:</p> <span> {formData.phoneNumber}</span></span>
                <span className="user-note-holder"><p className="user-note">Napomena: </p> <span> {formData.note}</span></span>
              </div>

              <div className="checkout-control-btn">
                <Link to={'/form'} className="step-back">Nazad</Link>
                <button className="submit-checkout" onClick={submitForm}>Pošalji</button>
              </div>
            </div>
        </section>
    );
};

export default Checkout;
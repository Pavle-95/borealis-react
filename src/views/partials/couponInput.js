import React, { useState } from "react";

// Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Service
import {
  validatePromoCode
} from 'services/main_service';

// Icon
import checkMarkIcon from 'assets/icons/checkmark.svg'
import closeIcon from 'assets/icons/close-icon.svg'

const CouponInput = ({ couponValue, setCouponValue, setCouponPercentage, recalculateTotal}) => {

  const [couponValid, setCouponValid] = useState(false);
  const [couponActive, setCouponActive] = useState(false);
  const [couponError, setCouponError] = useState(false);

  // Coupon Hendling
  const handleCouponSubmit = async () => {
    
    if(couponValue === '') {
      toast.warning("Promotional code invalid", { autoClose: 1000 });
      setCouponError(true);
      return;
    }

    const data = await validatePromoCode(couponValue);
  
    if(data.message) {
      toast.warning(data.message, { autoClose: 1000 });
      setCouponPercentage(0);
      setCouponError(true);
      setCouponValid(false);
      recalculateTotal();
      return;
    }

    if(couponValid) {
      toast.success("Promotional coupon valid", { autoClose: 1000 });
    }

    if (data.discountPercentage && !couponValid) {
      toast.success("Promotional coupon valid", { autoClose: 1000 });
      setCouponPercentage(data.discountPercentage);      
      setCouponValid(true);
      setCouponError(false);
      recalculateTotal();

      return;
    }

  }

  // Coupon handling
  const handleRemoveCoupon = () => {    
    setCouponPercentage(0);
    setCouponValid(false);
    setCouponValue('');
    recalculateTotal();
  }

  return (
    <div>
      <ToastContainer />

      {couponActive ? ( 
        <div className='coupon-holder'>
          <input 
            type='text'
            className={!couponError ? 'coupon-value' : 'error-border coupon-value' }
            placeholder='Unesi kod'
            value={couponValue}
            onChange={(e) => setCouponValue(e.target.value)}
          />
          <img 
            className='coupon-submit'
            src={checkMarkIcon}
            onClick={handleCouponSubmit} 
            alt='Checkmark Icon'/>

          {couponValid ? 
          <p className='coupon-valid-value'> {couponValue} <img onClick={handleRemoveCoupon} src={closeIcon} alt='Close icon' /> </p> : null}
        </div>
      ) : 
        <div>
          <p onClick={() => setCouponActive(true)} className='coupon'>Imam kupon</p>
        </div>
      }
    </div>
  )
}

export default CouponInput;
import React from "react";


const ProvidedServicesList = ({ providedServices, handleCheckboxChange }) => {


  return (
    <ul className="services-list">
      {!providedServices ? (
          <li className='loading'>Učitavanje servica...</li>
      ) : (
        providedServices.map((service) => (
            <li className='single-service-box' key={service.id}>
                <input
                  type="checkbox"
                  id={`service-${service.id}`}
                  name="services"
                  value={service.price} 
                  onClick={handleCheckboxChange} 
                />
                <label htmlFor={`service-${service.id}`}>
                    {service.name}  <span>({service.price}€)</span> {/* Label text */}
                </label>
            </li>
          ))
      )}
    </ul>
  )
}

export default ProvidedServicesList;
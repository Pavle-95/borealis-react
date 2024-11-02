import React from "react";

const ProvidedServicesList = ({ selectedServicesID, providedServices, handleCheckboxChange }) => {
  
  return (
    <ul className="services-list">
      {!providedServices ? (
          <li className='loading'>Učitavanje servica...</li>
      ) : (
        providedServices.map((service) => (
            <li className='single-service-box' key={service.id}>
                <input
                  type="checkbox"
                  id={`${service.id}`}
                  name="services"
                  data-name={service.name}
                  value={service.price}
                  checked={selectedServicesID.includes(service.id)}
                  onClick={handleCheckboxChange} 
                />
                <label htmlFor={`${service.id}`}>
                    {service.name}  <span>({service.price}€)</span> {/* Label text */}
                </label>
            </li>
          ))
      )}
    </ul>
  )
}

export default ProvidedServicesList;
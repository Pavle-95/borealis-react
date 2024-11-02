import React from 'react';

const ManufacturerList = ({ manufacturers, manufacturer, setManufacturer, setManufacturerId }) => {
  const selectedManufacturer = manufacturer;
  
  return (
    <ul className="manufacturer-list">
      {!manufacturers ? (
        <li>
          <p className='loading'>Učitavanje proizvođača...</p>
        </li>
      ) : (
        manufacturers.map((manufacturer) => (
          <li className='single-manufacturer-box' key={manufacturer.id}>
            <input
              type="radio"
              id={`manufacturer-${manufacturer.id}`} 
              name="manufacturer"
              value={manufacturer.name}
              checked={selectedManufacturer === manufacturer.name} 
              onChange={(e) => {
                  setManufacturer(e.target.value)
                  setManufacturerId(manufacturer.id)
                }
              }
            />
            <label htmlFor={`manufacturer-${manufacturer.id}`}>
              {manufacturer.name} {/* Label text */}
            </label>
          </li>
        ))
      )}
    </ul>
  );
};

export default ManufacturerList;
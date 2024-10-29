import React from "react";


const UserInfo = ( { fullName, setFullName, phoneNumber, setPhoneNumber,
  email, setEmail, notes, setNotes, errors }) => {

  return (
    <>
      <div className="full-name">
        <label>Ime i prezime</label>
        <input 
          className={errors.fullName ? "error-border" : " "}
          type="text" 
          placeholder="Unesite ime i prezime"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        {errors.fullName && <p className="class-error">{errors.fullName}</p>}
      </div>

      <div className="phone-number">
        <label>Broj telefona</label>
        <input 
          className={errors.phoneNumber ? "error-border" : " "}
          type="text" 
          placeholder="Unesite broj telefona"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        {errors.phoneNumber && <p className="class-error">{errors.phoneNumber}</p>}
      </div>

      <div className="email-address">
        <label>Email adresa</label>
        <input 
          className={errors.email ? "error-border" : " "}
          type="text" 
          placeholder="Unesite email adresu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="class-error">{errors.email}</p>}
      </div>

      <div className="note">
        <label>Napomena (opcionalno)</label>
        <textarea 
          type="text" 
          placeholder="Unesite napomenu"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        >
        </textarea>
        {errors.notes && <p className="class-error">{errors.notes}</p>}
      </div>

      <button className="submit-btn" type="submit">Dalje</button>
    </>
  );
};

export default UserInfo;
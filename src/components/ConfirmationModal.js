import React from 'react';

export default ({
  selectedToppings,
  selectedSize,
  onClose,
  details,
}) => (
  <div className="confirmation-modal">
    <div className="modal">
      <div className="modal-box">
        <h1>Your Order Details</h1>
        <address>
          <p><strong>{details.name}</strong></p>
          <p>{details.address}</p>
          <p>{details.postCode}</p>
          <p>{details.contactNumber}</p>
        </address>
        <hr />
        <div className="pizzas">
          <div className="pizza">
            <div className="pizza-confirm-size">
              <strong>{selectedSize ? selectedSize.name : ''}</strong>
            </div>
            <div className="pizza-confirm-toppings">
              {selectedToppings.map(({ name, amount }) => (
                <div key={name}>{name} * {amount}</div>
              ))}
            </div>
          </div>
        </div>
        <div className="actions">
          <button className="cancel" onClick={onClose}>Cancel</button>
          <button className="confirm">Confirm</button>
        </div>
      </div>
    </div>
  </div>
)
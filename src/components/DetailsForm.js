import React from 'react';
import Input from './Input'

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


function getValidationMessageForConfirmEmail(confirmEmail, email){
  if(!confirmEmail){
    return 'Please enter your confirm email'
  }

  if(confirmEmail !== email){
    return 'The confirm email is not matched'
  }

  return ''
}

function getValidationMessageEmail(email) {
  if(!email){
    return 'Please enter your email'
  }

  if(!validateEmail(email)){
    return 'Email format is invalid'
  }

  return ''
}

export default ({ data, onDataChange, dirty }) => (
      <div className="details">
        <Input 
          label="Name"
          value={data.name}
          formDirty={dirty}
          validate={data.name}
          onChange={value => onDataChange('name', value)}
          validationMessage="Please enter your name"
        />
        
        <Input 
          label="Email"
          value={data.email}
          formDirty={dirty}
          validate={!getValidationMessageEmail(data.email)}
          onChange={value => onDataChange('email', value)}
          validationMessage={getValidationMessageEmail(data.email)}
        />

        <Input 
          label="Confirm Email"
          value={data.confirmEmail}
          validate={data.confirmEmail}
          formDirty={dirty}
          validate={!getValidationMessageForConfirmEmail(data.confirmEmail, data.email)}
          onChange={value => onDataChange('confirmEmail', value)}
          validationMessage= {getValidationMessageForConfirmEmail(data.confirmEmail, data.email)}
        />

        <Input 
          label="Address"
          value={data.address}
          validate={data.address}
          formDirty={dirty}
          onChange={value => onDataChange('address', value)}
          validationMessage="Please enter your address"
        />
      
        <Input 
          label="Post Code"
          value={data.postCode}
          validate={data.postCode}
          formDirty={dirty}
          onChange={value => onDataChange('postCode', value)}
          validationMessage="Please enter your post code"
        />

        <Input 
          label="Contact Number"
          value={data.contactNumber}
          validate={data.contactNumber}
          formDirty={dirty}
          onChange={value => onDataChange('contactNumber', value)}
          validationMessage="Please enter your contact number"
        />
      </div>
)


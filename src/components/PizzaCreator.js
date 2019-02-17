import React from 'react';
import toppings from '../data/toppings';
import sizes from '../data/sizes';
import Toppings from './Toppings';
import Sizes from './Sizes';
import DetailsForm from './DetailsForm';
import Summary from './Summary';
import ConfirmationModal from './ConfirmationModal';
import Section from './Section';

function validateDetailsFormData(data){
  return Object.values(data).some( error => !error);
}

export default class PizzaCreator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toppings,
      sizes,
      selectedToppings: [],
      showConfirmationModal: false,
      detailsFormData: {},
      detailsFormDirty:false,
    }

    this.onToppingClick = this.onToppingClick.bind(this);
    this.onSizeClick = this.onSizeClick.bind(this);
    this.onAddToppingClick = this.onAddToppingClick.bind(this);
    this.onMinusToppingClick = this.onMinusToppingClick.bind(this);
    this.onDetailsFormDataChange = this.onDetailsFormDataChange.bind(this);
    this.onPlaceOrderClick = this.onPlaceOrderClick.bind(this);
  }

  onToppingClick(topping) {
    const { selectedToppings } = this.state;
    const isExists = this.state.selectedToppings.find(({ name }) => name === topping.name);

    const newSelectedToppings = !isExists 
      ? [{ ...topping, amount: 1 }, ...selectedToppings] 
      : selectedToppings.filter(({ name }) => name !== topping.name);

    this.setState({
      selectedToppings: newSelectedToppings,
    });
  }

  onSizeClick(size) {
    this.setState({
      selectedSize: size,
    });
  }

  onAddToppingClick(topping) {
    const { selectedToppings } = this.state;
  
    const newSelectedToppings = selectedToppings.map(selectedTopping => {
      const { name } = selectedTopping;
  
      if (name === topping.name) {
        const { amount } = topping;
        const newAmount = amount + 1;
  
        return {
          ...topping,
          amount: newAmount,
        }
      }
  
      return selectedTopping;
    });
  
    this.setState({
      selectedToppings: newSelectedToppings,
    })
  }

  onMinusToppingClick(topping) {
    const { selectedToppings } = this.state;
  
    const newSelectedToppings = selectedToppings
      .map(selectedTopping => {
        const { name } = selectedTopping;
    
        if (name === topping.name) {
          const { amount } = topping;
          const newAmount = amount - 1;
    
          if (newAmount === 0) {
            return undefined;
          }
    
          return {
            ...topping,
            amount: newAmount,
          }
        }
    
        return selectedTopping;
      })
      .filter(newSelectedTopping => !!newSelectedTopping);
  
    this.setState({
      selectedToppings: newSelectedToppings,
    });
  }

  onDetailsFormDataChange(name, value){
    const { detailsFormData} = this.state;

    const newDetailsFormData = {
      ...detailsFormData,
      [name]: value,
    }
    this.setState(
      {
        detailsFormData: newDetailsFormData,
      }
    );

  }

  onPlaceOrderClick(event) {
    const { detailsFormData } = this.state;

    event.preventDefault();

    this.setState({
      detailsFormDirty: true,
    });

    const validate = validateDetailsFormData(detailsFormData);

    if (!validate) {
      return;
    }

    this.setState({
      showConfirmationModal: true,
    })
  }


  render() {
    const { 
      toppings, selectedToppings, sizes, selectedSize, showConfirmationModal, detailsFormData, detailsFormDirty
    } = this.state;

    return (
      <React.Fragment>
        {showConfirmationModal && (
          <ConfirmationModal 
            details={detailsFormData}
            selectedToppings={selectedToppings}
            selectedSize = {selectedSize}
            onClose={() => this.setState({ showConfirmationModal: false })}
          />
        )}
        <Section title="Enter Your Details">
          <DetailsForm 
            data={detailsFormData}
            dirty={detailsFormDirty}
            onDataChange={this.onDetailsFormDataChange}
          />
        </Section>

        <Section title="Pick Your Sizes">
          <Sizes
            sizes={sizes}
            selectedSize={selectedSize}
            onSizeClick={this.onSizeClick}
          />
        </Section>

        <Section title="Pick Your Toppings">
          <Toppings
            toppings={toppings} 
            selectedToppings={selectedToppings} 
            onToppingClick={this.onToppingClick} 
          />
        </Section>
        
        <Section title="Summary">
          <Summary
            selectedSize={selectedSize}
            selectedToppings={selectedToppings} 
            onAddToppingClick={this.onAddToppingClick}
            onMinusToppingClick={this.onMinusToppingClick}
          />
        </Section>
        
        <div className="section">
          <button
            type="submit"
            onClick={this.onPlaceOrderClick}
          >
            Place Your Order
          </button>
        </div>
      </React.Fragment>
    );
  }
}
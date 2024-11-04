import { Combobox, ComboboxOption } from '@leafygreen-ui/combobox';

import Banner from '@leafygreen-ui/banner';

const BopisComp = ({storeLocations, setSelectedStoreLocation}) => {
  
  const onStoreLocationChange = (value)  => {
    // value is the index of the storeLocations[] selected
    const storeSelected = storeLocations[value]
    setSelectedStoreLocation(storeSelected)
  }

  return (
    <div>
      <Banner className='mb-3 mt-3'>
        With the right omnichannel ordering strategy, powered by a flexible database like MongoDB Atlas, retailers can unify these touchpoints to offer customers a personalized, convenient, and efficient shopping experience across all channels.
      </Banner>

      <Combobox
        label="Pick your prefered store location"
        description="Your order will be delivered to this store."
        placeholder="Select a store"
        onChange={(e) => onStoreLocationChange(e)}
      >
        {
          storeLocations.map((store, index) => {
            const {_id, street_and_number, cp, country, state, city, name} = store;
            return <ComboboxOption 
              key={`${_id}-${index}`} 
              value={`${index}-store`} 
              displayName={`${name} - ${street_and_number}, ${cp} ${city}. ${country}`}
            />
          }
          )
        }
      </Combobox>
    </div>
  );
};

export default BopisComp;

import React, { useContext } from 'react';
import { GlobalContext } from '../../providers/GlobalProvider';

const Searchbar = () => {

    const { setSearch } = useContext(GlobalContext)

    return (
        <div className='aside-formgroup'>
            <label htmlFor="search" className='aside-formgroup_label'>Lupa</label>
            <input type="text" placeholder='Search' id="search" className='aside-formgroup_input' onChange={(e) => setSearch(e.target.value)}/>
        </div>
    );
};

export default Searchbar;

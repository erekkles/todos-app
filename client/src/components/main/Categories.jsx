import React, { useContext } from 'react';
import { GlobalContext } from '../../providers/GlobalProvider';

const Categories = () => {

    const { setFilter } = useContext(GlobalContext)

    return (
        <>
            <nav className="aside-categories">
                <ul  className="aside-categories_list">
                    <li className="aside-categories_list-item cursor-pointer"> My Day </li>
                    <li className="aside-categories_list-item cursor-pointer" onClick={() => setFilter('all')}> All tasks </li>
                </ul>
            </nav>
            <hr />
            <nav className="aside-categories mt-auto">
                <ul  className="aside-categories_list">
                    <li className="aside-categories_list-item cursor-pointer" onClick={() => setFilter('household')}> Household </li>
                    <li className="aside-categories_list-item cursor-pointer" onClick={() => setFilter('personal')}> Personal </li>
                    <li className="aside-categories_list-item cursor-pointer" onClick={() => setFilter('work')}> Work </li>
                </ul>
            </nav>
        </>
    );
};

export default Categories;

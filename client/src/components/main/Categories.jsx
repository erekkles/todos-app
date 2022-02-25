import React, { useContext } from 'react';
import { GlobalContext } from '../../providers/GlobalProvider';

const Categories = () => {

    const { setFilter } = useContext(GlobalContext)

    const updateOnClick = (e) => {
        const item = e.target;
        const prevSelection = document.querySelector('.selected_category');
        setFilter(item.getAttribute('data-value'))

        if(!prevSelection) return item.classList.add('selected_category');
        if(item.classList.contains('selected_category')) return item.classList.remove('selected_category');

        prevSelection.classList.remove('selected_category');
        item.classList.add('selected_category');
    }

    return (
        <>
            <nav className="aside-categories">
                <ul  className="aside-categories_list">
                    <li className="aside-categories_list-item cursor-pointer"> My Day </li>
                    <li className="aside-categories_list-item cursor-pointer selected_category" data-value="all" onClick={(e) => updateOnClick(e)}> All tasks </li>
                </ul>
            </nav>
            <hr />
            <nav className="aside-categories mt-auto">
                <ul  className="aside-categories_list">
                    <li className="aside-categories_list-item cursor-pointer" data-value="household" onClick={(e) => updateOnClick(e)}> 🏡 Home </li>
                    <li className="aside-categories_list-item cursor-pointer" data-value="personal" onClick={(e) => updateOnClick(e)}> 👤 Personal </li>
                    <li className="aside-categories_list-item cursor-pointer" data-value="work" onClick={(e) => updateOnClick(e)}> 👨‍⚖️ Work </li>
                    <li className="aside-categories_list-item cursor-pointer" data-value="groceries" onClick={(e) => updateOnClick(e)}> 🥦 Groceries </li>
                    <li className="aside-categories_list-item cursor-pointer" data-value="movies" onClick={(e) => updateOnClick(e)}> 🍿 Movies to watch </li>
                    <li className="aside-categories_list-item cursor-pointer" data-value="gaming" onClick={(e) => updateOnClick(e)}> 🎮 Games to play </li>
                    <li className="aside-categories_list-item cursor-pointer" data-value="restaurants" onClick={(e) => updateOnClick(e)}> 🍟 Places to eat </li>
                </ul>
            </nav>
        </>
    );
};

export default Categories;

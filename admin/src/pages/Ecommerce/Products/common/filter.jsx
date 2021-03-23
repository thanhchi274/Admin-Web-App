import React, { useState } from 'react';
import { connect } from 'react-redux'
import Slider from '@material-ui/core/Slider';
import 'react-input-range-slider/dist/index.css'
import { makeStyles } from '@material-ui/core/styles';
import SlideToggle from 'react-slide-toggle';
import { createStructuredSelector } from 'reselect'
import { getBrands, getColors, selectFilter,selectIsDataFetching } from '../../../Store/shop/shop.selectors'
import { filterBrand, filterColor, filterPrice } from '../../../Store/filter/filter.action'
import SkeletonFilter from './skeleton-filter'
import Checkbox from '@material-ui/core/Checkbox';
const Filter = ({ brands, colors, filters, filterBrand, filterColor, filterPrice, isLoading }) => {
    const [value, setValue] = useState([20, 37])
    const useStyles = makeStyles({
        root:{
              color: "#ff4c3b",
        }
    });
    const closeFilter = () => {
        document.querySelector(".collection-filter").style = "left: -100%";
    }
    const clickBrandHandle = (event,brandsItems) => {
        event.target.checked ? brandsItems.push(event.target.value) : brandsItems.splice(event.target.value, 1)
        filterBrand(brandsItems)
    }
    const valuetext= (value)=> {
        return `${value}$`;
      }
    const handlePriceFilter = (event, newValue) =>{
        setValue(newValue)
        filterPrice({min:newValue[0], max:newValue[1]})
    }
    const colorHandle = (event, color) => {
        let elems = document.querySelectorAll(".color-selector ul li");
        [].forEach.call(elems, function (el) {
            el.classList.remove("active");
        });
        event.target.classList.add('active');
        color!=='transparent'?filterColor(color):filterColor(null)
    }
    const classes = useStyles();
    return isLoading?<SkeletonFilter/>:(
        <div className="collection-filter-block">
            <div className="collection-mobile-back">
                <span className="filter-back"
                    onClick={(e) => closeFilter(e)}>
                    <i className="fa fa-angle-left" ></i> back
                        </span>
            </div>
            <SlideToggle>
                {({ onToggle, setCollapsibleElement }) => (
                    <div className="collection-collapse-block">
                        <h3 className="collapse-block-title" onClick={onToggle}>brand</h3>
                        <div className="collection-collapse-block-content" ref={setCollapsibleElement}>
                            <div className="collection-brand-filter">
                                {brands.map((brand, index) => {
                                    return brand!==undefined? (
                                        <div className="custom-control custom-checkbox collection-filter-checkbox" key={index}>
                                            <Checkbox id={brand}  onClick={(e)=>clickBrandHandle(e,filters.brand)}
                                             value={brand}
                                            defaultChecked={filters.brand ? false : true
                                            } inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} />
                                            <label className="custom-control-label"
                                                >{brand}</label>
                                        </div>):null
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </SlideToggle>
            {/*color filter start here*/}
            <SlideToggle>
                {({ onToggle, setCollapsibleElement }) => (
                    <div className="collection-collapse-block">
                        <h3 className="collapse-block-title" onClick={onToggle}>colors</h3>
                        <div className="collection-collapse-block-content" ref={setCollapsibleElement}>
                            <div className="color-selector">
                                <ul>
                                <li className='transparent' title={'reset'} onClick={(e) => colorHandle(e, 'transparent')}></li>
                                    {colors.map((color, index) => {
                                        return (
                                            <li className={color} title={color} onClick={(e) => colorHandle(e, color)} key={index}></li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </SlideToggle>
            {/*price filter start here */}
            <SlideToggle>
                {({ onToggle, setCollapsibleElement }) => (
                    <div className="collection-collapse-block open">
                        <h3 className="collapse-block-title" onClick={onToggle}>price</h3>
                        <div className="collection-collapse-block-content block-price-content" ref={setCollapsibleElement}>
                            <div className="collection-brand-filter">
                                <div className="custom-control custom-checkbox collection-filter-checkbox">
                                    <Slider
                                        max={1000}
                                        value={value}
                                        min={10}
                                        className={classes.root}
                                        onChange={handlePriceFilter}
                                        valueLabelDisplay="auto"
                                        aria-labelledby="range-slider"
                                        valueLabelFormat={valuetext}
                                         />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </SlideToggle>
        </div>
    )
}
const mapStateToProps = createStructuredSelector({
    brands: getBrands,
    colors: getColors,
    filters: selectFilter,
    isLoading:selectIsDataFetching
})
const mapDispatchToProps = dispatch => ({
    filterBrand: (data) => dispatch(filterBrand(data)),
    filterColor: (data) => dispatch(filterColor(data)),
    filterPrice: (data) => dispatch(filterPrice(data))
})
export default connect(
    mapStateToProps, mapDispatchToProps
)(Filter);
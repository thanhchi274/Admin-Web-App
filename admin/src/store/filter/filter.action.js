import FilterActionTypes from "./filter.type";
export const filterBrand = brand => ({
  type: FilterActionTypes.FILTER_BRAND,
  brand,
});
export const filterColor = color=>({
          type:FilterActionTypes.FILTER_COLOR,
          color
})
export const filterPrice = price=>({
          type: FilterActionTypes.FILTER_PRICE,
          price
})
export const filterSort = (sort_by) => ({
  type: FilterActionTypes.SORT_BY,
  sort_by
});
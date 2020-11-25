import React from 'react';

import {FilterNames} from '../service/the-movie-db/types';

interface IFilterOptionProps {
  onChange(filter: string): void;
  selectedFilter: FilterNames;
  label: string;
  value: FilterNames;
}

const FilterOption: React.FC<IFilterOptionProps> = ({value, onChange, selectedFilter, label}) => {
  const handleChange = () => onChange(value);
  const isSelected = selectedFilter === value;
  return (
      <label>
        <input type="radio" name="filter" value={value} checked={isSelected} onChange={handleChange} />
        {label}
      </label>
  );
};

export default FilterOption;
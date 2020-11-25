import React from 'react';

import {FilterNames} from '../service/the-movie-db/types';

import constants from '../common/TheMovieDB.constants';

import FilterOption from './FilterOption';

import './Filters.css';

interface IFiltersProps {
  onChange(filter: FilterNames): void;
  selectedFilter: FilterNames;
}

const Filters: React.FC<IFiltersProps> = ({onChange, selectedFilter}) => {
  const filterList: {value: FilterNames, label: string}[] = [{
    value: constants.mediaType.all,
    label: 'All'
  }, {
    value: constants.mediaType.person,
    label: 'Person'
  }, {
    value: constants.mediaType.tv,
    label: 'Show'
  }, {
    value: constants.mediaType.movie,
    label: 'Movie'
  }];

  const filters = filterList.map(
      ({label, value}) =>
        <FilterOption
          key={value}
          value={value}
          label={label}
          selectedFilter={selectedFilter}
          onChange={onChange} />
    );

  return (
    <section className="search-filter">
    {filters}
    </section>
  );
};

export default Filters;
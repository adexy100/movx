import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PeopleCard from '../../../components/people/PeopleCard';
import PaginationBar from '../../../components/common/PaginationBar';

// actions
import { searchPeople } from '../../../actions/actions';

// helpers
import { isEmpty } from '../../../helpers/helperFunctions';

const SearchPeopleTab = (props) => {
  const { people, isLoading, query } = props;
  const handlePageChange = (e) => {
    if (props.people.page !== e && !isLoading) {
      props.searchPeople(`search/person?query=${query}`, e);
    }
  };

  return (
    !isEmpty(people) && people.results.length !== 0 ? (
      <React.Fragment>
        <div className="movie__wrapper">
          {people.results.map((person) => {
            return (
              <PeopleCard 
                  category="people"
                  key={person.id}
                  people={person}  
              />
            )
          })}
        </div>
        {people.total_pages > 1 && (
          <PaginationBar 
              activePage={people.page}
              itemsCountPerPage={1}
              onChange={handlePageChange}
              pageRangeDisplayed={10}
              totalItemsCount={people.total_pages}
              totalPage={people.total_pages}
          />
        )}
      </React.Fragment>
    ) : (
      <div className="search__no-result">
        <h1>No result found.</h1>
      </div>
    )
  );
};

SearchPeopleTab.propTypes = {
  isLoading: PropTypes.bool,
  people: PropTypes.shape({
    page: PropTypes.number,
    total_page: PropTypes.number,
    total_results: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.object)
  }),
  query: PropTypes.string,
  searchPeople: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  searchPeople: (url, page) => dispatch(searchPeople(url, page))
});

export default connect(undefined, mapDispatchToProps)(SearchPeopleTab);
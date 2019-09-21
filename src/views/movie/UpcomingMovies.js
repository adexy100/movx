import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Loader from '../../components/hoc/Loader';  
import MovieCard from '../../components/movies/MovieCard';
import PaginationBar from '../../components/common/PaginationBar';
import Footer from '../../components/common/Footer';

// actions
import { fetchUpcomingMovies } from '../../actions/actions';

// helpers
import { isEmpty, numberWithCommas } from '../../helpers/helperFunctions';

const UpcomingMovies = ({ upcomingMovies, fetchUpcoming, isLoading }) => {
  const queryString = 'movie/upcoming?';

  useEffect(() => {
    if (isEmpty(upcomingMovies)) {
      fetchUpcoming(queryString);
    }
  }, []);

  const handlePageChange = (e) => {
    if (upcomingMovies.page !== e && !isLoading) {
      fetchUpcoming(queryString, e);
    }
  };
 
  return !isEmpty(upcomingMovies) && (
    <div className="container__movies">
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>Upcoming Movies</h1>
          <h3>{numberWithCommas(upcomingMovies.total_results)} Movies</h3>
        </div>
      </div>
      <div className="movie__wrapper">
        {upcomingMovies.results.map((movie, index) => (
          <MovieCard 
              category="movie"
              key={`${movie.id}_${index}`}
              movie={movie} 
          />
        ))}
      </div>
      <PaginationBar 
          activePage={upcomingMovies.page}
          itemsCountPerPage={1}
          onChange={handlePageChange}
          pageRangeDisplayed={10}
          totalItemsCount={upcomingMovies.total_pages}
          totalPage={upcomingMovies.total_pages}
      />
      <Footer />
    </div>
  );
};

UpcomingMovies.propTypes = {
  fetchUpcomingMovies: PropTypes.func,
  upcomingMovies: PropTypes.shape({
    page: PropTypes.number,
    total_page: PropTypes.number,
    total_results: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.object)
  })
};

const mapStateToProps = ({ upcomingMovies, isLoading }) => ({
  upcomingMovies,
  isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchUpcoming: (url, page) => dispatch(fetchUpcomingMovies(url, page))
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader('upcomingMovies')(UpcomingMovies));
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Loader from '../../components/hoc/Loader';
import MovieCard from '../../components/movies/MovieCard';
import PaginationBar from '../../components/common/PaginationBar';
import Footer from '../../components/common/Footer';

// actions
import { fetchTrendingMovies } from '../../actions/actions';

// helpers
import { isEmpty, numberWithCommas } from '../../helpers/helperFunctions';

const TrendingMovies = (props) => {
  const { fetchTrending, trendingMovies, isLoading } = props;
  const query = 'trending/all/day?';

  useEffect(() => {
    if (isEmpty(trendingMovies)) {
      fetchTrending(query);
    }
  }, []);

  const handlePageChange = (e) => {
    if (trendingMovies.page !== e && !isLoading) {
      fetchTrending(query, e);
    }
  };

  return !isEmpty(trendingMovies) && (
    <div className="container__movies">
      <div className="movie__header">
        <div className="movie__header-title">
          <h1>Trending Movies</h1>
          <h3>{numberWithCommas(trendingMovies.total_results)} Movies</h3>
        </div>
      </div>
      <div className="movie__wrapper">
        {trendingMovies.results.map((movie, index) => (
          <MovieCard 
              category="movie"
              key={`${movie.id}_${index}`}
              movie={movie} 
          />
        ))}
      </div>
      <PaginationBar 
            activePage={trendingMovies.page}
            itemsCountPerPage={1}
            onChange={handlePageChange}
            pageRangeDisplayed={10}
            totalItemsCount={trendingMovies.total_pages}
            totalPage={trendingMovies.total_pages}
      />
      <Footer />
    </div>
  );
}

TrendingMovies.propTypes = {
  fetchRequest: PropTypes.func,
  trendingMovies: PropTypes.shape({
    page: PropTypes.number,
    total_page: PropTypes.number,
    total_results: PropTypes.number,
    results: PropTypes.arrayOf(PropTypes.object)
  })
};

const mapStateToProps = ({ trendingMovies, isLoading }) => ({
  trendingMovies,
  isLoading
});

const mapDispatchToProps = dispatch => ({
  fetchTrending: (query, page) => dispatch(fetchTrendingMovies(query, page))
});

export default connect(mapStateToProps, mapDispatchToProps)(Loader('trendingMovies')(TrendingMovies));
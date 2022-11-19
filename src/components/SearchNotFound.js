import PropTypes from 'prop-types';
// material
import { Paper, Typography } from '@mui/material';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string,
};

export default function SearchNotFound({ searchQuery = '', ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Sin resultados
      </Typography>
      <Typography variant="body2" align="center">
        No hay resultados para &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Realice una nueva búsqueda.
      </Typography>
    </Paper>
  );
}

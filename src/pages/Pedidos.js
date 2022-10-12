import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Grid,
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/pedidos';
// mock
import USERLIST from '../_mock/pedidos';
import {
  AppWidgetSummary,
} from '../sections/@dashboard/app';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'pedido', label: 'Pedido', alignRight: false },
  { id: 'cuit', label: 'CUIT', alignRight: false },
  { id: 'franquicia', label: 'Franquicia', alignRight: false },
  { id: 'importe', label: 'Importe [$]', alignRight: false },
  { id: 'alta', label: 'Fecha Alta', alignRight: false },
  { id: 'status', label: 'Estado Pedido', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.pedido.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('pedido');

  const [filterPedido, setFilterPedido] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.pedido);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, pedido) => {
    const selectedIndex = selected.indexOf(pedido);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, pedido);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByPedido = (event) => {
    setFilterPedido(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterPedido);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Pedidos">
      <Container>
      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ mb: 5 }}>
          Bienvenido!
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="En curso" total={714000}  color="error" icon={'eva:car-outline'} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Finalizados" total={1723315} color="success" icon={'icons8:finish-flag'} />
          </Grid>
        </Grid>
        </Container>
        {/* <Stack marginTop={4}>
        <Typography variant="h4" sx={{ mb: 0 }}>
          Detalle de los Pedidos
        </Typography>
        </Stack> */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          {/* <Typography variant="h4" gutterBottom>
            Productos
          </Typography>
          <Stack direction="row" marginLeft={80} >
          <Button margin={10} variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            Carga Masiva
          </Button>
          </Stack>
          <Stack direction="row" >
          <Button variant="contained" component={RouterLink} to="/dashboard/altaProducto" startIcon={<Iconify icon="eva:plus-fill" />}>
            Alta Producto
          </Button>
          </Stack> */}
        </Stack>

        <Card>
         <UserListToolbar numSelected={selected.length} filterPedido={filterPedido} onFilterPedido={handleFilterByPedido} />
          
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, pedido, cuit, franquicia, importe, alta, status } = row;
                    const isItemSelected = selected.indexOf(pedido) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        {<TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, pedido)} />
                        </TableCell> }
                        {/* <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {producto}
                            </Typography>
                          </Stack>
                        </TableCell> */}
                        <TableCell  align="left">
                          <Typography variant="h6" noWrap>
                              {pedido}
                            </Typography></TableCell>
                        <TableCell align="left">{cuit}</TableCell>
                        <TableCell align="left">{franquicia}</TableCell>
                        <TableCell align="left">{importe}</TableCell>
                        <TableCell align="left">{alta}</TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" color={(status === 'En Curso' && 'error') || 'success'}>
                            {sentenceCase(status)}
                          </Label>
                        </TableCell>
                        <TableCell align="right">
                          <UserMoreMenu />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterPedido} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}

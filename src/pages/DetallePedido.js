import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import axios from 'axios';
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
} from '@mui/material';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/detallePedido';
// mock
import USERLIST from '../_mock/detallePedido';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'producto', label: 'Producto', alignRight: false },
  { id: 'codigoProducto', label: 'Código Producto', alignRight: false },
  { id: 'cantidad', label: 'Cantidad', alignRight: false },
  { id: 'importe', label: 'Importe [$]', alignRight: false },
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
    return filter(array, (_user) => _user.producto.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function DetallePedido() {

  const [orderList,setOrderList]=useState(USERLIST);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('producto');

  const [filterProducto, setFilterProducto] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const searchLocation = window.location.search?.slice(1);

  const params = new URLSearchParams(searchLocation);

  const IdPedido = params.get('IdPedido');

  

  useEffect(() => {
    axios.get(`http://localhost:5001/orders/getOrdersDetail?idPedido=${IdPedido}`)
      .then(res => {
        console.log(res.data)
        if (res.data !== undefined){
          setOrderList(res.data);
        }
      })

},[]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = orderList.map((n) => n.producto);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, producto) => {
    const selectedIndex = selected.indexOf(producto);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, producto);
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

  const handleFilterByProducto = (event) => {
    setFilterProducto(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orderList.length) : 0;

  const filteredUsers = applySortFilter(orderList, getComparator(order, orderBy), filterProducto);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Detalle del Pedido">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Detalle del Pedido
          </Typography>
          <Stack direction="row" >
          <Button variant="contained" component={RouterLink} to="/dashboard/pedidos" startIcon={<Iconify icon="bx:arrow-back" />}>
            Volver
          </Button>
          </Stack>
        </Stack>
        

        <Card>
          <UserListToolbar numSelected={selected.length} filterProducto={filterProducto} onFilterProducto={handleFilterByProducto} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={orderList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { Producto, CodigoProducto,Cantidad,Importe} = row;
                    const isItemSelected = selected.indexOf(Producto) !== -1;

                    return (
                      <TableRow
                        hover
                        key={CodigoProducto}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        {/* <TableCell padding="checkbox">
                          <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, producto)} />
                        </TableCell> */}
                        {/* <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={producto} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {producto}
                            </Typography>
                          </Stack>
                        </TableCell> */}
                        <TableCell  align="left">
                          <Typography variant="h6" noWrap>
                              {Producto}
                            </Typography></TableCell>
                        <TableCell align="left">{CodigoProducto}</TableCell>
                        <TableCell align="left">{Cantidad}</TableCell>
                        <TableCell align="left">{Importe}</TableCell>

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
                        <SearchNotFound searchQuery={filterProducto} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={orderList.length}
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

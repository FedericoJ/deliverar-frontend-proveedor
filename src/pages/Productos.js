import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import  { useState, useRef,useEffect} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import parseCSVToJson from 'papaparse';
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
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Icon } from '@iconify/react';
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/productos';
import baseUrl from '../baseUrl';

// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Descripcion', label: 'Producto', alignRight: false },
  { id: 'CodProducto', label: 'Código Producto', alignRight: false },
  { id: 'Stock', label: 'Stock', alignRight: false },
  { id: 'precio', label: 'Precio Unitario [$]', alignRight: false },
  { id: 'porcentaje', label: 'Descuento [%]', alignRight: false },
  { id: 'FechaVigencia', label: 'Fecha Vigencia', alignRight: false },
  { id: 'EstadoOferta', label: 'Estado Oferta', alignRight: false },
  { id: 'FecAlta', label: 'Fecha Alta', alignRight: false },
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
    return filter(array, (_user) => _user.Descripcion.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}



export default function Productos() {

   

  const [productList,setProductList]=useState(USERLIST);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('producto');

  const [filterProducto, setFilterProducto] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
      axios.get(`${baseUrl}/products/getProducts?cuit=0`)
        .then(res => {
          console.log(res.data)
          if (res.data !== undefined){
            setProductList(res.data);
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
      const newSelecteds = productList.map((n) => n.producto);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productList.length) : 0;

  const filteredUsers = applySortFilter(productList, getComparator(order, orderBy), filterProducto);
 
  const isUserNotFound = filteredUsers.length === 0;

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    p: 4,
    borderRadius: '6%',
    boxShadow: 24,
    border: '1px solid #DCDDDF',

    
  };

  const [open, setOpen] = useState(false);
  const [openInfo, setOpenInfo] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpenInfo = () => setOpenInfo(true);
  const handleClose = () => setOpen(false);
  const handleCloseInfo = () => setOpenInfo(false);

  const [count, setCount] = useState(0);
  const onPress = () => setCount(prevCount => prevCount + 1);

  const [openOK, setOpenOK] = useState(false);
  const handleOpenOK = () => setOpenOK(true);
  const handleCloseOK = () => setOpenOK(false);

  const [countOK, setCountOK] = useState(0);
  const onPressOK = () => setCountOK(prevCount => prevCount + 1);

  const inputRef = useRef(null);

  const handleClickFolder = () => {
    // open file input box on click of other element
    inputRef.current.click();
  };

  const [CSVData, setCSVData] = useState();
  const handleFileChange = event => {
    const commonConfig = { delimiter: "," };
    const finalJson = {};
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    console.log('fileObj is', fileObj);

    //  reset file input
    event.target.value = null;
        // 👇️ is now empty
        console.log(event.target.files);

        // 👇️ can still access file object here
        console.log(fileObj);
        console.log(fileObj.name);
        
        parseCSVToJson.parse(
          fileObj,
          {
            ...commonConfig,
            header: true,
            complete: (result) => {
              console.log("aca: ");
              console.log(result.data);
              // setCSVData(result.data);
              finalJson.cuit = 0
              finalJson.usuario = localStorage.getItem("email")
              finalJson.products = result.data
              console.log(finalJson)

              axios.post(`${baseUrl}/products/createMultipleProducts`, finalJson)
              .then(res => {
                console.log(res.data)
                if (res.data !== undefined && res.data.code === 201){
                  console.log(res.data)
                  setOpenOK(true);
                  setOpen(false);
                }
              })

            }
          }
        );
  };


  return (
    <Page title="Productos">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Productos
          </Typography>
          <Stack direction="row" marginLeft={80} >
          <Button margin={10} variant="contained" onClick={handleOpen} startIcon={<Iconify icon="akar-icons:arrow-up"  />}>
            Carga Masiva
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Carga Masiva de Productos
            </Typography>
            <Stack marginTop={5} direction="row" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                Seleccione un archivo....
            </Typography>
              <input
              style={{display: 'none'}}
              ref={inputRef}
              type="file"
              onChange={handleFileChange}
            />
            <Icon onClick={handleClickFolder}  icon="akar-icons:folder-add" width="50" height="50" />  
          </Stack>
            <Stack marginTop={5} alignItems="center" >
            <Button variant="contained" onClick={() => {handleOpenOK();handleClose()}} startIcon={<Iconify icon="akar-icons:arrow-up"  />}>
            Procesar
          </Button>
          </Stack>
          </Box>
          </Modal>

          
          <Modal
            open={openOK}
            onClose={handleCloseOK}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Los productos fueron cargados exitosamente
            </Typography>
            <Stack marginTop={5} alignItems="center" >
            <Button variant="contained" onClick={() => {handleCloseOK()}} >
            Aceptar
          </Button>
          </Stack>
          </Box>
          </Modal>

          {/* <Modal
            open={openOK}
            onClose={handleCloseOK}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Error al procesar el archivo
            </Typography>
            <Stack marginTop={5} alignItems="center" >
            <Button variant="contained" onClick={() => {handleCloseOK()}} >
            Aceptar
          </Button>
          </Stack>
          </Box>
          </Modal> */}

          </Stack>
          <Button margin={10} variant="contained" onClick={handleOpenInfo} startIcon={<Iconify icon="emojione-v1:information"  />}>
            Info
          </Button>
          <Modal
            open={openInfo}
            onClose={handleCloseInfo}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <u>Información para carga masiva:</u> 
                <br/>
                - Columnas: CodProducto, Descripcion, Imagen, Stock, Precio, MedStock
                <br/>
                - Formato Archivo: .csv
              </Typography>
            </Box>
          </Modal>

        
          <Stack direction="row" >
          <Button variant="contained" component={RouterLink} to="/dashboard/altaProducto" startIcon={<Iconify icon="eva:plus-fill" />}>
            Alta Producto
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
                  rowCount={productList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const {Descripcion, CodProducto,Stock,precio,porcentaje,FechaVigencia,EstadoOferta, FecAlta} = row;
                    const isItemSelected = selected.indexOf(Descripcion) !== -1;

                    return (
                      <TableRow
                        hover
                        key={Descripcion}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell  align="left">
                          <Typography variant="subtitle1" fontSize={"S"} noWrap>
                              {Descripcion}
                            </Typography></TableCell>
                        <TableCell align="left">{CodProducto}</TableCell>
                        <TableCell align="left">{Stock}</TableCell>
                        <TableCell align="left">{precio}</TableCell>
                        <TableCell align="left">{porcentaje}</TableCell>
                        <TableCell align="left">{FechaVigencia}</TableCell>
                        {/* <TableCell align="left">
                          <Label variant="ghost" color={(EstadoOferta === 'No Activa' && 'error') || 'success'}>
                            {sentenceCase(EstadoOferta)}
                          </Label>
                        </TableCell> */}
                        <TableCell align="left" >
                        <Typography variant="subtitle1" color={(EstadoOferta === 'No Activa' && 'error') || '#54D62C'}>
                            {EstadoOferta}
                        </Typography>
                           </TableCell>
                        <TableCell align="left">{FecAlta}</TableCell>
                        <TableCell align="right">
                          <UserMoreMenu product ={row}/>
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
                        <SearchNotFound searchQuery={filterProducto} />
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
            count={productList.length}
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

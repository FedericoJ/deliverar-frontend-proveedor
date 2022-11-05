import { useRef, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText,Link } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import baseUrl from '../../../baseUrl';

// ----------------------------------------------------------------------

export default function UserMoreMenu({product}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const onEliminar = async ()=>{

    await axios.post(`${baseUrl}/products/deleteProductByCode`,{codProducto:product.CodProducto,
      cuit:0})
      .then(res => {
        window.location.reload();
       }) 
      .catch(error=>{
          alert(error)
      }) 
    
     
  }
  // <Link to={`/users/${user.id}`}
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >

        <MenuItem component ={RouterLink} to={`/dashboard/altaOferta?codProducto=${product.CodProducto}&Nombre=${product.Descripcion}&Porcentaje=${product.porcentaje}&FechaVigencia=${product.FechaVigencia}`}  sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:shopping-bag-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Oferta" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>


        <MenuItem component={RouterLink} to={`/dashboard/EditarProducto?codProducto=${product.CodProducto}&Nombre=${product.Descripcion}&Stock=${product.Stock}&Precio=${product.precio}`} 
        sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:edit-fill" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Editar" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem onClick={onEliminar}  sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Eliminar" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}

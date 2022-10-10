import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText,Link } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

export default function UserMoreMenu({product}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
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

        <MenuItem component ={RouterLink} to={`/dashboard/altaOferta?codProducto=${product.CodProducto}&Nombre=${product.Descripcion}`}  sx={{ color: 'text.secondary' }}>
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

        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:trash-2-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Elimiar" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}

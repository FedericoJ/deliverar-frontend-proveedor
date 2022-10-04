import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const users = [...Array(5)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
  producto: sample(['Manteca','Aceite','Sal','Pimienta','Finlandia','Garbanzo']),
  codigoProducto: sample(['A001','A002','A003','A004','A005','A006']),
  stock: sample(['10','20','30','40','50','60']),
  precioUnitario: sample(['10,00','20,00','30,00','40,00','50,00','60,00']),
  descuento: sample(['10,00','']),
  vigencia: sample(['10/10/2022','']),
  alta: sample(['30/09/2022']),
  status: sample(['Activa', 'No Activa']),
}));

export default users;

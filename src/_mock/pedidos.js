import { faker } from '@faker-js/faker';
import { sample } from 'lodash';

// ----------------------------------------------------------------------

const pedidos = [...Array(5)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
  pedido: sample(['0001','0002','0003','0004','0005']),
  cuit: sample(['2731582883','20352677958','30112241567']),
  franquicia: sample(['Market SA','Jumbo','Cafe Martinez']),
  importe: sample(['10,00','20,00','30,00','40,00','50,00','60,00']),
  alta: sample(['30/09/2022']),
  status: sample(['En Curso', 'Finalizado']),
}));

export default pedidos;

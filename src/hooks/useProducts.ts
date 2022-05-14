import axios from 'axios';
import { useEffect } from 'react';
import { SERVER_URL } from '../constants';
import { useCartContext } from '../context/CartContext';
import { useUserContext } from '../context/UserContext';

export const useProducts = () => {
  const { user } = useUserContext();
  const { cart, setCart, products, setProducts } = useCartContext();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(SERVER_URL + '/product/list', {
          headers: {
            token: user.token,
          },
        });
        setProducts(data.reduce((obj: any, cur: any) => ({ ...obj, [cur.id]: cur }), {}));
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const searchProduct = (barcode: string) => {
    return Object.values(products)?.find((i: any) => i.barCode === barcode || i.barcodes?.includes(parseInt(barcode)));
  };

  return { cart, setCart, searchProduct };
};

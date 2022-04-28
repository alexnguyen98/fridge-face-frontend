import axios from 'axios';
import { useState, useEffect } from 'react';
import { SERVER_URL } from '../constants';
import { useUserContext } from '../context/UserContext';

export const useProducts = () => {
  const { user } = useUserContext();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(SERVER_URL + '/product/list', {
          headers: {
            token: user.token,
          },
        });
        setProducts(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const searchProduct = (barcode: string) => {
    return products?.find((i: any) => i.barCode === barcode);
  };

  return { products, searchProduct };
};

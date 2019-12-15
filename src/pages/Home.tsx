import React from 'react';
import {
  IonPage,
} from '@ionic/react';
import Header from './Home/components/header';
import Content, { Product } from './Home/components/content';


export interface Cart {
  products: Product[]
}
interface CartContext extends Cart {
  updateProducts?: any
}


export const cartContext = React.createContext<CartContext>({ products: [] });
export const CartProvider = cartContext.Provider;
export const CarConsumer = cartContext.Provider;



const Home: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>([
    { id: '1', name: 'Laptop', price: '2000' }
  ])

  const updateProducts = (products: Product[]) => {
    setProducts(products);
  }


  return (
    <CartProvider value={{
      products,
      updateProducts
    }}>
      <IonPage>
        <Header />
        <Content />
      </IonPage>
    </CartProvider>
  );
};

export default Home;

import React from 'react';
import { cart } from 'ionicons/icons'

import {
    IonHeader,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonButtons,
    IonButton,
} from '@ionic/react';

import { cartContext } from '../../Home'
export default function Header(props: React.Props<any>) {
    const { products } = React.useContext(cartContext)
    return (

        <IonHeader  >
            <IonToolbar color="primary">
                <IonButtons slot="end">
                    <IonButton>
                        <IonIcon icon={cart} color="danger" />
                         ${products.reduce((prev, current) => {
                            return prev += Number(current.price);
                        }, 0)}
                    </IonButton>
                </IonButtons>
                <IonTitle>
                    Carrito de compras
                </IonTitle>
            </IonToolbar>
        </IonHeader>)
}
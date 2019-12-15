import React from 'react';

import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonIcon,
	IonCard,
	IonCardContent,
	IonButtons,
	IonButton,
	IonGrid,
	IonRow,
	IonCol,
	IonCardHeader,
	IonCardTitle,
	IonItem,
	IonLabel,
	IonInput,
	IonList,

} from '@ionic/react';
import { alertController } from '@ionic/core'
import { cartContext } from '../../Home';

export interface Product {
	id: string
	name: string | null | undefined
	price: string | null | undefined
}

export default function Content() {
	const [product, setProduct] = React.useState<Product>()
	const { products, updateProducts } = React.useContext(cartContext);
	// const [products, setProducts] = React.useState<Product[]>([{
	//     id: "1",
	//     name: "Prueba",
	//     price: '123123'
	// }])
	const [name, setName] = React.useState<Product['name']>('')
	const [price, setPrice] = React.useState<Product['price']>('')

	const addProduct = async () => {
		const alert = await alertController.create({
			header: 'Ocurrió un error',
			subHeader: 'Los campos son inválidos',
			message: 'Campos nombre y precio estan vacíos',
			buttons: ['Listo'],
			animated: true
		});

		document.body.appendChild(alert);
		if (!name || !price) {
			await alert.present()
			return
		}
		const _product: Product = {
			name,
			price,
			id: product ? product.id : Date.now().toString()
		}
		console.log(_product)
		if (product) {
			const updatedList = products.map((mapProd) => {
				if (mapProd.id == product.id) {
					return _product;
				}
				return mapProd;
			})
			updateProducts(updatedList);
			setProduct(undefined)
		} else {
			const updatedList = [_product, ...products,]
			updateProducts(updatedList);

		}
		setName('')
		setPrice('')
	}
	const deleteProduct = (product: Product) => () => {
		const updatedList = products.filter((_product) => {
			if (product.id == _product.id) return false
			return true
		})
		updateProducts(updatedList);
	}
	const updateProduct = (product: Product) => () => {
		setName(product.name)
		setPrice(product.price);
		setProduct(product)
	}



	const listProducts = products.map((product) => (
		<IonCard key={product.id}>
			<IonCardHeader>
				<IonCardTitle>
					{product.name}
				</IonCardTitle>
			</IonCardHeader>
			<IonCardContent>
				{product.price}
				<IonButtons slot="end" className="ion-margin-vertical">
					<IonButton color="secondary" fill="outline" onClick={updateProduct(product)}>
						Update
                    </IonButton>
					<IonButton color="danger" fill="outline" onClick={deleteProduct(product)}>
						Eliminar
                    </IonButton>
				</IonButtons>
			</IonCardContent>
		</IonCard>
	))




	return (
		<IonContent className="ion-padding">
			<IonGrid>
				<IonRow>
					<IonCol sizeMd="5" offsetMd="4">
						<IonCard >
							<IonCardHeader color="secondary">
								<IonCardTitle>
									Nuevo producto
                                 </IonCardTitle>
							</IonCardHeader>
							<IonCardContent>
								<IonItem>
									<IonLabel position="floating">
										Nombre
                                </IonLabel>
									<IonInput
										value={name}
										onIonChange={({ detail: { value } }) => setName(value)} />
								</IonItem>
								<IonItem className="ion-margin-bottom">
									<IonLabel position="floating">
										Precio
                  </IonLabel>
									<IonInput
										type="number"
										value={price}
										onIonChange={({ detail: { value } }) => setPrice(value)} />
								</IonItem>

								<IonButton color="secondary" onClick={addProduct}>
									{product ? 'Actualizar' : 'Guardar'}
								</IonButton>
								<IonButton
									color="danger"
									onClick={() => {
										setName('')
										setPrice('')
									}}>
									Limpiar
              </IonButton>

							</IonCardContent>
						</IonCard>
					</IonCol>
				</IonRow>
				<IonRow>
					<IonCol sizeMd="4" offsetMd="4">
						<IonList >
							{listProducts}
						</IonList>
					</IonCol>
				</IonRow>
			</IonGrid>
		</IonContent >
	)
}
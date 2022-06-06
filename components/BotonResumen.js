import React ,{useContext} from "react";
import { Button,  } from 'react-native';

import { useNavigation } from "@react-navigation/native";
import PedidosContext from "../Context/pedidos/pedidosContext";

const BotonResumen = ()=>{
    const navigation = useNavigation();

    //Leer el objeto del pedido
    const {pedido} = useContext(PedidosContext);
    if (pedido.length === 0 ) return null;
    return (
        <Button
            onPress={() => navigation.navigate('ResumenPedido')}
            title="Carrito"
        />
    )
}
export default BotonResumen;
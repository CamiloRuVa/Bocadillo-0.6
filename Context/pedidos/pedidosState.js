import React, { useReducer, useEffect  } from "react";
import pedidosReduce from "./pedidosReduce";
import PedidosContext from "./pedidosContext";
import { SELECCIONAR_PRODUCTO, CONFIRMAR_ORDEN_PLATILLO, MOSTRAR_RESUMEN, ELIMINAR_PRODUCTO, PEDIDO_ORDENADO } from "../../types";

const PedidosState = props => {
    //State Inicial 
    const initialState = {
        pedido: [],
        platillo: null,
        total:0,
        idpedido: ''
    }
    //Pedido realizado
    const pedidoRealizado = id =>{
        dispatch({
            type: PEDIDO_ORDENADO,
            payload: id 
        })
    }
    //useReducer con dispatch para ejecutar las funciones
    const [ state, dispatch ] = useReducer(pedidosReduce, initialState); 

    //Productos para ordenar
    const seleccionarPlatillo = platillo => { 
        dispatch({
            type: SELECCIONAR_PRODUCTO
            ,payload: platillo
        })
    }
    //Cuando el usuario confirma el platillo
    const guardarPedido = pedido =>{
        dispatch({
            type: CONFIRMAR_ORDEN_PLATILLO, 
            payload: pedido
        })
    }


    //Total a pagar en el carrito
    const mostrarResumen = total =>{
        dispatch({
            type: MOSTRAR_RESUMEN,
            payload: total
        })
    }
    //Eliminar un articulo del carrito
    const eliminarProducto = id => {
       dispatch({
           type: ELIMINAR_PRODUCTO,
           payload: id
       })
    }
    return(
        <PedidosContext.Provider
            value={{
                platillo: state.platillo,
                pedido: state.pedido,
                total: state.total,
                idpedido: state.idpedido,
                seleccionarPlatillo,
                guardarPedido,
                mostrarResumen,
                eliminarProducto,
                pedidoRealizado,
            }}
        >
            {props.children}
        </PedidosContext.Provider>
    )
}
export default PedidosState;
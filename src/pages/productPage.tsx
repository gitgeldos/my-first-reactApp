import { CreateProduct } from "../components/createProduct"
import { ErrorMsg } from "../components/errorMsg"
import { Loader } from "../components/loader"
import { Modal } from "../components/modal"
import { Product } from "../components/product"
import { ModalContext } from "../context/modalContext"
import { useProducts } from "../hooks/products"
import { IProduct } from "../models"
import {useContext} from 'react'


export function ProductPage(){
    // const[modal, setModal]=useState(true)

  const{loading, error, products, addProduct}=useProducts()

  const{modal, open, close}=useContext(ModalContext)

  const createHandler=(product:IProduct)=>{
    close() // setModal(false)
    addProduct(product)
  }

  return(
    <div className='container mx-auto max-w-2xl pt-5'>

      {loading && <Loader />}
      {error && <ErrorMsg error={error} />}

      {products.map(product => <Product product={product} key={product.id}/>)}

      {/* <Product product={products[0]}/>
      <Product product={products[1]}/> */}
      {modal && <Modal
      onClose={close}
      title='Create new product!'
      >
        <CreateProduct onCreate={createHandler}/>
      </Modal>}
      <button 
      onClick={open}
      className='fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-4 py-2'>+</button>
    </div>
  )
}
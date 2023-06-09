import React, { useEffect,useState } from 'react'
import {useDispatch,useSelector} from  "react-redux"
import { getProducts, protypes } from '../Redux/Products/product.action'
import {Box, Button, Flex, Grid, HStack, Image, Select, Text, VStack} from "@chakra-ui/react"
import { useRadioGroup } from '@chakra-ui/react'
import Radiocard from '../Components/Radiocard'
import { GiHamburgerMenu } from 'react-icons/gi';
import { BiGridVertical } from 'react-icons/bi';
import ProductCard from '../Components/ProductCard'
import { PRODUCTS_PAGE } from '../Redux/Products/product.type'
import { useDisclosure } from '@chakra-ui/react'
import {
  Drawer,
  DrawerBody,
  
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  
} from '@chakra-ui/react'
import Filter from '../Components/Filter'

const Productpage = () => {
  const dispatch = useDispatch()
  const products = useSelector((state) => state.productReducer.Products);
  const load = useSelector((state) => state.productReducer.isLoading);
  const protype = useSelector((state) => state.productReducer.protypes);
  const category = useSelector((state) => state.productReducer.category);
  const brand = useSelector((state) => state.productReducer.brand);
 const [price,setPrice] = useState()
  const activePage = useSelector((state) => state.productReducer.currPage);
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const options = [<GiHamburgerMenu/>, <BiGridVertical/>, <GiHamburgerMenu/>,<GiHamburgerMenu/>,<GiHamburgerMenu/>,<GiHamburgerMenu/>]
  const totalPages = Math.ceil(products?.length/10)
 
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: 'react',
    onChange: console.log,
  })

  const group = getRootProps()

  const handlefilter=()=>{
    let getCate = JSON.parse(localStorage.getItem("cate"))
      const getProductsParam = {
        params: {
            gender: getCate.params.gender,
            brand:brand,
            category:category,
            price:price
           
        }
    }
    
   
    dispatch(getProducts(getProductsParam))
    dispatch({type:PRODUCTS_PAGE,payload:1})
    dispatch(protypes(getCate.params.gender));
    
    
  }

  const handlesortchange=(e)=>{
        setPrice(e.target.value)
  }
// useEffect(()=>{
 
//     let getCate = JSON.parse(localStorage.getItem("cate"))
//     dispatch(getProducts(getCate))
// },[protypes])

useEffect(()=>{
 
    handlefilter()
  console.log("fdsfas")
},[protype,category,brand,price])
  return (
    <>
      <Box w="100%" h="auto" p="40px" alignItems={"center"}>
          <Text fontSize={"40px"} fontWeight="600" color="#000000">
             All Women Products
          </Text>
          <Text mt="10px" fontWeight={"600"}>
            Home{" "}{">"} all women products
          </Text>
      </Box>
      <HStack w="90%" m="auto" mt="30px" justifyContent={"space-between"}>
        <HStack w="30%" gap="20px" fontWeight={"bold"}>
          <Text cursor={"pointer"} onClick={onOpen}>Filter</Text>
          <Select placeholder='featured' w="40%" onChange={(e)=>handlesortchange(e)} fontWeight={"bold"} _focus={{border:"none"}}>
  <option value='1'>Price, low to high</option>
  <option value='-1'>Price, high to low</option>
  <option value=''>Reset</option>
  
</Select>
        </HStack>
        <HStack {...group}>
        {options.map((value) => {
        const radio = getRadioProps({ value })
        return (
          <Radiocard key={value} {...radio}>
            {value}
          </Radiocard>
        )
      })}
        </HStack>
      </HStack>
      <Grid templateColumns={"repeat(4,23%)"} justifyContent={"space-between"}  w="90%" m="auto" mt="30px">
          {products.length>0 && products.filter((_,index)=> {return (
              index >= 10* (activePage-1) && 
              index < 10 * activePage
            )}).map((e)=> <ProductCard key={e.id} {...e}/>)}
      </Grid>
      {!load? <Flex w="80px" m="auto"  mt="30px" gap="3px" mb="10px">
        <Button isDisabled={activePage===1} bgColor={"teal.500"} color="white" fontSize={"20px"} fontWeight={"bold"} onClick={()=> dispatch({type:PRODUCTS_PAGE,payload:activePage-1})}>
          {"<"}
        </Button>
        <Button color="teal.500">{activePage}</Button>
        <Button isDisabled={activePage===totalPages} bgColor={"teal.500"} color="white" fontSize={"20px"} fontWeight={"bold"} onClick={()=> dispatch({type:PRODUCTS_PAGE,payload:activePage+1})}>{">"}</Button>
      </Flex> :""}
      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Filter</DrawerHeader>
          <DrawerBody>
            <Filter/>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Productpage
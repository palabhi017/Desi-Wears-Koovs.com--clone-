import {
  Button,
  Center,
  Flex,
  
  Heading,
 
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
 
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ProductTable from "../Components/Table";
import  Chart  from "chart.js/auto";
import { CategoryScale } from "chart.js/auto";
import axios from "axios"

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCTS_PAGE } from "../Redux/Products/product.type";
import PieChart from "../Components/PieChart";

Chart.register(CategoryScale)
function AdminPanel() {
  const [data, setData] = useState([]);
  const [sa, setSa] = useState(0);
  const [dataState, setDataState] = useState(true);
  const toast = useToast()
 
  const [chartData,setChartData] = useState()
  
  const activePage = useSelector((state) => state.productReducer.currPage);
  const totalPages = Math.ceil(data?.length/10)
const dispatch = useDispatch()



let countcate=(items)=>{
  let s=0,ts=0,ku=0,kur=0,du=0,bl=0,saa=0,pl=0
  for(let i=0;i<items.length;i++){
  if(items[i].category==="saree"){
     saa++
    }else if(items[i].category==="T-shirt"){
      ts++
    }
    else if(items[i].category==="shirt"){
      s++
    }else if(items[i].category==="kurtas"){
      ku++
    }else if(items[i].category==="kurtis"){
      kur++
    }else if(items[i].category==="blazer"){
      bl++
    }else if(items[i].category==="dupatta"){
      du++
    }else if(items[i].category==="palazzos"){
      pl++
    }

  }
  let obj={
    labels: ["T-shirt","shirt","kurtas","blazer","saree","kurtis","dupatta","palazzos"],
    datasets:[
      {
        label:"category",
        data: [ts,s,ku,bl,saa,kur,du,pl],
        backgroundColor: [
          "#2d7ff9",
          "#ffa67e",
          "#f5b51b",
          "#d0f0fd",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
          "#e929ba"
        ],
        borderColor:"black",
        borderWidth:2 
      }
    ]
  }
setChartData(obj)
}
 const getAllProducts = async()=>{
 try {
  let res = await axios.get(`https://eager-handkerchief-bass.cyclic.app/product`)
  let data = res.data;
 countcate(data)
 
  setData(data)
 } catch (error) {
  console.log(error)
 }
  }



  const handleDelete = async(id) => {
    
    await axios.delete(`https://eager-handkerchief-bass.cyclic.app/product/delete/${id}`)
    getAllProducts()
    toast({
      position: "top",
      title: "Item Deleted",
      description: "Item deleted successfully form store.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };
  const handleEdit = async(id,item) => {
    try {
      console.log("edit")
    await axios.patch(`https://eager-handkerchief-bass.cyclic.app/product/update/${id}`,item)
    getAllProducts()
    toast({
      position: "top",
      title: "Item Updated",
      description: "Item Updated successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    } catch (error) {
      console.log(error)
    }
    
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
   {chartData && <PieChart chartData={chartData}/> }
    <Center
      pb={"60px"}
      px={"30px"}
      gap={12}
      flexDir={"column"}
      w={"100%"}
      mt={12}>
      <Heading color={"#333"}>List of Products</Heading>
      
     <Link to="/admin/add"> <Button bgColor={"red.400"} color="white" alignSelf={"right"}>+ Add Item</Button></Link>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Image</Th>
              <Th>Title</Th>
              <Th>Brand</Th>
              <Th>Gender</Th>
              <Th>Category</Th>
              <Th>Price</Th>
              <Th>Edit</Th>
              <Th>Delete</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data
              ? data.filter((_,index)=> {return (
                index >= 10* (activePage-1) && 
                index < 10 * activePage
              )}).map((e) => {
                  return (
                    <ProductTable  key={e._id}
                    objProp={e}
                    funcProp={handleDelete}
                    funcedit={handleEdit}/>
                  );
                })
              : null}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex w="80px" m="auto"  mt="30px" gap="3px" mb="10px">
        <Button isDisabled={activePage===1} bgColor={"teal.500"} color="white" fontSize={"20px"} fontWeight={"bold"} onClick={()=> dispatch({type:PRODUCTS_PAGE,payload:activePage-1})}>
          {"<"}
        </Button>
        <Button color="teal.500">{activePage}</Button>
        <Button isDisabled={activePage===totalPages} bgColor={"teal.500"} color="white" fontSize={"20px"} fontWeight={"bold"} onClick={()=> dispatch({type:PRODUCTS_PAGE,payload:activePage+1})}>{">"}</Button>
      </Flex>
</Center>

</>
  );
}

export default AdminPanel;

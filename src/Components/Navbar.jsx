import * as React from 'react'
import image from "../assests/Desiwearlogo.png"
import {
    Box,
    useDisclosure,
    ListItem,
    UnorderedList,
    Text,
    Image,
    Input,
    InputGroup,
    InputRightElement,
    Menu,
    MenuButton,
    Portal,
    MenuList,
    MenuItem,
    Hide,
    Stack,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    VStack
  } from "@chakra-ui/react";
  import { Link, useNavigate } from "react-router-dom";
  import "./Navbar.css"
  import { ChevronRightIcon} from "@chakra-ui/icons";
  import { AiOutlineStar} from "react-icons/ai";
  import { BiChevronDown } from "react-icons/bi";
  import {HiMenu} from "react-icons/hi"
  import { Button } from '@chakra-ui/react'
  import { ChevronDownIcon } from '@chakra-ui/icons'
  import { Tooltip } from "@chakra-ui/react";
  import { SlMagnifier } from "react-icons/sl";
  import { BsPerson } from "react-icons/bs";
  import { BiShoppingBag } from "react-icons/bi";
import { useDispatch,useSelector} from 'react-redux';
import { protypes } from '../Redux/Products/product.action';
import { BRAND, CATEGORY, PRODUCTS_PAGE } from '../Redux/Products/product.type';
import Avatars from "./Avatars";
import Authbuttons from "./Authbuttons"
import {useState} from "react"
import SearchCard from "./SearchCard"

  const Navbar = ()=>{
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const login = useSelector((state) => state.Auth.isAuth);
    const name = useSelector((state) => state.Auth.currentUser.name);
    const cartItems = useSelector((state) => state.productReducer.cartItems);
    const [searchInput, setSearchInput] = useState("");
    const [searchData,setSearchData]= useState([])
    const [searchBar,setSearchBar] = useState(false)

    const handleSearch = async()=>{
      try {
        let res = await fetch(`https://eager-handkerchief-bass.cyclic.app/product?search=${searchInput}`)
        let data = await res.json()
        setSearchData(data)
        if(searchInput===""){
           setSearchData([])
        }
      } catch (error) {
        console.log(error)
      }
      
    } 
    const doSomeMagic=(fn,d)=>{
      let timer;
      return function (){
    clearTimeout(timer)
        timer = setTimeout(()=>{
          fn()
        },d)
      }
    }
    const debFunction = doSomeMagic(handleSearch,500)

    const handleCate = (gender) => {
      const getProductsParam = {
        params: {
          gender: gender
        },
      };
      
      dispatch(protypes(gender));
     
   localStorage.setItem("cate", JSON.stringify(getProductsParam))
      
      dispatch({type:PRODUCTS_PAGE,payload:1})
      dispatch({type:CATEGORY,payload:[]})
    dispatch({type:BRAND,payload:[]})

      navigate("/product")
    };
    const handleInput=()=>{
      setSearchInput("")
      }
    return (
        <div>
            <Box className="first-header">
                <Box className="navbar_top">
                    <Hide below="lg">
                        <Box className="container">
                            <Box className="header_menu">
                                <UnorderedList>
                                <ListItem className="download">
                                    <a
                                    href="facebook.com"
                                    target={"_blank"}
                                    className="facebook-logo22"
                                    >
                                    <Image
                                        src="https://cdn-icons-png.flaticon.com/512/44/44646.png"
                                        alt="apple_Store"
                                    />                
                                    <Text as="span">1.8M Followers</Text>
                                    </a>
                                    <a
                                    href="https://play.google.com/store/apps/details?id=com.licious&pli=1"
                                    target={"_blank"}
                                    >
                                    <Image
                                        src="https://cdn-icons-png.flaticon.com/512/87/87390.png?w=360"
                                        alt="play_store"
                                    /> 
                                    <Text as="span">682k Followers</Text>
                                    </a>
                                </ListItem>
                                </UnorderedList>
                            </Box>
                            <Box className="header_right">
                                <Text as="span">Open doors to a world of fashion | Young and fresh</Text>
                            </Box>
                            <Box className="down_arrow">
                                <Menu className="down_arrow3">
                                    <MenuButton  as={Button} rightIcon={<ChevronDownIcon />} colorscheme='white' color="black" fontSize='15px' border="none" >
                                        English
                                    </MenuButton >
                                    <MenuList >
                                        <MenuItem className="down_arrow2">English</MenuItem>
                                    </MenuList>
                                </Menu>
                            </Box>
                        </Box>
                    </Hide>
                </Box>
{/*////////////////////////////////////////////// first navbar complete //////////////////////////////////////////////////////////*/}
{/*////////////////////////////////////////////// second navbar start //////////////////////////////////////////////////////////*/}
    <Box id="after-top">
      <Box id="menu_nav" >
        <Box
          alignItems="center"
          display="flex"
          justifyContent="space-evenly"
          width="84%"
          margin="auto"
          id="hover-black"
        >
          <div id="menu-dropdown" className='containerh' >
            <div id="menu-title" className='icon' onClick={()=> handleCate("men")}>Men <BiChevronDown/></div>
            <div className="popup">
                    <div className="contpop">
                        <div className="firstpop">
                            <h5>Clothing</h5>
                            <a href=""><p>New in</p></a> 
                            <a href=""><p>View all</p></a> 
                            <a href=""><p>T-Shirts</p></a> 
                            <p>Jackets & Coats</p>
                            <p>Hoodies & Sweatshirts</p>
                            <p>Sweetpants</p>
                            <p>Shorts</p>
                            <p>Co-ord sets</p>
                            <p>SHU</p>
                            <p>Nike</p>
                            <p>Tigerbear</p>
                            <p>Keen</p>
                        </div>
                        <div className="secondpop">
                            <a href=""><h5>Brands</h5></a> 
                            <a href=""><p>Essentials by koovs</p></a> 
                            <a href=""><p>BALL Copenhagen</p></a> 
                            <a href=""><p>Bravesoul</p></a> 
                            <p>The couture club</p>
                            <p>Arkk copenhagen</p>
                            <p>SHU</p>
                            <p>Nike</p>
                            <p>Tigerbear</p>
                            <p>Keen</p>
                            <p>Sive</p>
                            <p>Kangel</p>
                            <p>Comatoes</p>
                        </div>
                        <div className="thirdpop">
                            <h5>Shoes</h5>
                            <p>Sneakers</p>
                            <p>Slides</p>
                        </div>
                       <div className="thirdpopup">
                        <div className="thirdpop" >
                            <Image  className="im3" src="https://cdn.shopify.com/s/files/1/0677/1464/6315/files/Screenshot_2022-11-10_at_5.37.53_PM.png?v=1668083230&width=533" alt="men-image11" />
                        </div>
                       </div>
                    </div>
          
            </div>
          </div>
          <div id="menu-dropdown" className='containerh'>
            <div id="menu-title" className='icon' onClick={()=> handleCate("women")}>Women<BiChevronDown/></div>
              <div className="popup">
                    <div className="contpop">
                        <div className="firstpop">
                            <h5>Clothing</h5>
                            <p>New in</p>
                            <p>View all</p>
                            <p>Lounge & sleep wear</p>
                            <p>Lingerie & innerwear</p>
                            <p>T-Shirts</p>
                            <p>Sweetpants</p>
                            <p>Sweatshirts</p>
                            <p>Sports bra</p>
                            <p>Bodysuit</p>
                            <p>Outer wear</p>
                            <p>Jeans</p>
                            <p>Dress</p>
                        </div>
                        <div className="secondpop">
                            <h5>Shoes</h5>
                            <p>New in</p>
                            <p>View all</p>
                            <p>Sneakers</p>
                            <p>Heels</p>
                            <p>Nike</p>
                            <p>Tigerbear</p>
                            <p>Keen</p>
                            <p>Sive</p>
                            <p>Kangel</p>
                            <p>Sliders & flip flops</p>
                            <p>Boots</p>
                            <p>Nike</p>
                        </div>
                        <div className="secondpop">
                            <h5>Brands</h5>
                            <p>Bravesoul</p>
                            <p>Koovs sport</p>
                            <p>Koovs</p>
                            <p>Public desire</p>
                            <p>Keen</p>
                            <p>SHU</p>
                            <p>Arkk copenhagen</p>
                            <p>The courture club</p>
                            <p>Nike</p>
                            <p>BALL Copenhagen</p>
                            <p>Kangel</p>
                            <p>Comatoes</p>
                        </div>
                       <div className="thirdpopup">
                        <div className="thirdpop">
                            <Image className="im4" src="https://cdn.shopify.com/s/files/1/0677/1464/6315/files/Screenshot_2022-11-10_at_6.09.16_PM.png?v=1668083985&width=533" alt="men-image12" />
                        </div>
                      </div>
                  </div>         
            </div>
          </div>
          <div id="menu-dropdown" className='artist_collab1 icon'>
            <div id="menu-title " className='menu-title3'>Artist collab<BiChevronDown/></div>
            <div className="menu-dropdown-content">
              <Box display="flex" gap="50px" pt={5} padding="15px">
                <div style={{ fontFamily: "sans-serif", paddingLeft: "20px" }}>
                  <p
                    style={{
                      paddingTop: "15px",
                      textAlign: "left",
                      marginBottom: "20px",
                    }}
                  >
                    George Thomas
                  </p>
                </div>
              </Box>
            </div>
          </div>
        </Box>
      </Box>
        <Box>
        <Link to='/'>
          <Image 
            className="logo hot-logo" 
            src={image}
            alt="logo"
          />
        </Link>
        </Box>
        <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={2} alignItems="center">
              
               
                <Link onClick={()=> setSearchBar(!searchBar)}>  <SlMagnifier size={"20px"} /></Link>
                
              
              <Tooltip hasArrow label="Account " bg="black" color="white">
                {/* <Button as={Link} to={"/login"} backgroundColor={"white"}>
                  <BsPerson size={"20px"} />
                </Button> */}
                <Menu>
                <Flex direction="column" alignItems="center">
                
                {login? <Avatars name={name} /> : <Authbuttons />}
              </Flex>
                </Menu>
              </Tooltip>

              {/* <Tooltip hasArrow label="Wishlist " bg="black" color="white"> */}
                {/* <Button as={Link} to={"/wishlist"} backgroundColor={"white"}> */}
                 <Link><AiOutlineStar size={"20px"} /> </Link> 
                  {/* <p className="cartValue">{wishlist.length}</p> */}
                  {/* <p className="cartValue">0</p> */}
                {/* </Button> */}
              {/* </Tooltip> */}
              {/* <Tooltip hasArrow label="Cart " bg="black" color="white">
                <Button as={Link} to={"/cartpage"} backgroundColor={"white"}> */}
                <Box>
                 <Link to="/cartpage"> <BiShoppingBag size={"20px"} /></Link>
                  <Box w="17px" pos={"absolute"} mt="-30px" ml="10px" h="20px" borderRadius={"50%"} bgColor="red" color="white">{cartItems}</Box>

                </Box>
                  {/* <p className="cartValue">{cartItems.length}</p> */}
                {/* </Button>
              </Tooltip> */}
            </Stack>
        </Flex>
      </Box>

      <div id="responsive_22">
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{ marginLeft: "30px" }}>
            <HiMenu ref={btnRef} colorscheme="teal" onClick={onOpen} size="1.6em"/>
            <Drawer
              isOpen={isOpen}
              placement="left"
              onClose={onClose}
              finalFocusRef={btnRef}
              height= "100vh"
              size="full"
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerBody>
                  <Box display="flex" flexDirection="column" gap="20px" marginLeft="10px">
                    <br/>
                    <br/>
                    <br/>
                    <a href="products"><p>Men<ChevronRightIcon/></p></a>    
                    <a href="products"><p>Women<ChevronRightIcon/></p></a>    
                    <a href="products"><p>Artist Collab<ChevronRightIcon/></p></a>                    
                  </Box>
                </DrawerBody>
                <Box display="flex" flexDirection="column" gap="20px" marginLeft="25px">
                  <a href="/"><p className='myaccount123'>My Account</p></a>                    
                </Box>
                <DrawerHeader mt={12} display="flex" flexDirection="column" width="40%">
                  <Button as={Link} to={"/login"} bgColor="black" color="white" colorscheme = "none">Login</Button>
                  <Button as={Link} to={"/register"} variant="outline"  border =" 1px solid black"  colorscheme = "none">Register</Button>
                </DrawerHeader>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
        <div>
            <Image style= {{width : "90px", height : "25px"}} src="https://cdn.shopify.com/s/files/1/0677/1464/6315/files/koovs_final_logo.svg?v=1667889730" alt="logo"/>
        </div>
        <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={-2}>
              <Tooltip hasArrow label="Search " bg="black" color="white">
                <Button backgroundColor={"white"}>
                  <SlMagnifier size={"20px"} />
                </Button>
              </Tooltip>
              <Tooltip hasArrow label="Cart " bg="black" color="white">
                <Button as={Link} to={"/cart"} backgroundColor={"white"}>
                  <BiShoppingBag size={"20px"} />
                  <p className="cartValue">0</p>
                </Button>
              </Tooltip>
            </Stack>
          </Flex>
      </div>
      </Box>
      <Input w="50%" m="auto" display={searchBar? "block":"none"} value={searchInput} onChange={(e)=>{
                  setSearchInput(e.target.value)
                  debFunction()
                }} placeholder="Try Saree, Kurti or Search by Product Code"></Input>
      <VStack h="300px" zIndex={1} ml="25%" w="50%" pl="5px" display={searchData.length>0 && searchInput.length>0?"block":"none"} overflowY={"auto"} bgColor={"white"} pos="absolute">
              {searchData.length>0 && searchData.map((e)=> <SearchCard inputs={handleInput} data={e}/>)}
      </VStack>
      </div>
    )
  }

  export default Navbar;
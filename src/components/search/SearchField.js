import React,  { useState, useEffect } from 'react'
import axios from 'axios';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { Input , Button, Modal } from 'antd';
import useModal from '../Modal/useModal';
import SearchModalContent from '../Modal/SeachModalFragment';
import useStyles from './styles';

const SearchField = ({ value, toggle, setToggle }) => {
    //state variables
    const [ options, setOptions ] = useState();
    const [ list, setList ] = useState([]);
    //custom hooks
    const classes = useStyles();
    const SearchModal = Modal;
    const {isVisible, selectedUser, toggleModal } = useModal(SearchModal)


    const filterData = (value,options) => {
        setList([{}])
        console.log(list)
        const newList =  options.filter((val) => {
            const fullName = `${val.first_name.toLowerCase()} ${val.last_name.toLowerCase()}`;
            if(fullName.includes(value.name.toLowerCase())) {
            return val
        }
        }).filter((val, idx) => idx < 10).map((val) => val) 
                return(
                    newList
                )

      }
    //pulling in the data for search
      useEffect(() => {
        axios.get(`http://localhost:8000/mentees`)
          .then(async res => {
            const data = await res
            if (!res) {
              const err = (data && data.message) || res.status;
              return Promise.reject(err);
              console.log('no response')
            }
            setOptions(data.data);

          })
          .catch(error => {
            //setErrorMessage(error);
            console.error("error", error);
          });
      },[]);
      //useEffect that filters the list as a user types
      useEffect(() => {
        if(toggle) {
            if( value.name.length < 1 ) {
                setToggle(!toggle)
                setList(filterData(value,options))
            }
            else{
             setList(filterData(value,options))
            }
        }
        else{
            if(value?.name?.length >= 1 ){
            setToggle(!toggle)
            setList(filterData(value,options))
            }
            else{
                return null;
            }
        }
       }, [value])

       //setting up perma features first 
       const features = [
        {name: "calendar", url: "/calendar/"},
        {name: "donate", url: "/donate/"},
        {name: "signup", url: "/signup/"},
        {name: "signin", url: "/signin/"},
        {name: "booking", url: "/booking/"},
        {name: "dashboard", url: "/"},
        {name: "register", url: "/register/"},
        {name: "Create Mentor", url: ""}
      ]
      
    //Search
      const handleClick = () => {

      }
    return (
        <>
        { toggle ?
            <>
            <Card 
                style= {{backgroundColor: 'rgba(255,255,255,2.5)', width:"80%" , margin: "0px 100px",  overflow: "hidden" , overflowY: "scroll", height:'20vh' }}
            >
                {list.map((e) =><> <li
                                    className = {classes.listItem}
                                    onClick = {() => {
                                      toggleModal(SearchModal,e);
                                      handleClick();}}
                > <span>{`${e.first_name} ${e.last_name}`} </span>
            <span style = {{
            position: "relative",
            backgroundColor: "rgba(0,0,0,.05)",
            float:"right"
            }}> mentee </span> </li> </> )}
                {features.map((feature) => <Link style = {{margin:"10px"}} className = {classes.featureItem} to = {`${feature.url}`}> {`${feature.name}`} </Link>) }
              <Button type = "primary" danger style = {{float:"right", marginBottom: "5px"}} onClick = {() => setToggle(false)}> close </Button>
            </Card>
             <SearchModal visible={isVisible} onOk={toggleModal} onCancel={toggleModal} destroyOnClose={true} >
             <SearchModalContent user={selectedUser}/>
             <Button>Edit</Button>
           </SearchModal>
           </>
             :null
        }
             
        </>
    )
}

export default SearchField
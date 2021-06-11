import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, Card } from 'antd';

import '../search-bar/Modal.css';
import useModal from '../Modal/useModal';
import SearchModalContent from '../Modal/SeachModalFragment';
import data from '../search-bar/MOCK_DATA.json';

const SearchField = ({ value, toggle, setToggle, fieldRef }) => {
  //state variables
  const [options, setOptions] = useState([]);
  const [list, setList] = useState([]);

  //custom hooks
  const { isVisible, selectedUser, toggleModal } = useModal(Modal);

  // array that holds each section of search dropdown
  const listSections = [
    {
      title: 'Students',
      data: list
    },
    {
      title: 'Teachers',
      data: list
    }
  ];

  const [currentListSections, setCurrentListSections] = useState(listSections)

  //filter function for search bar
  const handleFiltering = (value, options) => {
    if (!value?.name?.length) {
      return [];
    }
    const searchTerm = value.name.toLowerCase();

    if (searchTerm === 'students') {
      setCurrentListSections([listSections[0]])
      return options
    }
    if (searchTerm === 'teachers') {
      setCurrentListSections([listSections[1]])
      return options
    }
    else {
      setCurrentListSections(listSections)
      return options
      .filter((e) => {
        if (
          searchTerm.length <= e.first_name.length &&
          searchTerm === e.first_name.slice(0, searchTerm.length).toLowerCase()
        ) {
          return true;
        }
        if (
          searchTerm.length <= e.last_name.length &&
          searchTerm === e.last_name.slice(0, searchTerm.length).toLowerCase()
        ) {
          return true;
        }
        return false;
      })
      .slice(0, 10);
    }
  };

  //wrote out the api call originally going to local host and everything seemed to work , reverted to local mockdata file for development
  useEffect(() => {
    setOptions(data);
  }, []);

  useEffect(() => {
    setList(handleFiltering(value, options))
  }, [value, options, setToggle]);

  const features = [
    { name: 'Calendar', url: '/calendar/' },
    { name: 'Donate', url: '/donate/' },
    { name: 'Sign up', url: '/signup/' },
    { name: 'Sign in', url: '/signin/' },
    { name: 'Booking', url: '/booking/' },
    { name: 'Dashboard', url: '/' },
    { name: 'Register', url: '/register/' },
    { name: 'Create Mentor', url: '' },
  ];

  return (
    <>
      {toggle && (
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <div ref={fieldRef} style={{ width: '80%' }}>
            <Card
              style={{
                backgroundColor: 'rgba(255,255,255,2.5)',
                width: '100%',
                margin: '0',
                overflow: 'hidden',
                overflowY: 'scroll',
                height: '20vh',
              }}
            >
              {console.log('currentListSections', currentListSections)}
              {value.name.length > 0 && list.length > 0 ? currentListSections.map((section) => (
                <>
                  <span key={section.title} style={{fontWeight: 'bold'}}>
                    {section.title}
                  </span>

                  {section.data.map((user) => {
                    return (
                      <div
                      key={user.id}
                      onClick={() => toggleModal(Modal, user)}
                    >
                      {user.first_name} {user.last_name}
                    </div>
                    )
                  })}
                </>
              )) : ''}
              {list.length === 0 && (
                <p>
                  Need to register a new mentee? click here{' '}
                  <Link to={'/register/'}> register </Link>
                </p>
              )}

              {features.map((feature) => (
                <Link
                  key={feature.name}
                  style={{ margin: '5px' }}
                  to={`${feature.url}`}
                  onClick={() => setToggle(false)}
                >
                  {' '}
                  {`${feature.name}`}{' '}
                </Link>
              ))}
              <Button
                type="primary"
                danger
                onClick={() => setToggle(false)}
                style={{ position: 'relative', float: 'right' }}
              >
                {' '}
                close{' '}
              </Button>
            </Card>
          </div>
          <Modal
            visible={isVisible}
            onOk={toggleModal}
            onCancel={toggleModal}
            destroyOnClose={true}
          >
            <SearchModalContent user={selectedUser} />
            <Button>Edit</Button>
          </Modal>
        </div>
      )}
    </>
  );
};

export default SearchField;

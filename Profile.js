import React, { Component } from 'react';
import User from './user';
import { Container, Header, ListItem, Item, Input, List, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {View, FlatList,  Image, StyleSheet} from 'react-native' 
import axios from 'axios';
import Search from './Search';


const Profile = (props) => {
	const {getSearchText, name, header, image, userName, email, repoCount, followersCount, followingCount, changePage, retrieveDataStored } = props;
    return (
      <Container>
         <Search getSearchText= {getSearchText} changePage = {changePage}/>
        <Header>
          <Body>
            <View style={{flexDirection: 'row', height: 100, paddingTop : 40}}>
              <Icon name="person" style={{paddingLeft : 10, paddingRight: 20}}/>
              <Title>{header}</Title>
            </View>
          </Body>
          <Right />
        </Header>
        <Content>
          <View style = {styles.container} >
            <Image style={{width: 150, height: 150}} source= {{uri : image }}/>
            <View style = {{flexDirection : 'column', alignItems:'center'}}>
              <Text style={styles.welcome} > {name}</Text>
              <Text style={{color: 'red'}}> {userName}</Text>
            </View>
          </View>
          <View style={styles.containerList}>
            <Text style={styles.welcomeLi}> Email  </Text> 
            <Text style={styles.welcomeLiR}> {email} </Text>
            <Text style={styles.welcomeLi}> Number of Repositories  </Text> 
            <Text style={styles.welcomeLiR}>  {repoCount} </Text>
            <Text style={styles.welcomeLi}> Number of Followers  </Text> 
            <Text style={styles.welcomeLiR}> {followersCount} </Text>
            <Text style={styles.welcomeLi}> Number of Following  </Text> 
            <Text style={styles.welcomeLiR}> {followingCount} </Text>
          </View>
        </Content>
        <Footer>
          <FooterTab>
            <Button onPress={() => changePage('2')}>
              <Text style={{fontSize:15, }}>Repositories</Text>
            </Button>
            <Button onPress={() => changePage('3')}>
              <Text style={{fontSize:15, }}>Followers</Text>
            </Button>
            <Button onPress={() => changePage('4')}>
              <Text style={{fontSize:15, }}>Following</Text>
            </Button>
            <Button onPress={() => changePage('6')}>
              <Text style={{fontSize:15, }}>Notifications</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection : 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 400,
    height: 200,
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 5,
    fontWeight: 'bold',
    paddingLeft : 0,
  },
  welcomeLi: {
    fontSize: 20,
    margin: 5,
    fontWeight: 'bold',
    paddingLeft : 10,
  },
  welcomeLiR: {
    fontSize: 20,
    color: 'grey',
    margin: 5,
    fontWeight: 'bold',
    paddingLeft : 10,
  },
  instructions: {
    color: '#333333',
    marginLeft: 5,
  },
  instructionsName: {
    color: '#333333',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  containerList: {
   flex: 1,
   paddingTop: 20,
  },
  item: {
    padding: 10,
    fontSize: 18,
  },
});
export default Profile;
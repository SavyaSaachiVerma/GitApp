"use strict"
import React, { Component } from 'react';
import User from './user';
import Profile from './Profile';
import Login from './Login';
import Followers from './Followers';
import Following from './Following';
import Search from './Search';
import Notifications from './notifications';
import SearchView from './SearchView';
import { Container, Header, ListItem, Item, Input, List, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {View, FlatList,  Image, StyleSheet} from 'react-native' 
import axios from 'axios';
import {AsyncStorage} from 'react-native';

export default class AnatomyExample extends Component {
  constructor(){
    super();
    const githubToken = "476fd7869df5b48db76799916077ba62b0e31637";
    const axios = require('axios');
    this.changePage = this.changePage.bind(this);
    this.storeState = this.storeState.bind(this);
    this.retrieveItem = this.retrieveItem.bind(this);
    this.getSearchText = this.getSearchText.bind(this);
    this.retrieveDataStored = this.retrieveDataStored.bind(this);
    this.state = {
      update: "False",
      image : "./avatar.png",
      header : "Login",
      name : "Savya Saachi",
      userName: "savyasaachiverma",
      email : "ssverma2@illinois.edu",
      repoCount : "3",
      followersCount : "10",
      followingCount : "12",
      page : "Login",
      reposStar: [],
      text: '',
      reposName : ["Nonstop Networking", "Custom Chess", "Movie Database"],
      reposDesc : ["Networking", "Implemented a chess game", "Created a Database of"],
      keys: ["personal", "repos", "followers", "following"],
    }
  }
  componentDidMount(){
    var user = {}
    var star = []
    var urls = []
    var reposname = []
    var reposdesc = []
    return axios.get('https://api.github.com/users/'+ this.state.userName)
    .then( (json) => {user = new User(json.data);
      //console.log(json);
    })
    .then( () => {
        var promise = axios.get('https://api.github.com/users/' + this.state.userName + '/repos');
        promise.then( result => {
          //console.log(result);
          var data = result.data;
          data.forEach(repo => {
            //console.log(this.githubToken);
            axios.get('https://api.github.com/user/starred/'+this.state.userName+'/'+repo.name, {
              headers:{
                "Authorization": "token "+ "476fd7869df5b48db76799916077ba62b0e31637"
              }
            }).then((response) => {
              star.push("star")
              reposname.push(repo.name);
              reposdesc.push(repo.description);
            }).catch( (err) => {
              star.push("star-outline")
              reposname.push(repo.name);
              reposdesc.push(repo.description);
            })
          })
          }).then(() => this.setState({name: user.name, repoCount: user.repoCount, followersCount: user.followers,
            followingCount: user.following, image: user.avatar, reposName: reposname, reposDesc: reposdesc, reposStar: star}))
          .then(() => {
          this.storeState("personal", this.state).then(() => {
            this.retrieveItem("personal").then((map) => {
              //console.log(map);
            })
          })
        })
        })
  }  

  componentDidUpdate(){
    if (this.state.update == "True"){
      var user = {};
      return axios.get('https://api.github.com/users/'+ this.state.userName)
      .then( (json) => {user = new User(json.data);
        console.log(json);
      }).then(() => {
          this.setState({followingCount: user.following, followersCount: user.followers, update: "False"});
      }).then(() => {
        console.log(this.state.followingCount);
      })
    }
  }

  async storeState(key, value) {
    try {
        //console.log(value);
        var jsonOfPersonal = await AsyncStorage.setItem(key, JSON.stringify(value));
        return jsonOfPersonal;
    } catch (error) {
      console.log(error.message);
    }
  }

  async retrieveItem(key) {
    try {
      const retrievedItem =  await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);
      return item;
    } catch (error) {
      console.log(error.message);
    }
    return
  }

  retrieveDataStored(){
    var keys = this.state.keys;
    console.log(keys);
    for(var i=0; i<keys.length; i++){
      this.retrieveItem(keys[i]).then((map) => {
        console.log(map);
      })
    }
  }

  starRepository(repository, status, repoNum){
    console.log(repository);
    if (status == "star-outline"){
      const size = 0;
      axios.put('https://api.github.com/user/starred/'+this.state.userName+'/'+repository, {}, {
        headers:{
          "Authorization": "token "+ "476fd7869df5b48db76799916077ba62b0e31637",
          "content-length": size,
        }
      }).then((response) => {
        console.log(response);
        var star = this.state.reposStar;
        star[repoNum-1] = "star"; 
        this.setState({reposStar: star})
      }).catch ((err) => {
        console.log(err);
      });
    }
    else {
      axios.delete('https://api.github.com/user/starred/'+this.state.userName+'/'+repository, {
        headers:{
          "Authorization": "token "+ "476fd7869df5b48db76799916077ba62b0e31637",
        }
      }).then((response) => {
        console.log(response);
        var star = this.state.reposStar;
        star[repoNum-1] = "star-outline"; 
        this.setState({reposStar: star})
      }).catch ((err) => {
        console.log(err);
      });
    }
  }

  getSearchText(text){
    console.log(text);
    this.setState({text: text});
  }

  changePage(page){
    console.log(page);
    if(page == '1'){
      this.setState({page:"Profile", header:"Profile", update: "True"})
    }
    else if(page == '2'){
      this.setState({page:"Repo", header:"Repositories"})
      this.storeState("repos", this.state.reposName).then(() => {
        this.retrieveItem("repos").then((map) => {
          console.log(map);
        })
      })
    }
    else if(page == '3')
      this.setState({page:"Followers", header:"Followers"})
    else if(page == '4')
      this.setState({page:"Following", header:"Following"})
    else if(page == '5')
      this.setState({page:"SearchView", header: "Results"})
    else if(page == '6')
      this.setState({page:"Notifications", header: "Notifications"})
  }

  createData(){
    var data = [];
    for(var i = 0; i < this.state.reposName.length; i++){
        data.push({a: this.state.reposName[i], b: this.state.userName, c: this.state.reposDesc[i], d: i+1, e: this.state.reposStar[i]})
    } 
    return data;
  }
  render() {
    if (this.state.page == "Login")
      return(
        <Login header = {this.state.header} changePage = {this.changePage}/>
        //<Notifications/>
        );
    else if (this.state.page == "Profile")
      return(
          <Profile getSearchText= {this.getSearchText} name = {this.state.name} header = {this.state.header} image = {this.state.image} userName = {this.state.userName} email= {this.state.email} repoCount = {this.state.repoCount} followersCount = {this.state.followersCount} followingCount = {this.state.followingCount} changePage = {this.changePage} retrieveDataStored = {this.retrieveDataStored}/>
      );
    else if (this.state.page == "Repo")
      return(
        <Container>
         <Search getSearchText= {this.getSearchText} changePage = {this.changePage}/>
          <Header>
            <Body>
              <View style={{flexDirection: 'row', height: 100, paddingTop : 40}}>
                <Icon name="paper" style={{paddingLeft : 10, paddingRight: 20}}/>
                <Title>{this.state.header}</Title>
              </View>
            </Body>
            <Right>
            <Icon name="arrow-back" onPress={() => this.changePage('1')} style={{paddingLeft : 10, paddingRight: 20}}/>
            </Right>
          </Header>
          <Content>
          <FlatList
            data= {this.createData()}
            renderItem={({item}) => <View style={styles.item}>
                                  <Text style={styles.instructions}>{item.d}. <Text style={styles.instructionsName}> {item.a} by <Text style={styles.instructions}> {item.b}<Icon name={item.e} type="Ionicons" onPress={() => this.starRepository(item.a, item.e, item.d)} /></Text></Text></Text>
                                  <Text style={{fontWeight: 'bold'}}>Desc: <Text style = {{fontWeight:"normal"}}> {item.c} </Text> </Text>
                                  </View>}
          />
          </Content>
          <Footer>
            <FooterTab>
              <Button onPress={() => this.changePage('2')}>
                <Text style={{fontSize:15, }}>Repositories</Text>
              </Button>
              <Button onPress={() => this.changePage('3')}>
                <Text style={{fontSize:15, }}>Followers</Text>
              </Button>
              <Button onPress={() => this.changePage('4')}>
                <Text style={{fontSize:15, }}>Following</Text>
              </Button>
              <Button onPress={() => this.changePage('6')}>
                <Text style={{fontSize:15, }}>Notifications</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      );
    else if (this.state.page == "Followers")
      return(
        <Followers getSearchText= {this.getSearchText} header = {this.state.header} userName = {this.state.userName} changePage = {this.changePage} storeState = {this.storeState} retrieveItem = {this.retrieveItem}/>
      );
    else if (this.state.page == "Following")
      return(
        <Following getSearchText= {this.getSearchText} header = {this.state.header} userName = {this.state.userName} changePage = {this.changePage} storeState = {this.storeState} retrieveItem = {this.retrieveItem}/>
     );
    else if (this.state.page == "SearchView")
      return(
        <SearchView getSearchText= {this.getSearchText} header = {this.state.header} text = {this.state.text} changePage = {this.changePage}/>
      );
    else if (this.state.page == "Notifications")
      return(
        <Notifications getSearchText= {this.getSearchText} header = {this.state.header} text = {this.state.text} changePage = {this.changePage}/>
      );
  }
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
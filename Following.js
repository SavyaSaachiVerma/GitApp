import React, { Component } from 'react';
import axios from 'axios';
import Profile from './Profile';
import User from './user';
import {FlatList} from 'react-native';
import Search from './Search';
import { Container, Header, Content, List, Item, Input, ListItem, Left, Body, Right, Thumbnail, Text, View, Icon, Title, Footer, FooterTab, Button } from 'native-base';

export default class ListAvatarExample extends Component {

  constructor(){
    super();
    this.showProfile = this.showProfile.bind(this);
    this.state = {
      followersId: [],
      userName : "",
      name : "",
      repoCount : "",
      followersCount : "",
      followingCount : "",
      image : "", 
      showProfile : "False",
      followersName : [],
      followersAvatar : [], 
    }
  }

  showProfile(userName){
    const {header, changePage } = this.props;
    if(userName == '4') {
      this.setState({showProfile : "False"});
    }
    else if (userName == '3'){
      changePage('3');
    }
    else if(userName == '2'){
      changePage('2');
    }
    else{
      console.log(userName);
      var user = {};
      return axios.get('https://api.github.com/users/'+ userName)
      .then( (json) => {user = new User(json.data);
      }).then( () => {
        this.setState({ userName: userName, name: user.name, repoCount: user.repoCount, followersCount: user.followers,
            followingCount: user.following, image: user.avatar, showProfile: "True" })
      })
    }
  }

  componentDidMount(){
    const {header, userName, changePage, storeState, retrieveItem } = this.props;
    var followersName =  [];
    var followersAvatar = [];
    var followersId = [];
    return axios.get('https://api.github.com/users/' + userName + '/following')
    .then( json =>{
      console.log(userName);
      console.log(json);
      var data = json.data;
      var count = 0;
      data.forEach(follower => {
        followersId.push(count);
        followersName.push(follower.login);
        followersAvatar.push(follower.avatar_url);
        count = count + 1;
      })
    }).then(() => {this.setState({followersName : followersName, followersAvatar:followersAvatar, followersId: followersId})
    }).then(() => {
        storeState("following", this.state.followersName).then(() => {
        retrieveItem("following").then((map) => {
          console.log(map);
        })
      })
    });
  }

  componentDidUpdate(){
    const {storeState,retrieveItem} = this.props;
    storeState("following", this.state.followersName).then(() => {
      retrieveItem("following").then((map) => {
        console.log(map);
      })
    })
  }

  createData(){
    var data = [];
    for(var i = 0; i < this.state.followersName.length; i++){
        data.push({a: this.state.followersName[i], b: this.state.followersAvatar[i], c: this.state.followersId[i]})
    } 
    return data;
  }

  unfollow(userName, userId){
    axios.delete('https://api.github.com/user/following/'+userName, {
        headers:{
          "Authorization": "token "+ "476fd7869df5b48db76799916077ba62b0e31637",
        }
      }).then((response) => {
        console.log(response);
        console.log(userId);
        var followersId = this.state.followersId;
        var followersName = this.state.followersName;
        var followersAvatar = this.state.followersAvatar;
        followersAvatar.splice(userId, 1);
        followersName.splice(userId, 1);
        followersId = [...Array(this.state.followersName.length).keys()];
        console.log(followersId);
        this.setState({followersName : followersName, followersAvatar:followersAvatar, followersId: followersId})
      }).catch ((err) => {
        console.log(err);
      });
  }
  render() {
    const {getSearchText, header, changePage } = this.props;
    if (this.state.showProfile == "False")
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
            <Right>
            <Icon name="arrow-back" onPress={() => changePage('1')} style={{paddingLeft : 10, paddingRight: 20}}/>
            </Right>
          </Header>
        <Content>
          <FlatList
            data= {this.createData()}
            renderItem={ ({item}) =>           
              <List>
              <ListItem avatar>
                <Left>
                  <Thumbnail source={{ uri: item.b }} />
                </Left>
                <Body style={{flexDirection : 'row',}}>
                  <Text style = {{paddingRight : 50, }} onPress={() => this.showProfile(item.a)}>{item.a}</Text>
                  <Button style = {{ height: 30 }} onPress={() => this.unfollow(item.a, item.c)}><Text style={{fontSize:15, }}>Unfollow</Text></Button>
                </Body>
                <Right />
              </ListItem>
              </List>}
            />

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
    else if (this.state.showProfile == "True"){
      return(
        <Profile name = {this.state.name} header = {this.state.header} image = {this.state.image} userName = {this.state.userName} email= {this.state.email} repoCount = {this.state.repoCount} followersCount = {this.state.followersCount} followingCount = {this.state.followingCount} changePage = {this.showProfile}/>
      );
    }
  }
}
import React, { Component } from 'react';
import axios from 'axios';
import {FlatList} from 'react-native';
import Search from './Search';
import { StyleSheet} from 'react-native' ;
import { Container, Header, Content, List, Item, Input, ListItem, Left, Body, Right, Thumbnail, Text, View, Icon, Title, Footer, FooterTab, Button } from 'native-base';

export default class ListAvatarExample extends Component {
	constructor(props){
		super(props);
		this.state = {
			usersList : [],
			userCount : "",
			reposList : [],
			reposCount : "",
			page: "homeRes",
			header: "Results",
			name: 0,
			score: 0,
			fork: 0,
			stars: 0,
		} 
	}

	changePage(page){
    	console.log(page);
    	if(page == '1'){
      		this.setState({page:"usersRes", header:"User Results"});
    	}
    	else if(page == '2'){
      		this.setState({page:"reposRes", header:"Repositories Results"});
    	}
    	else if(page == '3'){
    		this.setState({page:"homeRes", header:"Results"});
    	}
	}

	applySort(type){
		if(type == "name"){
			console.log(type);
			this.state.usersList.sort(function(a,b){
				if (a.login < b.login)
					return (-1);
				else
					return(1);
			})
		}
		else if (type == "score"){
			console.log(type);
			this.state.usersList.sort(function(a,b){return (a.score - b.score)})
		}
		else if (type == "fork"){
			console.log(type);
			this.state.reposList.sort(function(a,b){
				console.log(a.forks + ' ' + b.forks);
				return (b.forks - a.forks)})
		}
		else if (type == "star"){
			console.log(type);
			this.state.reposList.sort(function(a,b){return (a.stargazers_count - b.stargazers_count)})
		}

	}
	createDataUsers(){
    	var data = [];
    	for(var i = 0; i < this.state.usersList.length; i++){
        	data.push({a: this.state.usersList[i].login, b: this.state.usersList[i].avatar_url})
    	} 
    	return data;
  	}

  	createDataRepos(){
    var data = [];
    console.log(this.state.reposList.length)
    for(var i = 0; i < this.state.reposList.length; i++){
        data.push({a: this.state.reposList[i].name, b: this.state.reposList[i].owner.login, c: this.state.reposList[i].description, d: i+1})
    } 
    return data;
  }

	componentDidMount(){
		const{text} = this.props;
		console.log(text);
		var usersList = [];
		var reposList = [];
		var userCount = "";
		var reposCount = "";
		return axios.get('https://api.github.com/search/users?q=' + text)
    	.then( (json) => {
      		console.log(json.data);
      		usersList = json.data.items;
      		userCount = json.data.total_count;
    	})
    	.then( axios.get('https://api.github.com/search/repositories?q=' + text)
    	.then( (json) => {
      		console.log(json.data);
      		reposList = json.data.items;
      		reposCount = json.data.total_count;
    	})
    	.then(() => this.setState({usersList:usersList, userCount:userCount, reposList:reposList, reposCount:reposCount})))
	}

	render(){
		const {header, text, getSearchText, changePage} = this.props;
		if(this.state.page == "homeRes"){
		return(
			<Container>
				<Header>
					<Body>
              			<View style={{flexDirection: 'row', height: 100, paddingTop : 40}}>
                			<Icon name="person" style={{paddingLeft : 10, paddingRight: 20}}/>
                  			<Title>{this.state.header}</Title>
              			</View>
            		</Body>
					<Right>
            			<Icon name="arrow-back" onPress={() => changePage('1')} style={{paddingLeft : 10, paddingRight: 20}}/>
            		</Right>
            	</Header>
            	<Content>
            		<View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            			<Button transparent onPress={() => this.changePage('1')}>
              				<Text style={{fontSize:15, }}>Users                 {this.state.userCount}</Text>
            			</Button>
            			<Button rounded light onPress={() => this.applySort('name')}>
           					<Text>Name</Text>
          				</Button>
          				<Button rounded info onPress={() => this.applySort('score')}>
           					<Text>Score</Text>
          				</Button>
          			</View>
          			<View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            			<Button transparent onPress={() => this.changePage('2')}>
              				<Text style={{fontSize:15, }}>Repositories         {this.state.reposCount} </Text>
            			</Button>
            			<Button rounded light onPress={() => this.applySort('fork')}>
           					<Text>Fork</Text>
          				</Button>
          				<Button rounded info onPress={() => this.applySort('star')}>
           					<Text>Stars</Text>
          				</Button>
            		</View>
            	</Content>
			</Container>
		);
		}
		else if(this.state.page == "usersRes"){
			return(
			<Container>
        	<Header>
            	<Body>
              	<View style={{flexDirection: 'row', height: 100, paddingTop : 40}}>
                	<Icon name="ios-people" style={{paddingLeft : 10, paddingRight: 20}}/>
                  	<Title>{this.state.header}</Title>
              	</View>
            	</Body>
            	<Right>
            	<Icon name="arrow-back" onPress={() => this.changePage('3')} style={{paddingLeft : 10, paddingRight: 20}}/>
            	</Right>
          	</Header>
        	<Content>
          		<FlatList
            		data= {this.createDataUsers()}
            		renderItem={ ({item}) =>           
              		<List>
              			<ListItem avatar>
                			<Left>
                  				<Thumbnail source={{ uri: item.b }} />
                			</Left>
                		<Body style={{flexDirection : 'row',}}>
                			<Text style = {{paddingRight : 50, }} >{item.a}</Text>
                		</Body>
                		<Right />
              			</ListItem>
              		</List>}
           		/>
        	</Content>
        	</Container>
        	);
		}
		else if(this.state.page == "reposRes"){
			return(
				<Container>
          		<Header>
            		<Body>
              			<View style={{flexDirection: 'row', height: 100, paddingTop : 40}}>
                			<Icon name="paper" style={{paddingLeft : 10, paddingRight: 20}}/>
                			<Title>{this.state.header}</Title>
              			</View>
            		</Body>
            		<Right>
            			<Icon name="arrow-back" onPress={() => this.changePage('3')} style={{paddingLeft : 10, paddingRight: 20}}/>
            		</Right>
          		</Header>
          		<Content>
          			<FlatList
            			data= {this.createDataRepos()}
            			renderItem={({item}) => <View style={styles.item}>
                                  <Text style={styles.instructions}>{item.d}. <Text style={styles.instructionsName}> {item.a} by <Text style={styles.instructions}> {item.b}</Text></Text></Text>
                                  <Text style={{fontWeight: 'bold'}}>Description: <Text style = {{fontWeight:"normal"}}> {item.c} </Text> </Text>
                                  </View>}
          			/>
          		</Content>
          		</Container>
			);
		}
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
import React, { Component } from 'react';
import axios from 'axios';
import {FlatList} from 'react-native';
import Search from './Search';
import { StyleSheet} from 'react-native' ;
import { Container, Header, Content, List, Item, Input, ListItem, Left, Body, Right, Thumbnail, Text, View, Icon, Title, Footer, FooterTab, Button } from 'native-base';

export default class Notifications extends Component {
	constructor(props){
		super(props);
		this.state = {
			notifications : [],
		}
	}

	componentDidMount(){
		var notif = [];
		return axios.get('https://api.github.com/notifications?since=2015-10-07T08:00:00Z' , {
            headers:{
                "Authorization": "token "+ "476fd7869df5b48db76799916077ba62b0e31637"
            }
        }).then((json) => {
        	console.log(json);
        	notif = json.data;
        }).catch((err) =>{
        	console.log(err);
        }).then(() => {this.setState({notifications : notif})});
	}

	createDataNotifs(){
		var data = [];
		data.push({a: "Repository", b: "Title", c: "Unread" });
    	for(var i = 0; i < this.state.notifications.length; i++){
        	data.push({a: this.state.notifications[i].repository.name, b: this.state.notifications[i].subject.title, c: this.state.notifications[i].unread,})
    		//console.log(data[i].c);
    	} 
    	return data;
	}
	render(){
		const {getSearchText, header, changePage } = this.props;
		console.log(this.state.notifications);
		return(
			<Container>
        		<Search getSearchText= {getSearchText} changePage = {changePage}/>
        		<Header>
            		<Body>
              			<View style={{flexDirection: 'row', height: 100, paddingTop : 40}}>
                			<Icon name="person" style={{paddingLeft : 10, paddingRight: 20}}/>
                  			<Title>{header}</Title>
              			</View>
            		</Body>
            		
          		</Header>
        		<Content>
        		<FlatList
            		data= {this.createDataNotifs()}
            		renderItem={ ({item}) =>           
              		<List>
              			<ListItem>
                			<Left>
                  				<Text style = {{paddingRight : 0, }} >{item.a}</Text>
                			</Left>
                			<Body style={{flexDirection : 'row', justifyContent: "flex-start"}}>
                				<Text style = {{paddingRight : 5, }} >{item.b}</Text>
                			</Body>
                			<Right>
                				{console.log(item.c)}
                				<Text style = {{paddingRight : 5, }} >{item.c.toString()}</Text>
                			</Right>
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
	}

}
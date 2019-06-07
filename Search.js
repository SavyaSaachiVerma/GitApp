import React, { Component } from 'react';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';
export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    const {changePage, getSearchText} = this.props;
    return (
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" onChangeText={(text) => this.setState({text})}/>
            <Icon name="ios-people" />
            <Button onPress = {() => {
                changePage('5');
                getSearchText(this.state.text);
              }
            }>
              <Text>Search</Text>
            </Button>
          </Item>
        </Header>
    );
  }
}
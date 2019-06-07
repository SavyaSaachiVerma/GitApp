import React, { Component } from 'react';
import { Form, Input, Item,  Label, Container, Header, ListItem, List, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {View, FlatList,  Image, StyleSheet} from 'react-native' 

export default class Login extends Component {
  render() {
    const {header, changePage} = this.props;
    return (
      <Container>
        <Header>
          <Body>
            <View style={{flexDirection: 'row', height: 100, paddingTop : 40}}>
              <Icon name="github" type = "FontAwesome" style={{paddingLeft : 10, paddingRight: 20}}/>
              <Title>{header}</Title>
            </View>
          </Body>
          <Right />
        </Header>
        <Content>
        <Text style = {{fontSize: 30, textAlign: "center", paddingTop: 15, paddingBottom : 15 }}> Welcome to GitApp </Text>
          <Form>
            <Item stackedLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item stackedLabel last>
              <Label>Password</Label>
              <Input />
            </Item>
          </Form>
          <Button onPress={() =>changePage('1')}>
            <Text style={{fontSize:15, width: 410, textAlign: "center" }}>SIGN IN</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
import React, { Component } from 'react'
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.initHeaderHeight = 130
    this.state = {
      headerHeight: this.initHeaderHeight,
      bodyHeight: Dimensions.get('window').height - this.initHeaderHeight * 2,
      footerHeight: this.initHeaderHeight,
    }
  }

  keyExtractor = (item) => item.toString()

  renderHeaderItem = (text) => {
    return (
      <View style={[styles.listHeaderItem, { height: this.state.headerHeight }]}>
        <Text style={styles.headerText}>{text}</Text>
      </View>
    )
  }

  renderItem = ({ item }) => {
    return (
      <View style={styles.listItem}>
        <Text style={styles.bodyText}>{item + 1}</Text>
      </View>
    )
  }

  handleScroll = (event) => {
    const scrollContentOffsetY = event.nativeEvent.contentOffset.y
    const newHeaderHeight = this.initHeaderHeight - scrollContentOffsetY / 6.5
    this.setState({
      headerHeight: newHeaderHeight >= 0 ? newHeaderHeight : 0,
      footerHeight: newHeaderHeight >= 0 ? newHeaderHeight : 0,
    })
  }

  render() {
    const listData = [...Array(100).keys()]
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={listData}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            onScroll={this.handleScroll}
            ListHeaderComponent={() => this.renderHeaderItem('Header')}
            stickyHeaderIndices={[0]}
            bounces={false}
          />
        </View>
        {this.renderHeaderItem('Footer')}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    height: 50,
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderBottomWidth: 1,
  },
  listHeaderItem: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  },
  bodyText: {
    fontSize: 17,
    fontWeight: 'bold',
  }
})

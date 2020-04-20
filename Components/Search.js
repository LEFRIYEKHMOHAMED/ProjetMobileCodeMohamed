import React  from 'react'
import { View,Button,TextInput, StyleSheet,FlatList,Text, ActivityIndicator } from "react-native"
import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from "../API/TMDBApi"

class Search extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            films: [],
            isLoading : false
        }
        this.searchedText = ""
        this.page = 0
        this.totalPage = 0
    }

    _loadFilms(){
        
        if(this.searchedText.length > 0){
            this.setState({isLoading:true})
            getFilmsFromApiWithSearchedText(this.searchedText,this.page+1).then(data => {
                this.page = data.page
                this.totalPage = data.total_pages
                this.setState({
                    films : [...this.state.films,...data.results],
                    isLoading : false
                })
            })
        }
    }

    _displayLoading(){
        if(this.state.isLoading){
            return 
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large'/>
                </View>
        }
    }

    _searchTextInputChanged(text){
        this.searchedText = text
    }

    _searchFilms(){
        this.page = 0;
        this.totalPage = 0;
        this.setState({films: []},() => {this._loadFilms()})
    }

    _displayDetailForFilm = (idFilm) => {
      //console.log("Display film with id " + idFilm)
      this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
    }

  render() {
    

    return (
      <View style={styles.main_container}>
        <TextInput onSubmitEditing={() => this._searchFilms()} onChangeText={(text) => this._searchTextInputChanged(text)} style={styles.textinput} placeholder='Titre du film'/>
        <Button style={styles.button} title='Rechercher' onPress={() => this._searchFilms()}/>
        <FlatList 
            data={this.state.films}
            keyExtractor={(item) => item.id.toString()}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
                if(this.page < this.totalPage){
                    this._loadFilms();
                }
              }}
            renderItem={({item}) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm}/>}
        />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginLeft : 5,
    marginRight : 5
  }
})

export default Search
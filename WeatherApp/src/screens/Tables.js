import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, UIManager, LayoutAnimation, Platform,} from 'react-native';
import { observer, inject, Observer } from "mobx-react";
import CustomModal from '../components/CustomModal';
import CustomInput from '../components/CustomInput';
import { ScrollView } from 'react-native-gesture-handler';
import { isFormValid } from '../utils/CommonFunctions';
import Constants from '../utils/Constants';
@inject('store')
@observer
export default class Tables extends PureComponent {
    
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            tables: [],
            reservedFilter: false,
            showForm: true,
            seatsFilter: [],
            totalSeats : [
                {
                    isSelected : false,
                    seats: 1
                },
                {
                    isSelected : false,
                    seats: 2
                },
                {
                    isSelected : false,
                    seats: 3
                },
                {
                    isSelected : false,
                    seats: 4
                },
            ],
        };
    }

    componentDidMount = () => {
        this.setState({tables: this.props.store.tablesArray});
        if (Platform.OS == 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    onPressTable = (tableIndex) => {
        this.props.store.tablesArray[tableIndex].isUserSelected = !this.props.store.tablesArray[tableIndex].isUserSelected;
        this.setState({tables: Array.from(this.props.store.tablesArray)})
    };

    renderTable = (item, index) => {
        if(item.isReserved){
            return (
                <View style={{justifyContent:'center', alignItems: 'center'}}>
                    <TouchableOpacity
                        disabled 
                        style={[styles.tableView, {backgroundColor: 'grey'}]} 
                        onPress={()=>this.onPressTable(index)}
                    >
                        <Text>{item.tableId}</Text>
                    </TouchableOpacity>
                    <Text>{Constants.STRINGS.NUM_SEATS} - {item.numSeats}</Text>
                </View>
            )
        }
        else{
            return (
                <View style={{justifyContent:'center', alignItems: 'center'}}>
                    <TouchableOpacity 
                        style={[styles.tableView, {backgroundColor: item.isUserSelected ? 'green' : 'white'}]} 
                        onPress={()=>this.onPressTable(index)}
                    >
                        <Text>{item.tableId}</Text>
                    </TouchableOpacity>
                    <Text>{Constants.STRINGS.NUM_SEATS} - {item.numSeats}</Text>
                </View>
            )
        }
    };

    filterSeats = (arr) => {
        return arr.filter((item)=>{
            this.state.seatsFilter.includes(item.numSeats);
        })
    }

    filterData = () => {
        let res = [];
        if(this.state.reservedFilter){
            res = this.state.tables.filter(item => item.isReserved == true);
        }
        else {
            res = this.props.store.tablesArray;
        }
        if(this.state.seatsFilter.length > 0){
            res = res.filter((item)=>{
                return this.state.seatsFilter.includes(item.numSeats);
            });
        }
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({tables: Array.from(res)});
    };

    onSubmitPress = () => {
        if(isFormValid(this.props.store.userForm)){
            this.state.tables.map((item, index)=>{
                let newTables = this.state.tables;
                if(item.isUserSelected){
                    newTables[index].isReserved = true;
                }
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                this.setState({tables: Array.from(newTables)});
            });
        }
        else{
            alert(Constants.STRINGS.FILL_FORM_ALERT);
        }
    }

    renderForm = () => {
        return(
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 16}}>{Constants.STRINGS.RESERVATION_FORM}</Text>
                {this.props.store.userForm.map((item, index)=>{
                    return(
                        <CustomInput 
                            label={item.title}
                            maxLength={item.maxlength}
                            keyboardType={item.keyboardType}
                            handleChangeText={(text)=>{this.props.store.userForm[index].value = text;}}
                        />
                    )
                })}
                <TouchableOpacity style={styles.submitButton}
                    onPress={()=>{
                        this.onSubmitPress();
                    }}
                >
                    <Text>{Constants.STRINGS.BOOK_TABLE} </Text>
                </TouchableOpacity>
            </View>
        )
    };

    renderModalContent = () => {
        return (
            <>
                <View style={{paddingLeft: 20}}>
                    <Text style={{marginTop: 30, fontSize: 14}}>Filter</Text>
                    <View>
                            <TouchableOpacity 
                                style={{alignItems: 'center', flexDirection: 'row', marginVertical: 10}} 
                                onPress={()=>{this.setState({reservedFilter: !this.state.reservedFilter})}}
                            >
                                <View style={{height: 20, width: 20, borderRadius: 20, borderWidth: 1, backgroundColor: this.state.reservedFilter ? 'green' : 'white'}}/>
                                <Text style={{marginLeft: 20}}>{Constants.STRINGS.RESERVED}</Text>
                            </TouchableOpacity>
                    </View>
                </View>
                <View style={{marginLeft: 20}}>
                    <Text>{Constants.STRINGS.NUM_SEATS}</Text>
                    {this.state.totalSeats.map((item, index)=>{
                        return (
                            <TouchableOpacity 
                                style={{alignItems: 'center', flexDirection: 'row', marginVertical: 10}} 
                                onPress={()=>{
                                    let newFilter = this.state.totalSeats;
                                    newFilter[index].isSelected = !item.isSelected; 
                                    this.setState({totalSeats: Array.from(newFilter)});
                                }}
                            >
                                <View style={{height: 20, width: 20, borderRadius: 20, borderWidth: 1, backgroundColor: item.isSelected ? 'green' : 'white'}}/>
                                <Text style={{marginLeft: 20}}>{item.seats}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
                <TouchableOpacity 
                    style={styles.applyFilter}
                    onPress={()=>{
                        this.state.seatsFilter = [];
                        this.state.totalSeats.map((item)=>{
                            if(item.isSelected){
                                this.state.seatsFilter.push(item.seats);
                            }
                        });
                        this.filterData();
                        this.setState({openModal: false});
                    }}
                >
                    <Text style={{color:'white', fontSize: 16}}>{Constants.STRINGS.APPLY_FILTER}</Text>
                </TouchableOpacity> 
            </>
        )
    }
    
    render() {
        const {showForm, tables, openModal} = this.state;
        return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} >
                <FlatList 
                    data={tables} 
                    extraData={tables}
                    numColumns={2} 
                    renderItem={({item, index}) => this.renderTable(item, index)} 
                    keyExtractor={(item, index) => index.toString()}
                />
                {showForm && this.renderForm()}
                <TouchableOpacity style={styles.filterButton} 
                    onPress={()=>{this.setState({openModal: true})}}>
                    <Text>Filter</Text>
                </TouchableOpacity>
                <CustomModal
                    visible={openModal}
                    renderContent={this.renderModalContent()}
                    modalHeight={300}
                    onModalHide={() => {
                        this.setState({ openModal: false });
                    }}
                />
            </ScrollView>
        </SafeAreaView>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        flex:1, 
        justifyContent:'center',
        backgroundColor: 'white',
        alignItems: 'center',
    },
    tableView:{
        justifyContent: 'center', 
        alignItems: 'center', 
        height:80,
        width: 80,
        borderWidth: 1, 
        borderColor: 'black',
        margin: 30
    },
    submitButton: {
        width: 250, 
        height: 40, 
        borderWidth: 0.5, 
        borderRadius: 10, 
        borderColor: 'black', 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    filterButton: {
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center', 
        alignSelf: 'center', 
        marginVertical : 10, 
        height:40, 
        width: 250, 
        borderWidth:0.5, 
        borderRadius: 10
    },
    applyFilter: {
        bottom: 0, 
        position: 'absolute',
        height: 40, 
        width: '100%', 
        backgroundColor: '#55f', 
        justifyContent:'center', 
        alignItems: 'center'
    }
})
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image
} from 'react-native';
import RadioButton from 'react-native-radio-button';
import alphabets from './alphabets.json';
var Sound = require('react-native-sound');
//import TimerMixin from 'react-timer-mixin';

import { Container, Button, Content, Right, Radio } from 'native-base';

const { width, height } = Dimensions.get('window')

export default class EasyAbc extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            alphabets: alphabets,
            currentPosition: 0,
            currentTick: 0,
            random: false,
            Sound: true,
            loader: false
        }

    }


    componentDidMount() {

         this.playSound()
        console.log("componentDidMount")

    }

    // componentWillUnmount() {
    //     clearInterval(this.timer);
    // }
    componentDidUpdate() {
        this.playSound();
       // console.log("componentDidUpdate")
    }

    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    mannualPlaySound() {
        if (this.state.currentTick === 0) {

            var letterSound = new Sound(this.state.alphabets[this.state.currentPosition].letterSound, Sound.MAIN_BUNDLE, (error) => {
                console.log("running......")
                if (error) {
                    //       console.log('failed to load the sound', error);
                } else {

                    var letterTime = letterSound.getCurrentTime((seconds) => console.log('at ' + seconds));
                    letterTime = 0;
                    letterSound.play();

                }
            });
            // console.log(letterSound, "letterSound");
            // console.log(letterSound._duration, "letterSound._duration");
        } else {

            var wordSound = new Sound(this.state.alphabets[this.state.currentPosition].wordSound, Sound.MAIN_BUNDLE, (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                } else {
                    var wordSoundTime = wordSound.getCurrentTime((seconds) => console.log('at ' + seconds));
                    wordSoundTime = 0;
                    wordSound.play();

                }
            });
        }
        //this.playSound()
    }

    playSound() {

        if (this.state.Sound) {
            if (this.state.currentTick === 0) {
                var letterSound = new Sound(this.state.alphabets[this.state.currentPosition].letterSound, Sound.MAIN_BUNDLE, (error) => {
                    if (error) {
                    } else {
                        var letterTime = letterSound.getCurrentTime((seconds) => console.log('at ' + seconds));
                        letterTime = 0;
                        letterSound.play();
                    }
                });

                letterSound._duration = 0;
                letterSound.play();
            } else {
                var wordSound = new Sound(this.state.alphabets[this.state.currentPosition].wordSound, Sound.MAIN_BUNDLE, (error) => {
                    if (error) {
                    } else {
                        var wordSoundTime = wordSound.getCurrentTime((seconds) => console.log('at ' + seconds));
                        wordSoundTime = 0;
                        wordSound.play();
                    }
                });
            }
        }
    }


    next() {
        console.log('next button click');
        if (this.state.random) {
            if (this.state.currentTick < 2) {
                this.setState({ currentTick: this.state.currentTick + 1 })
            } else {
                this.setState({ currentPosition: this.randomNumber(0, 25), currentTick: 0 })
            }
        } else {
            if (this.state.currentPosition === this.state.alphabets.length - 1) {
                if (this.state.currentTick < 2) {
                    this.setState({ currentTick: this.state.currentTick + 1 })
                } else {
                    this.setState({ currentPosition: 0, currentTick: 0 })
                }
            } else {
                if (this.state.currentTick < 2) {
                    this.setState({ currentTick: this.state.currentTick + 1 })
                } else {
                    this.setState({ currentPosition: this.state.currentPosition + 1, currentTick: 0 });
                }
            }
            // this.playSound();
        }
    }

    prev() {
        console.log('prev button click');
        if (this.state.currentPosition > 0) {
            this.setState({ currentPosition: this.state.currentPosition - 1 })
        } else {
            this.setState({ currentPosition: this.state.alphabets.length - 1 })
        }

    }

    switchRandom() {
        this.setState({ random: !this.state.random })
        //console.log("on offf button")
        // this.next();
    }
    switchSound() {
        this.setState({ Sound: !this.state.Sound })
    }

    render() {
        // let that = this;
        // setTimeout(function () { that.setState({ loader: true }) }, 3000);
        let showImage = this.state.currentTick !== 0 ? true : false;
        let showWord = this.state.currentTick === 2 ? true : false;
        // console.log(this.state.currentTick, "currentTick")
        // console.log(showImage, "showImage", showWord, "showWord")
        // console.log(this.state.loader, "this.state.loader")
      
        return (

            <Container style={styles.container}>
              
                {!this.state.loader ?
                    <Content >
                        <View >
                            <View style={styles.containerBox}>
                                <View style={styles.header}>
                                    <Text style={{
                                        fontSize: 30,
                                        fontWeight: 'bold',
                                        fontFamily: 'serif',
                                    }}>
                                        Kidz ABC
                                </Text>
                                </View>


                                <View style={styles.letterContainer}>
                                    <Text
                                        style={{
                                            fontSize: 72,
                                            fontWeight: 'bold',
                                            color: "white"
                                        }}>{this.state.alphabets[this.state.currentPosition].letter}</Text>
                                </View>


                                <View style={styles.Top}>
                                    <Text style={{
                                        fontSize: 15,
                                        fontWeight: 'bold',
                                    }}>
                                        Random latter  </Text>
                                    <RadioButton
                                        animation={'bounceIn'}
                                        isSelected={this.state.random}
                                        onPress={this.switchRandom.bind(this)}
                                    />
                                    <Text
                                        style={{
                                            fontSize: 15,
                                            fontWeight: 'bold',
                                        }}>   Sound  </Text>
                                    <RadioButton
                                        animation={'bounceIn'}
                                        isSelected={this.state.Sound}
                                        onPress={this.switchSound.bind(this)}
                                    />
                                </View>

                                <View style={styles.bottomContainer}>

                                    <View style={styles.bottomContainerTextStyle} >
                                        {!showImage ? <Text style={{ textAlign: "center" }}>Press next to view {"\n"} image</Text> :

                                            <Image
                                                style={{
                                                    width: 100, height: 100, flex: 1,
                                                    resizeMode: 'contain',

                                                }}
                                                source={{ uri: this.state.alphabets[this.state.currentPosition].image }}
                                            />}
                                    </View>
                                    <View>
                                        <Text>   </Text>
                                    </View>
                                    <View style={styles.bottomContainerTextStyle}>
                                        {!showWord ? <Text style={{ textAlign: "center", color: "white" }}>
                                            Press next to view {"\n"} spelling
                                    </Text> :
                                            <Text style={{
                                                fontSize: 30,
                                                fontWeight: 'bold',
                                                color: "white"
                                            }} >{this.state.alphabets[this.state.currentPosition].word.toUpperCase()}</Text>

                                        }


                                    </View>
                                    
                                </View>


                                <View style={styles.center}>
                                    <View>
                                        <Button success onPress={this.prev.bind(this)}><Text style={{ color: "white" }} >    Previous    </Text></Button>
                                    </View>
                                    <View>
                                        <Text>            </Text>
                                    </View>
                                    <View>
                                        <Button style={{ backgroundColor: "#00a7f7", }} onPress={this.next.bind(this)}><Text style={{ color: "white" }}>        Next        </Text></Button>
                                    </View>
                                </View>


                                <View style={styles.bottomButton}>
                                    <Button style={{ backgroundColor: "#2fcaaa", borderRadius: 2 }} full onPress={() => this.mannualPlaySound()}><Text style={{ color: "white" }}> Play Sound </Text></Button>
                                </View>
                            </View>
                        </View>
                    </Content> : <Content >
                        <View style={{
                            marginTop: height / 2.5,
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}>
                            <Text style={{ fontSize: 50, color: "white", }}>Kidz App</Text>
                        </View>
                    </Content>}

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ec1561',
    },
    header: {
        justifyContent: 'center',
        alignItems: "center",

    },
    containerBox: {
        marginTop: 4
    },
    Top: {
        // borderWidth: 4,
        // borderColor: "black",
        width: width - 10,
        height: height / 8,
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'row',

    },
    letterContainer: {
        // textAlign: "center",
        backgroundColor: "#f9bad0",
        width: width - 10,
        height: height / 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 4,
    },
    bottomContainer: {
        //  textAlign: "center",
        backgroundColor: "#f9bad0",
        width: width - 10,
        height: height / 4,
        marginTop: 0,
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'row',
        borderRadius: 4,
    },
    bottomContainerTextStyle: {
        //  borderWidth: 4,
        //  borderColor: "black",
        width: 160,
        height: 100,
        justifyContent: 'center',
        alignItems: "center",
    },
    center: {
        marginTop: 0,
        // borderWidth: 4,
        // borderColor: "black",
        width: width - 10,
        height: height / 8,
        justifyContent: 'center',
        alignItems: "center",
        flexDirection: 'row',
    },
    bottomButton: {
        marginTop: 8
    }
});

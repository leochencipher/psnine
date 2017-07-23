import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableNativeFeedback
} from 'react-native'

let screen = Dimensions.get('window')
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = screen

export default class PhotoItem extends React.PureComponent {

  constructor(props) {
    super(props)

    this.state = {
      modalVisible: false
    }
  }

  shouldComponentUpdate = (props, state) => {
    if (props.modeInfo.themeName !== this.props.modeInfo.themeName) return true
    if (this.state.modalVisible !== state.modalVisible) return true
    if (props.isChecked !== this.props.isChecked) return true
    return false
  }

  render() {
    const { modeInfo, rowData, index, onLongPress, navigation,
      isChecked = false, onPress, width = 150, ITEM_HEIGHT } = this.props
    // console.log(ITEM_HEIGHT)
    return (
      <View key={rowData.id || index} style={{
        alignSelf: 'flex-start',
        alignContent: 'flex-end',
        backgroundColor: modeInfo.backgroundColor,
        width: SCREEN_WIDTH / 2,
        height: SCREEN_WIDTH / 2
      }}>
        <TouchableNativeFeedback
          onPress={
            () => {
              onPress && onPress()
            }
          }
          onLongPress={() => {
            onLongPress && this.setState({
              modalVisible: true
            })
          }}
          useForeground={true}

          background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
        >
          <View style={{ flex: 1, flexDirection: 'row', padding: 5,
          backgroundColor: isChecked ? modeInfo.standardColor : modeInfo.backgroundColor }}>
            {
              this.state.modalVisible && onLongPress && (
                <MyDialog modeInfo={modeInfo}
                  modalVisible={this.state.modalVisible}
                  onDismiss={() => { this.setState({ modalVisible: false }) }}
                  onRequestClose={() => { this.setState({ modalVisible: false }) }}
                  renderContent={() => (
                    <View style={{
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      backgroundColor: modeInfo.backgroundColor,
                      position: 'absolute',
                      left: 30,
                      right: 30,
                      paddingVertical: 15,
                      elevation: 4,
                      opacity: 1
                    }} borderRadius={2}>
                      <TouchableNativeFeedback onPress={() => {
                          this.setState({
                            modalVisible: false
                          }, () => {
                            /*console.log(rowData.node.image.uri)*/
                            requestAnimationFrame(() => {
                              this.props.navigation.navigate('ImageViewer', {
                                images: [
                                  {
                                    url: rowData.node.image.uri,
                                    uri: rowData.node.image.uri,
                                    width: rowData.node.image.width,
                                    height: rowData.node.image.height
                                  }
                                ]
                              })
                            })
                          })
                        }}>
                        <View style={{height: 50, paddingVertical: 10, paddingLeft: 20 , alignSelf: 'stretch', alignContent: 'stretch', justifyContent: 'center'}}>
                          <Text style={{textAlignVertical: 'center', fontSize: 18, color: modeInfo.standardTextColor}}>查看图片</Text>
                        </View>
                      </TouchableNativeFeedback>
                    </View>
                  )} />
              )
            }
            <Image
              source={{ uri: rowData.node.image.uri || rowData.href }}
              resizeMethod={'scale'}
              style={[styles.avatar, { width: SCREEN_WIDTH / 2 - 10, height: SCREEN_WIDTH / 2 - 10 }]}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50
  }
})
import { SafeAreaView, 
    ScrollView,
     StyleSheet, 
     Text, 
     View,
      Alert,
FlatList,
Pressable,
Modal, 
TextInput,} from 'react-native'
import React , {useState, useEffect, useCallback} from 'react'

const Edit = (props) => {
    const [showModal, setShowModal]= useState(false);
    const [isTitle, setIsTitle] = useState(props.item_edit.title);
    const [isContent, setIsContent] = useState(props.item_edit.content);


    const Edit = () => {
        let objNote={
  
          title: isTitle, content: isContent
      };
      let url_api='https://64649a7e127ad0b8f8a2dcac.mockapi.io/88/Note/'+ props.item_edit.id;
      fetch(url_api, {
          method: 'put',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(objNote)
          
        })
        .then((res=>{
          if(res.status==200)
          alert("sửa thành công");
          props.getListEdit();
          setShowModal(false);
      })
      
      
      )
      .catch((ex)=>{
          console.log(ex);
      })
      }

    return (

        //modal
        <SafeAreaView>
        <Modal visible={showModal}
          transparent={true}
          animationType='fade'
          onRequestClose={
            () => {
              setShowModal(false);
            }
          }>
            <View style={styles.khung_modal}>
              <View style={styles.box3}>
                <Text style={styles.text_Modal}>- Tiêu đề</Text>
                <TextInput placeholder="Mời nhập tiêu đề" style={styles.textInput_Modal} onChangeText={(txt) => { setIsTitle(txt) }} value={isTitle}/>
                <Text style={styles.text_Modal}>- Nội Dung</Text>
                <TextInput placeholder="Mời nhập nội dung" style={styles.textInput_Modal} onChangeText={(txt) => { setIsContent(txt) }} value={isContent}/>
              </View>
              <View style={styles.box4}>
                <Pressable style={styles.button_Modal}>
                  <Text style={styles.textButton_Modal} onPress={Edit} >
                    Sửa
                  </Text>
                </Pressable>
                <Pressable style={styles.button_Modal}>
                  <Text style={styles.textButton_Modal} onPress={() => { setShowModal(false); }}>
                    Đóng
                  </Text>
                </Pressable>
              </View>
            </View>
         
 </Modal>
        {/*  */}
        <Pressable style={{ width: 40, height: 30, borderRadius: 12, backgroundColor: "#EDF1D6", marginTop:8}}>
                <Text style={{ textAlign: 'center', margin: 4 }} onPress={() => {setShowModal(true);}}>Sửa</Text>
              </Pressable>

              </SafeAreaView>
    )
}

export default Edit

const styles = StyleSheet.create({
    khung_modal: {
        alignSelf: "center",
        backgroundColor: "#8EA7E9",
        width: 277,
        height: 244,
        margin: 40,
        borderRadius: 22,
    
      },
      box3: {
        margin: 20,
      },
    text_Modal: {
        margin: 4,
        fontWeight: "bold",
      },
      textInput_Modal: {
        width: 222,
        height: 44,
        margin: 4,
        borderRadius: 8,
        borderColor: "#F2DEBA",
        borderWidth: 1,
      },
      box4: {
        flexDirection: "row",
        marginLeft: 60,
      },
      button_Modal: {
        width: 60,
        height: 33,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#8BF5FA",
        backgroundColor: "#8BF5FA",
        margin: 4,
      },
      textButton_Modal: {
        fontWeight: "bold",
        margin: 4,
        textAlign: "center",
      },

})
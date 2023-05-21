import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  RefreshControl,
  ActivityIndicator,
  FlatList,
  Pressable,
  Modal,
  TextInput,
} from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import Edit from './Edit';

//moment (time)
import moment from 'moment';

const List = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReloading, setIsReloading] = useState(true);

  //
  const [isTitle, setIsTitle] = useState('');
  const [isTime, setIsTime] = useState(0);
  const [isContent, setIsContent] = useState('');


  //modal
  const [showModalDialog, setshowModalDialog] = useState(false);

  // moment
  const [currentTime, setCurrentTime] = useState('');


  var time = moment().format('D M YYYY, h:mm:ss a');

  //getList
  const getListNote = async () => {

    const api_list_note = 'https://64649a7e127ad0b8f8a2dcac.mockapi.io/88/Note';

    //time


    fetch(api_list_note)
      .then((res) => res.json())
      .then((resJson) => {
        setIsReloading(false);
        setData(resJson)
      }).catch((error) => {
        console.log("Error: " + error);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    getListNote();
    setCurrentTime(time);
  }, [])


  const reloadData = useCallback(
    () => {
      //hiển trị trạng thái reloading
      setIsReloading(true);
      //load lại list
      getListNote();
      setTimeout(() => {
        setIsReloading(false);
      }, 2222)
    }
  )

  //save data
  const SaveData = () => {
    if (isTitle.length == 0) {
      Alert.alert("Bạn chưa nhập tiêu đề");
      return;
    }
    else if (isContent.length == 0) {
      Alert.alert("Bạn chưa nhập nội dung");
      return;
    }

    let objNote = {
      title: isTitle, content: isContent, time: currentTime
    }
    let url_api_note ='https://64649a7e127ad0b8f8a2dcac.mockapi.io/88/Note';
    fetch(url_api_note, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objNote)

    })
      .then((res => {
        if (res.status == 201)
          alert("thêm sản phẩm thành công");
        getListNote();
        setshowModalDialog(false);
        //

      })
      )
      .catch((ex) => {
        console.log(ex);
      })

  }





  //render
  const renderItem = ({ item, index }) => {
    const deleteSP = () => {
      // link xóa
      let url_api_del = 'https://64649a7e127ad0b8f8a2dcac.mockapi.io/88/Note/' + item.id;

      fetch(url_api_del, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      })
        .then((res) => {
          if (res.status == 200) {
            alert("Đã xóa " + item.content);
            getListNote();
          }

        })
        .catch((ex) => {
          console.log(ex);
        });

    }

    const showDialog = () => {
      Alert.alert(
        'Thông báo',
        'Bạn có muốn xóa ' + item.title + " ?",
        [
          //mảng nút bấm
          {
            text: 'Ok',
            onPress: () => { deleteSP(); },
            style: 'destructive'
          },
          {
            text: 'Cancel',
            onPress: () => { console.log('Đã chọn Cancel'); },
            style: 'cancel'
          },
        ],
        {
          cancelable: true,
          onDismiss: () => {/*xử lý sự kiện khi Dialog mất*/ }
        }
      )
    }

    return (
      <View>
        <View style={styles.box1}>

          <View style={{ flexDirection: 'column', position:'absolute', right:18, marginTop:26 }}>
              <Pressable style={{ width: 40, height: 30, borderRadius: 12, backgroundColor: "#EDF1D6",}}>
                <Text style={{ textAlign: 'center', margin: 4 }} onPress={showDialog}>Xóa</Text>
              </Pressable>

              {/* sửa */}
              <Edit item_edit={item} getListEdit={getListNote} />
            
          </View>
        

            <Text style={{fontSize:22, top:0, right:"-50%"}}>{item.title}</Text>
            <Text style={{marginTop:60, position:'absolute'}}>Nội Dung : {item.content}</Text>
            <Text style={{position:'absolute', bottom:0, right:8}}>{item.time}</Text>

        </View>
        {/* modal chi tiết xe */}
      </View>
    )
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', marginLeft: 140, marginTop: 66 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', color: 'black' }}>Ghi Chú</Text>

        < Pressable style={styles.button_them}>
          <Text style={styles.text_button} onPress={() => {
            setshowModalDialog(true);
          }}>Thêm</Text>
        </Pressable>
      </View>
      <Modal visible={showModalDialog}
        transparent={true}
        animationType='fade'
        onRequestClose={
          () => {
            setshowModalDialog(false);
          }
        }>
        <View style={styles.khung_modal}>
          <View style={styles.box3}>
            <Text style={styles.text_Modal}>- Tiêu Đề</Text>
            <TextInput placeholder="Mời nhập tiêu đề" style={styles.textInput_Modal} onChangeText={(txt) => { setIsTitle(txt) }}/>
            <Text style={styles.text_Modal}>- Nội Dung</Text>
            <TextInput placeholder="Mời nhập nội dung" style={styles.textInput_Modal} onChangeText={(txt) => { setIsContent(txt) }}/>
            <Text style={styles.text_Modal}>- Thời gian</Text>
            <TextInput  style={styles.textInput_Modal} onChangeText={(txt) => { setCurrentTime(txt) }}  value={time}/>
          </View>
          <View style={styles.box4}>
            <Pressable style={styles.button_Modal}>
              <Text style={styles.textButton_Modal} onPress={SaveData} >
                Thêm
              </Text>
            </Pressable>
            <Pressable style={styles.button_Modal}>
              <Text style={styles.textButton_Modal} onPress={() => { setshowModalDialog(false); }}>
                Đóng
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <ScrollView
        nestedScrollEnabled={true}
        style={{ width: "100%", height: "100%" }}
        refreshControl={
          <RefreshControl refreshing={isReloading} onRefresh={reloadData} />
        }>
        {
          isLoading ? <ActivityIndicator /> : (
            <FlatList style={{ marginTop: 60, flex: 1 }}
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => { return (item.id) }}
            />
          )
        }
      </ScrollView>

    </SafeAreaView>
  )
}

export default List

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#A86464',
    flex: 1,
  },
  box1: {
    width: 333,
    height: 222,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 12,
    alignSelf: 'center',
    margin: 8,
    backgroundColor: "#B3E5BE",
    borderColor: '#B3E5BE'
  },
  button_them: {
    width: 60,
    height: 30,
    borderWidth: 1,
    borderRadius: 18,
    borderColor: "#C1AEFC",
    backgroundColor: "#C1AEFC",
    marginLeft: 40,
  },
  text_button: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    margin: 4,
  },
  khung_modal: {
    alignSelf: "center",
    backgroundColor: "#8EA7E9",
    width: 277,
    height: 300,
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
    marginBottom: 12
  },
  box4: {
    flexDirection: "row",
    marginLeft: 70,
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
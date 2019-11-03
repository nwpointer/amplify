import React, { useState, useRef } from 'react';
import Amplify from 'aws-amplify';
import config from "../aws-exports";
import { View, Text, StyleSheet, TouchableWithoutFeedback, TextInput, Platform, ScrollView, Animated, FlatList, TouchableOpacity, LayoutAnimation } from 'react-native';
import { Icon } from 'react-native-elements'
import Collapsible from 'react-native-collapsible';
import { groupBy, chain, toPairs } from 'lodash';

Amplify.configure({
  ...config
});

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const grey1 = '#E8E8E8'
const grey2 = '#C4C4C4'
const blue1 = '#54baf5'
const b1 = { borderWidth: 1, borderRadius: 3, borderColor: grey2 }
const bb1 = { borderWidth: 1, borderRadius: 3, borderColor: blue1 }
const p1 = {paddingTop:6, paddingBottom:6, paddingLeft:6, paddingRight:6}
const p2 = {paddingTop:12, paddingBottom:12, paddingLeft:12, paddingRight:12}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignContent: 'flex-start',
    //   alignItems: 'flex-start',
    },
    child: {
        margin: 1,
        alignItems: 'flex-start',
        ...b1,
    },
    childActive: {
        margin: 1,
        alignItems: 'flex-start',
        ...bb1,
    }
  });



  
const Row = (props) => (
    <View style={{flexDirection:'row', justifyContent:'center', alignItems: 'center', ...props.style}}>
        {props.children}
    </View>
)

const Tag = props => (
    <View style={{ margin: 1, backgroundColor: grey1, height: 33, ...b1, ...p1 }}>
        <Row>
        <Text style={{color:'#5D5D5D', marginRight:8, fontWeight: 'bold'}}>{props.label}</Text>
        <TouchableWithoutFeedback onPress={()=>props.onPress(props)}>
          <Icon color='#A2A2A2' name='close' size={17}/>
        </TouchableWithoutFeedback>
        </Row>
    </View>
)



const Category = onSelect => ({item}) => {
  return (
    <Row style={{minHeight: 16, alignItems:'stretch'}}>
        <View style={{backgroundColor:'#F3F4F5', minWidth:98, borderColor: '#DEDEDF', borderTopWidth: 1, borderRightWidth: 1}}>
          <Text style={{margin:8, opacity:0.7}}>{item[0]}</Text>
        </View>
        <View style={{ flex:1 }}>
          {item[1].map((item, i)=>(
            <TouchableWithoutFeedback onPress={()=>onSelect(item)} key={i}>
              <View>
                <Text style={{padding:8, borderTopColor: '#DEDEDF', borderTopWidth: 1}}>{item.title}</Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </Row>
  )
}

function List({item}) {
  return (
    <Text style={{padding:8, borderTopColor: '#DEDEDF', borderTopWidth: 1}}>{item.title}</Text>
  )
}


const Drawer = props =>{
    const [height] = useState(new Animated.Value(0))
    // should be able to optionally show catagories
    React.useEffect(() => {        
      Animated.timing(
        height,
        {
          toValue: props.active ? props.data.length * 34 : 0,
          duration: 100,
        }
      ).start();
    }, [props.active, props.data])

    if(props.data.length === 0 && props.term.length > 0){
      return (
        <View style={{backgroundColor:'#F3F4F5', width:'100%', borderColor: '#DEDEDF', borderTopWidth: 1, borderRightWidth: 1, ...props.style}}>
          <Text style={{margin:8, opacity:0.7, width:'100%'}}>
            Nothing else found for '{props.term}'
          </Text>
        </View>
      )
    }

    if(props.catagories){
      return (
        <AnimatedFlatList 
          style={{ height, width:'100%', ...props.style}}
          data={toPairs(groupBy(props.data, 'category'))}
          renderItem={Category(props.onSelect)}
          keyExtractor={item => item.id}
          keyboardShouldPersistTaps="always"
        />
      )
    } 
    else {
      return (
        <AnimatedFlatList 
          style={{ height, width:'100%', ...props.style}}
          data={props.data}
          renderItem={List}
          keyExtractor={item => item.id}
          keyboardShouldPersistTaps="always"
        />
      )
    }
}

const data = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Edition',
    category: 'Pathfinder'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Edition',
    n: [1,2],
    category: 'Pathfinder'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'First Edition',
    category: 'D&D'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Second Edition',
    category: 'D&D'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Edition',
    category: 'D&D'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Fourth Edition',
    category: 'D&D'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Fith Edition',
    category: 'D&D'
  },
];

export default function MultiSelect() {
    const [active, setActive] = useState(false);
    const [term, setTerm] = useState("");
    const [values, setValues] = useState([]);
    const [width, setWidth] = useState();
    const child = useRef();
    /*

      should not loose focus when click on tag
      make touch zone for tag bigger

    */
    function filter(data){
      return data.filter(({title}) => title.includes(term))
        .filter(({title}) => !values.includes(title))
    }
    function select(item){
      setActive(true)
      setValues([...values, item.title])
    }
    function deselect(item){
      setValues(values.filter(value=>value !== item.label))
    }
    function keyPress(event){
      if(event.key === 'Backspace' && term === ''){
        values.pop()
        setValues([...values])
      }
    }
    function updateLayout({nativeEvent}){
      if(width !== nativeEvent.layout.width){
        setWidth(nativeEvent.layout.width)
      }
    }
    function calcMin(){
      return Math.min(10*term.length+20, width-30)
    }
    return (
      <TouchableWithoutFeedback onFocus={()=> setActive(false)} style={{position:'absolute'}}>
        <View ref={root} style={styles.container} onLayout={updateLayout} >
          <TouchableWithoutFeedback onFocus={(e)=> {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            setActive(true)
          }}>
            <View style={active ? styles.childActive : styles.child} ref={child}>
                <Row style={{ flexWrap: 'wrap', width:'100%', padding:3, minHeight:41, justifyContent:'flex-start'}}>
                    {
                      values.map((value, i)=>(<Tag key={i} label={value} onPress={deselect} />))
                    }
                    <TextInput
                        style={{
                          ...p2, flex:1, minWidth: calcMin(), height: 33, 
                          ...(Platform.OS === 'web' ? {outline:'none'} : {}),
                          ...(active ? {opacity:1} : {opacity:0})
                        }}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder={values.length ? "" : "select one or more:"}
                        placeholderTextColor="grey"
                        value={term}
                        onKeyPress={keyPress}
                        onChangeText={setTerm}
                    />
                </Row>
                <Drawer active={active} data={filter(data)} term={term} catagories={true} onSelect={select} />
            </View>  
            </TouchableWithoutFeedback>
          </View>
      </TouchableWithoutFeedback>
    )
}
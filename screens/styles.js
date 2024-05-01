import { icon } from '@fortawesome/fontawesome-svg-core';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    marginLeft:20,
    marginTop:50,
    // marginTop:500,
    // backgroundColor: '#1a1a1a', // Background color
  },
  count: {
    padding: 4,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#333',
    borderRadius: 4,
    marginBottom: 20,
  },
  inputContainer: {
    flex:1,
    width: 300,
    marginBottom: 20,
  },
  input: {
    backgroundColor:'white',
    // padding: 8,
    // height: 40,
    borderRadius: 4,
    // borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
  },
  tickicon:
  {
    padding: 8,
    paddingRight: 0,
    height: 40,
    borderRadius: 4,
    // borderWidth: 1,
    // borderColor: '#ccc',
    // marginBottom: 15,
  },
  inputqty: {
    flex: 4,
    padding: 8,
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
  },
  inputitem: {
    marginLeft:10,
    flex: 1,
    width:80,
    // padding: 8,
    // height: 40,
    borderRadius: 4,
    // borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
  },
  submitButton: {
    height: 40,
    fontSize: 16,
    color: '#fff',
    backgroundColor: '#0971f1',
    borderRadius: 4,
    textAlign: 'center',
    lineHeight: 40,
  },
  saleButton: {
    flex:4,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    height:41,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    // backgroundColor: 'black', // Customize the background color
  },
  qtyButtonIos:{
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'grey', // Customize the text color
  },
  scrollView:{
    flex:1
  },
  homeContainer:{

    flex: 1,
    
    // alignItems: 'center',
    // justifyContent: 'center',
    // paddingTop:50,
  },
  homeCardContainer:{
    // borderWidth:1,
    width:'100%',
  },
  homecarditem:
  {
    // borderWidth:1,
    margin:4,
  },
  cardBox:{
    margin:10
  },
  img:{
    padding:5,
    margin:5,
  },
  errorText: {
    marginTop: 8,
    color: '#ff9900',
  },
  select:{
    borderWidth:1,
    marginTop:4,
    marginBottom:4,
    paddingTop:4,
    paddingBottom:4,
    borderRadius:6,
    borderColor: '#ccc',
    zIndex:1,

    // color: #252F40,
          // display: 'inline-block',
          // fontSize: 12,
          // fontStyle: 'italic',
          // marginTop: '1em',
          
  },
  selectItems:{
   padding:1, 
   paddingLeft:10,
   fontSize: 17,

  },
  testborder:{
    flexDirection:'row'   
    // borderWidth:1,
    // padding:4
  },
  fullWidthInput: {
    flex: 1, // Take up full width
  },
  selectInput:{
    // padding: 8,
    flex:1,
    
    // height: 40,
    borderRadius: 4,
    // borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    zIndex:1,
  },
  clrbutton:{
    marginRight:0,
    padding: 8,
    paddingRight: 0,
    height: 40,
    borderRadius: 4,
    alignItems:'center'
  },
  test:{
    borderWidth:1
  }
}); 

export default styles;

import { icon } from '@fortawesome/fontawesome-svg-core';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: 300,
    marginBottom: 20,
  },
  input: {
    padding: 8,
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
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
    padding: 8,
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
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
  errorText: {
    marginTop: 8,
    color: '#ff9900',
  },
});

export default styles;

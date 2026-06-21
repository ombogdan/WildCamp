import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  modalMainContainer: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#CFCFCF66' // або повністю прозорий: 'transparent'
  },
  container: {
    width: "90%",
    minHeight: 200,
    alignItems: "center",
    backgroundColor: '#FCFCFF',
    borderRadius: 20
  },
  title: {
    marginTop: 32,
    color: '#1D3252',
    fontFamily: 'Onest',
    fontSize: 20,
    fontWeight: '600',
  },
  subtitle: {
    marginTop: 8,
    color: '#1D3252',
    fontFamily: 'Onest',
    fontSize: 16,
    fontWeight: '400',
    paddingHorizontal: 24,
    textAlign: 'center',
  },
  error: {
    marginTop: 10,
    color: '#1D3252',
    fontFamily: 'Onest',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'left',
    width: '100%',
    paddingHorizontal: 24
  }
});

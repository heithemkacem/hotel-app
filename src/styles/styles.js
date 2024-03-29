import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  //Slider
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    top: 70,
  },

  containerOnBoarding: {
    flex: 1,
    backgroundColor: "#E1251B",
    padding: 10,
  },

  titleStyle: {
    padding: 10,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  introTitleStyle: {
    marginTop: 30,
    fontSize: 25,
    color: "white",
    textAlign: "left",
    marginBottom: 16,
    fontWeight: "bold",
    paddingLeft: 5,
    paddingRight: 5,
  },
  introTitleStyleAr: {
    marginTop: 30,
    fontSize: 25,
    color: "white",
    textAlign: "right",
    marginBottom: 16,
    fontWeight: "bold",
    paddingLeft: 5,
    paddingRight: 30,
  },
  introImageStyle: {
    marginTop: 30,
    width: 150,
    height: 150,
    //border raduis circle
    borderRadius: 150 / 2,
    //align the image in the center
    alignSelf: "center",
  },
  introTextStyle: {
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 18,
    color: "white",
    textAlign: "left",
    paddingTop: 30,
    lineHeight: 24,
  },
  introTextStyleAr: {
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 30,
    fontSize: 18,
    color: "white",
    textAlign: "right",
    paddingTop: 30,
    lineHeight: 24,
  },
  //RootStack
  containerRootStack: {
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 120,
  },
  //Card
  title: {
    color: "#444",
    fontWeight: "600",
  },
  text: {
    fontSize: 12,
    color: "#000",
    marginLeft: 25,
    fontWeight: "600",
  },
  selectedText: {
    marginLeft: 25,
    fontSize: 12,
    fontWeight: "600",
    color: "#E1251B",
  },
  //TextInputs
  textInput: {
    backgroundColor: "#f6f6f8",
    top: 10,
    height: 60,
    borderRadius: 30,
    padding: 20,
    fontSize: 15,
  },
  button: {
    backgroundColor: "#0872c3",
    borderRadius: 30,
    width: "90%",
    marginLeft: 20,
    height: 60,
    padding: 10,
  },
  textButton: {
    textTransform: "none",
    color: "white",
  },
  //Settings
  textStyleSettings: {
    color: "#E1251B",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 27,
    marginRight: 27,
    paddingTop: 30,
  },

  buttonSettings: {
    backgroundColor: "#E1251B",
    borderRadius: 30,
    width: "90%",
    marginLeft: 20,
    height: 60,
    padding: 10,
    top: 10,
    marginTop: 16,
  },
  textButtonSettings: {
    textTransform: "none",
    color: "white",
    fontSize: 16,
  },
  textButtonNavigateSettings: {
    textTransform: "none",
    color: "#000000",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 27,
    marginRight: 27,
    paddingTop: 15,
  },
  buttonNavigateSettings: {
    backgroundColor: "#fff",
    borderRadius: 30,
    width: "90%",
    marginLeft: 20,
    height: 60,
    padding: 10,
    top: 10,
    marginTop: 16,
  },
  //Dashboards
  gridView: {
    marginTop: 10,
    flex: 1,
  },

  itemContainer: {
    justifyContent: "center",
    borderRadius: 5,
    height: 180,
    backgroundColor: "#fff",
    boxShadow:
      "rgb(0 0 0 / 10%) 0px 0px 5px 0px, rgb(0 0 0 / 10%) 0px 0px 1px 0px",
  },
  itemName: {
    fontSize: 13,
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },

  //HotelsPage
  Loading: {
    flex: 1,
    justifyContent: "center",
  },
  titleHotels: {
    color: "#000",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
    paddingTop: 20,
    marginEnd: 10,
  },
  lastCardView: {
    flex: 1,
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 10,
    borderRadius: 20,
    padding: 35,
    marginBottom: "25%",
  },
  cardView: {
    flex: 1,
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    margin: 10,
    borderRadius: 20,
    padding: 35,
  },
  TextHotels: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  DescriptionTextHotels: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 15,
  },
});

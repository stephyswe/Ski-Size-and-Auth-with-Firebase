import React from "react";
import { withStyles } from "material-ui/styles";
import TextField from "material-ui/TextField";
import { Text } from "react-native-web";
import Radio, { RadioGroup } from "material-ui/Radio";
import { FormControlLabel } from "material-ui/Form";

const styles = {
  containerStyle: {
    AlignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    paddingTop: 180
  },
  textStyle: {
    color: "#000",
    fontSize: 180,
    width: "80%"
  },
  labelStyle: {
    fontFamily: "Indie Flower",
    fontSize: 28,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 20
  },
  totalText: {
    fontFamily: "Gamja Flower",
    fontSize: 28,
    paddingLeft: 20,
    paddingRight: 20
  },
  totalScore: {
    fontFamily: "Gamja Flower",
    fontSize: 38,
    fontWeight: "600",
    paddingLeft: 20,
    paddingRight: 20
  },
  radioStyle: {
    flexDirection: "column",
    display: "block"
  }
};

class Skiduthyrning extends React.Component {
  state = {
    length: "",
    age: "",
    skietype: ""
  };

  handleChange = event => {
    const target = event.target;
    this.setState({
      [target.name]: parseInt(target.value, 10)
    });
  };

  handleSkieTypeChange = event => {
    this.setState({ skietype: event.target.value });
  };

  render() {
    const { classes } = this.props;

    // RÃ¤knar ut hur mÃ¥nga cm att addera
    // till skidlÃ¤ngden beroende pÃ¥ Ã¥ldern
    // Exempel: 5Ã¥r - returnerar 10cm
    // 6Ã¥r - returnerar 15 cm, 7 och 8 returnerar 20cm.
    const ageToLength = age => {
      switch (age) {
        case 5:
          return 10;
        case 6:
          return 15;
        case 7:
          return 20;
        case 8:
          return 20;
        default:
          return 0;
      }
    };

    // FÃ¶r Ã¤ldre skidÃ¥kare ( Ã¶ver 9 Ã¥r )
    // Adderar extra lÃ¤ngd beroende pÃ¥ Skidtyp & Ã¥lder
    const skieTypeToLength = (skieType, age) => {
      if (skieType === "freestyle" && age > 18) return 15;
      if (skieType === "freestyle" && age > 8) return 10;
      if (skieType === "classic" && age > 8) return 20;
      // FÃ¶r Ã¥lder under 9 Ã¥r lÃ¤gg inte till extra lÃ¤ngd
      return 0;
    };

    const totalLength = () => {
      const { length, age, skietype } = this.state;
      const totalLength =
        length + ageToLength(age) + skieTypeToLength(skietype, age);

      // Rekommendera Fristil som skidtyp om lÃ¤ngden Ã¤r Ã¶ver 207 eller under 188.
      // implement freestyle warning when length is above 207  or under 188
      if (totalLength > 207 && length && age && skietype === "classic")
        return "VÃ¤lj Fristil";

      //if length and age are specified, and skietype is selected or age is below 9.
      // we will show a total length. else we will not calculate it since we need more information.
      if (length && age && (skietype || age < 9)) return totalLength + "cm";

      //if we don't meet the conditions, just return null
      return null;
    };

    return (
      <form style={styles.containerStyle} noValidate autoComplete="off">
        <h3>HITTA DIN SKIDLÄNGD</h3>
        <TextField
          style={styles.textStyle}
          name="length"
          id="with-placeholder"
          label="Type Length"
          placeholder="130"
          className={classes.textField}
          margin="normal"
          value={this.state.length || ""}
          onChange={this.handleChange}
        />
        <TextField
          style={styles.textStyle}
          name="age"
          id="with-placeholder"
          label="Type Age"
          placeholder="Type in numbers (eg. 8)"
          className={classes.textField}
          margin="normal"
          value={this.state.age || ""}
          onChange={this.handleChange}
        />
        {this.state.age > 8 && (
          <RadioGroup
            style={styles.radioStyle}
            name="skiestype"
            className={classes.group}
            value={this.state.skietype}
            onChange={this.handleSkieTypeChange}
          >
            <FormControlLabel
              value="classic"
              control={<Radio color="primary" />}
              label="Classic"
            />
            <FormControlLabel
              value="freestyle"
              control={<Radio />}
              label="Freestyle"
            />
          </RadioGroup>
        )}
        <br />
        <Text style={styles.totalText}>Rekommenderad Skidlängd:</Text>
        <br />
        <Text style={styles.totalScore}>{totalLength()}</Text>
      </form>
    );
  }
}

export default withStyles(styles)(Skiduthyrning);

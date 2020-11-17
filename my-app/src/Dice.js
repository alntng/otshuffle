import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core/";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import styles from "styled-components";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
}));

export default function Dice() {
  const [input, setInput] = useState("");
  const [randomTask, setRandomTask] = useState("");
  const [actions, setActions] = useState([]);

  const changeInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    if (actions.includes(input)) {
      alert("This is already in your list");
      return;
    }

    setActions((actions) => [...actions, input]);
    setInput("");
  };

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function chooseRandom() {
    if (actions.length === 0) alert("No tasks to choose from :(");
    const randomIndex = getRandomInt(0, actions.length - 1);

    setRandomTask(actions[randomIndex]);
  }

  function deleteTask(deleteIdx) {
    console.log(deleteIdx);
    setActions((arr) => arr.filter((action, i) => i !== deleteIdx));
  }

  return (
    <div>
      <div className="container">
        <div>
          <TextField
            id="standard-full-width"
            style={{ margin: 8 }}
            placeholder="Add a new action"
            margin="normal"
            onChange={changeInput}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <IconButton
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </div>
        <h5>Current List of Tasks</h5>
        {actions.map((action, idx) => {
          return (
            <div>
              <li key={idx}>
                {action}
                <IconButton aria-label="Delete" onClick={() => deleteTask(idx)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </li>
            </div>
          );
        })}
      </div>
      <div className="container">
        <Button variant="contained" color="primary" onClick={chooseRandom}>
          Select Random Task
        </Button>

        <h2>{randomTask}</h2>
      </div>
    </div>
  );
}

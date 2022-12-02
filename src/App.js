import './App.css';
import { useState } from "react";
import data from "./data.json";

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';

function PokemonCard(props) {
  let currName = props.pokemon.name
  let currDexNum = props.pokemon.dexnum
  let currImagePath = "assets\\images\\" + currDexNum.toString() + currName + ".png"
  let currGen = props.pokemon.gen
  let currDesc = props.pokemon.description
  let currLevel = props.pokemon.level

  return (
    <Card sx={{ maxWidth: 180 }}>
      <CardMedia
        component="img"
        alt={currName}
        image={currImagePath}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {currName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This pokemon first appeared in Gen {currGen} with a pokedex entry of #{currDexNum}.
          <br /> 
          <br /> 
          This one is a level {currLevel} {currName} {currDesc}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={props.inTeam ? props.onRemoveFromTeam : props.onAddToTeam}>{props.inTeam ? "Remove from team" : "Add to team"}</Button>
        <Button size="small" onClick={props.inMaybes ? props.onRemoveFromMaybes : props.onAddToMaybes}>{props.inMaybes ? <StarIcon color="warning" /> : <StarBorderIcon color="warning" />}</Button>
      </CardActions>
    </Card>
  );
}

function App() {
  const compareDexNumLowToHigh = (a, b) => a.dexnum - b.dexnum
  const compareDexNumHighToLow = (a, b) => b.dexnum - a.dexnum
  const compareLevelLowToHigh = (a, b) => a.level - b.level
  const compareLevelHighToLow = (a, b) => b.level - a.level
  const compareFuncs = [compareDexNumLowToHigh, compareDexNumHighToLow, compareLevelLowToHigh, compareLevelHighToLow]

  const [compareFuncIdx, setCompareFuncIdx] = useState(0);

  const handleChange = (event) => {
    setCompareFuncIdx(event.target.value);
  };

  data.sort(compareFuncs[compareFuncIdx])

  const [team, setTeam] = useState([])
  const [maybes, setMaybes] = useState([])

  const addToTeam = (pokemon) => {
    if (!team.includes(pokemon)) {
      setTeam([...team, pokemon])
    }
  }

  const removeFromTeam = (pokemon) => {
    setTeam(team.filter((member) => (member !== pokemon)))
  }

  const clearTeam = () => {
    setTeam([])
  }

  const addToMaybes = (pokemon) => {
    if (!maybes.includes(pokemon)) {
      setMaybes([...maybes, pokemon])
    }
  }

  const removeFromMaybes = (pokemon) => {
    setMaybes(maybes.filter((member) => (member !== pokemon)))
  }

  const levels = team.map((pokemon) => (pokemon.level))
  let total = levels.reduce((a, b) => a + b, 0)

  const [checkedFaves, setCheckedFaves] = useState(false)
  const onChangeFaves = () => {
    setCheckedFaves(!checkedFaves)
  }
  const [checkedGen1, setCheckedGen1] = useState(true)
  const onChangeGen1 = () => {
    setCheckedGen1(!checkedGen1)
  }
  const [checkedGen2, setCheckedGen2] = useState(true)
  const onChangeGen2 = () => {
    setCheckedGen2(!checkedGen2)
  }
  const [checkedGen3, setCheckedGen3] = useState(true)
  const onChangeGen3 = () => {
    setCheckedGen3(!checkedGen3)
  }
  const [checkedGen4, setCheckedGen4] = useState(true)
  const onChangeGen4 = () => {
    setCheckedGen4(!checkedGen4)
  }
  const [checkedGen5, setCheckedGen5] = useState(true)
  const onChangeGen5 = () => {
    setCheckedGen5(!checkedGen5)
  }

  const resetFilter = () => {
    setCheckedFaves(false)
    setCheckedGen1(true)
    setCheckedGen2(true)
    setCheckedGen3(true)
    setCheckedGen4(true)
    setCheckedGen5(true)
  }

  let filteredData = data
  if (checkedFaves) {
    filteredData = filteredData.filter((member) => (maybes.includes(member)))
  }
  if (!checkedGen1) {
    filteredData = filteredData.filter((member) => (member.gen !== 1))
  }
  if (!checkedGen2) {
    filteredData = filteredData.filter((member) => (member.gen !== 2))
  }
  if (!checkedGen3) {
    filteredData = filteredData.filter((member) => (member.gen !== 3))
  }
  if (!checkedGen4) {
    filteredData = filteredData.filter((member) => (member.gen !== 4))
  }
  if (!checkedGen5) {
    filteredData = filteredData.filter((member) => (member.gen !== 5))
  }

  return (
    <>
      <Typography variant="h2">
        Pokemon Team Builder!
      </Typography>

      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sort by</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={compareFuncIdx}
            label="Sort by"
            onChange={handleChange}
          >
            <MenuItem value={0}>Pokedex # (low to high)</MenuItem>
            <MenuItem value={1}>Pokedex # (high to low)</MenuItem>
            <MenuItem value={2}>Level (low to high)</MenuItem>
            <MenuItem value={3}>Level (high to low)</MenuItem>
          </Select>
          <div>
            <FormControlLabel
              checked={checkedFaves}
              onClick={onChangeFaves}
              control={<Switch color="warning" />}
              label="Favorites only"
              labelPlacement="bottom"
            />
            <FormControlLabel
              checked={checkedGen1}
              onClick={onChangeGen1}
              control={<Checkbox />}
              label="Gen 1"
            />
            <FormControlLabel
              checked={checkedGen2}
              onClick={onChangeGen2}
              control={<Checkbox />}
              label="Gen 2"
            />
            <FormControlLabel
              checked={checkedGen3}
              onClick={onChangeGen3}
              control={<Checkbox />}
              label="Gen 3"
            />
            <FormControlLabel
              checked={checkedGen4}
              onClick={onChangeGen4}
              control={<Checkbox />}
              label="Gen 4"
            />
            <FormControlLabel
              checked={checkedGen5}
              onClick={onChangeGen5}
              control={<Checkbox />}
              label="Gen 5"
            />
            <Button onClick={resetFilter}>Reset filters</Button>
          </div>
        </FormControl>
      </Box>

      {(filteredData.length === 0)
        ?
        <Typography variant="body" color="error">
          No pokemon currently match that description... try changing the filters above!
        </Typography>
        :
        <Grid container spacing={0.5}>
          {filteredData.map((pokemon) => (
            <PokemonCard
              pokemon={pokemon}
              inTeam={team.includes(pokemon)}
              inMaybes={maybes.includes(pokemon)}
              onAddToTeam={() => addToTeam(pokemon)}
              onRemoveFromTeam={() => removeFromTeam(pokemon)}
              onAddToMaybes={() => addToMaybes(pokemon)}
              onRemoveFromMaybes={() => removeFromMaybes(pokemon)}
            />
          ))}
        </Grid>
      }

      <Typography variant="h3">
        Team
      </Typography>

      {(team.length === 0)
        ?
        <Typography variant="body" color="error">
          No pokemon are currently on your team... try adding some from above!
        </Typography>
        :
        <>
          <Typography variant="h6">
            Your team's cumulative level is currently {total}!
          </Typography>

          <Grid container spacing={0.5}>
            {team.map((pokemon) => (
              <PokemonCard
                pokemon={pokemon}
                inTeam={team.includes(pokemon)}
                inMaybes={maybes.includes(pokemon)}
                onAddToTeam={() => addToTeam(pokemon)}
                onRemoveFromTeam={() => removeFromTeam(pokemon)}
                onAddToMaybes={() => addToMaybes(pokemon)}
                onRemoveFromMaybes={() => removeFromMaybes(pokemon)}
              />
            ))}
          </Grid>

          <Button variant="contained" color="error" onClick={clearTeam}>Clear team</Button>
        </>
      }
    </>
  );
}

export default App;

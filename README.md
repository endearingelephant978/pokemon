# Development

### Link to Deployed Website
https://endearingelephant978.github.io/pokemon/

### Goal and Value of the Application
This application targets a niche user and use case, but this application is intended to represent a solution for when a user is playing pokemon, has many pokemon stored in their pokemon box, and is trying to visualize what sort of team combinations they could make with them. The user can add pokemon from their box to their team and favorite pokemon they might want to add in later, as well as sorting their pokemon by level and pokedex number or filtering pokemon from certain generations.

### Usability Principles Considered
I paid particular attention to the design of the filtering system. I chose to have all pokemon generations (Gen 1, Gen 2, etc.) default to being checked in order to show all available pokemon from all generations, and I chose to have the favorites-only filter be a slightly different component (a switch instead of checkbox) because the checkbox when checked includes its labeled category, but the switch actually excludes everything not in the given category (slightly different!), so the mental model for the user makes more sense when these elements are visually different. Also, when the filter settings make it so that no pokemon fits the given filters, text will appear to tell the user that that's the reason why and how they could go about fixing it.

### Organization of Components
My app uses PokemonCard components in a grid structure to show which pokemon are available, and these PokemonCards are also used to show what pokemon are in your current team. The rest is in coded within the App function (which I do admit looks a little bloated, but since most of the code here that could have been refactored out into components didn't actually get repeated as much as the PokemonCard instances for example, it seems alright given the scope of this actual project).

### How Data is Passed Down Through Components
The App() function passes data down to the instances of the PokemonCard component through props. Each pokemon card is told what the specific pokemon data is, whether that pokemon is in the team/favorited, etc. and is given references to functions that can change the state of the team/favorites (i.e. adding and remove this pokemon).

### How the User Triggers State Changes
State is being tracked for the filter settings, the list of favorites, and the list of pokemon in the team. The user triggers state changes for these properties when changing the filters with the switch/checkboxes, when clicking the buttons to add and remove pokemon to the team/favorites, and when clicking the button that clears the team.

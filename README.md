[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Issues][issues-shield]][issues-url]

# **Gamer**Hub

*Your place to find new gamers to play with based on personal preferences and gamer style. Totally anonymous.*

<p align="center">
<img src="/frontend/src/shared/assets/images/logo.png" width="300" align="center">
</p>
 
<details><summary>TABLE OF CONTENTS</summary>

---

- [About the Project](#about-the-project)
  * [Built with](#built-with)
- [Standards and Structure](#standards-and-structure)
  * [React](#react)
    + [File structure](#file-structure)
    + [Exports](#exports)
    + [Data fetching in separate file](#data-fetching-in-separate-file)
    + [FontAwesome in React](#fontawesome-in-react)
    + [FontAwesomeIcon](#fontawesomeicon)
  * [React code standards](#react-code-standards)
  * [Code standards](#code-standards)
    + [State hooks](#state-hooks)
    + [Arrow functions](#arrow-functions)
    + [Keep it DRY](#keep-it-dry)
    + [Props](#props)
  * [Sass](#sass)
    + [File structure](#file-structure-1)
  * [Laravel](#laravel)
    + [PSR-2](#psr-2)
    + [PSR-2 coding style guide](#psr-2-coding-style-guide)
    + [Naming Conventions](#naming-conventions)
    + [Routers and routes](#routers-and-routes)
    + [Short and readable syntax](#short-and-readable-syntax)
  * [Assets](#assets)
    + [File structure](#file-structure-2)
- [Goals and Context](#goals-and-context)
  * [Project Solves](#project-solves)
- [Getting Started](#getting-started)
  * [Installation](#installation)
    + [React](#react-1)
    + [Laravel](#laravel-1)
- [Page and Route Descriptions](#page-and-route-descriptions)
- [Database-structure](#database-structure)
  * [Preferences](#preferences)
  * [Other user-saved data](#other-user-saved-data)
    + [Roles](#roles)
  * [Matchups and Interactions](#matchups-and-interactions)
  * [Chat](#chat)
- [Design](#design)
- [Contributors](#contributors)
- [License](#license)

</details>

---

## About the Project

### Built with

* [React](https://reactjs.org)
* [Sass](https://sass-lang.com)
* [Laravel](https://laravel.com)

## Standards and Structure

### React

#### File structure

* snake_case on component name (should be a folder)
* `index.jsx` for the js component logic
* PascalCase for naming other (apart from index) files with component name
* Data fetching in separate file from index

```
src/components/home
  index.jsx
  Home.scss
```

***Note that if you know that a function is going to be re-used throughout the project, try to make it as a separate component.***

#### Exports

Always use exports at the bottom of the file, never in line.
```js
export default Input; //<-- good
export default Input = () => .... //<--- bad

export {
Something,
Else
}; //<--- good
```

#### Data fetching in separate file

Create a fetch.js (or whatever you wanna call it)

```js
import axios from 'axios';
const apiBaseURL = 'www.whatever.com'

const GET = url => {
    return axios.get(`${apiBaseURL}/${url}`);
}

// if need for headers etc.

const headers = 'some headers';

const POST = (url, data) => {
  return axios(`${apiBaseURL}/${url}`, {
    method: 'POST',
    headers,
    data,
  });
}

export {
POST,
GET
};
```

In the react component:

```js
//import the file at the top:
import { GET, POST } from './fetch.js';
```
In component method:
```js
async getData(apiEndpoint) {
  const { data: Items } = await GET(apiEndpoint);
  if (Items) {
    // Set data to state
    this.setState({ Items });
  }
  else {
    // error
  }
}
```
#### FontAwesome in React

#### FontAwesomeIcon
When you want to add an icon to your component, you need to first add this line to the list of imports:
```js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
```
To initiate the auto-fill-functionality of your IDE, add an empty import from the icon-pack you want to use. **(e.g. free-solid-svg-icons or free-regular-svg-icons)**
```js
import {} from '@fortawesome/free-solid-svg-icons';
```
Then, to begin adding icons, create an instance of the FontAwesomeIcon component like this:
```jsx
<FontAwesomeIcon 
icon={faPlus}
/>
```
When you're typing inside the icon-prop, you'll get suggested hundreds of nice icons! 
If you press enter while you're selecting an icon you want to use, your IDE will likely add the icon to the empty imports-object at the top. Success!!

### React code standards

### Code standards

* Only build ***functional components*** , do not use class based. 
* Variables and functions should always be declared using camelCase! 
* Try to use `const` as much as possible when declaring variables, but if values are going to change throughout use `let`. 
* Use the Airbnb JavaScript style guide for a more concise way of writing javascript:
https://github.com/airbnb/javascript.

#### State hooks

When using state hooks in react, name the states as what they are! And always have ***set*** as the first word before the state itself (in the set part).

Do this:

```js
const [count, setCount] = useState(0);
```

Never do this:

```js
const [count, countsetter] = useState(0);
```
Visit: https://reactjs.org/docs/hooks-state.html for more information.

#### Arrow functions

Use arrow functions throughout the components even when writing the base component function like this: 

```js
const test = () => {
  return (
    <>
            
    </>
  )
}
```

Not like this: 

```js
function test () {
  return (
    <div>
            
    </div>
  )
}
```

***Notice: use fragments `<>` instead of `<div>` after the return.***

#### Keep it DRY

Try to minimize the amount of lines of code as much as possible, DRY.

For instance do this: 

```js
const tempCheck = () => {
  let temp = 22
  if (temp <= 20) return true;
  if (temp > 20) return false;
}  
```

Not this: 

```js
function tempCheck() {
  let temp = 22
  if (temp <= 20) {
    return true;
  } else {
    return false;
  }
}
```

***Note that there are no curly brackets in the first example in the if statement. ES6 makes it possible not to use these when only returning a value directly.***

#### Props

When sending data through props from one component to another try naming props as what their values are and indent properly by creating a new line for each prop you send *(if it's more than one)*. 

Do this:

```js
<WeatherCard 
  temp = {item.temp}
  type = {item.type}
  windspeed = {item.windspeed}
  humidity = {item.humidity}
/>

<WeatherData data = {item.data} />
```

Do not do this:

```js
<WeatherCard data1={item.temp} data2={item.date} data3={item.type} data4 = {item.windspeed} data5 = {item.humidity}/>
```

***(Tip: Download and use the vscode extension “Prettier”.)*** 


### Sass

#### File structure

There is a styling folder under shared with some global styling features that should be used throughout the project. 

```
src/shared/styling
  global.scss
  _mixins.scss
  _variables.scss
  _breakpoints.scss
```

Import the `global.scss` file at the top of the local `.scss` file when styling components.

```scss
@import 'global.scss';
```

### Laravel

#### PSR-2

Laravel is written with php, therefore it is essential to know how to write php correctly. Therefore checkout [PSR-2](https://www.php-fig.org/psr/psr-2/). Laravel follows these standards and so will we.

#### PSR-2 coding style guide

* White space on new line between functions/methods
* Classes should be declared in PascalCase
* Variables, methods/functions should be declared in camelCase
* Keep it DRY
* If a function/method can do a lot of things, try to separate the functionality into two or more functions/methods
* Try not to overwrite controllers-method names, if you  must, make a new controller method
* Name the files as what they are going to give, for instance do not name a controller that is handling CRUD for a ‘User’ something else than `UserController`. </li>


#### Naming Conventions

![Naming Laravel](https://user-images.githubusercontent.com/70698047/117644355-ad3ca200-b189-11eb-8dc3-6f81b849750d.png)

#### Routers and routes

Routers connected to the same controller should not have whitespace between new lines in routing files. Whitespace between lines should occur when new routers are connected to different controllers.

For instance do this: 

```php
Route::get('/', [PostsController::class, 'index']);
Route::get('/p/create', [PostsController::class, 'create']);
Route::get('/p/{post}', [PostsController::class, 'show']);
Route::post('/p', [PostsController::class, 'store']);

Route::get('/profile/{user}', [ProfilesController::class, 'index'])->name('profile.show');
Route::get('/profile/{user}/edit', [ProfilesController::class, 'edit'])->name('profile.edit');
Route::patch('/profile/{user}', [ProfilesController::class, 'update'])->name('profile.update');

```

Do not do this:

```php
Route::get('/', [PostsController::class, 'index']);
Route::get('/p/create', [PostsController::class, 'create']);

Route::post('follow/{user}', [FollowsController::class, 'store']);
Route::get('/', [PostsController::class, 'index']);

Route::post('/p', [PostsController::class, 'store']);

Route::patch('/profile/{user}', [ProfilesController::class, 'update'])->name('profile.update');
Route::get('/profile/{user}', [ProfilesController::class, 'index'])->name('profile.show');

Route::get('/profile/{user}/edit', [ProfilesController::class, 'edit'])->name('profile.edit');


Route::get('/p/{post}', [PostsController::class, 'show']);
```

#### Short and readable syntax

Use shorter and more readable syntax where possible for instance, do this:

```php
session('cart');
    $request->name;
```

Do not do this:

```php
$request->session()->get('cart');
  $request->input('name');
```

**Here is a list that for shorter and readable syntax:**

![list](https://user-images.githubusercontent.com/70698047/117645840-5768f980-b18b-11eb-9966-f034f4a8543d.png)

***For more detailed information on how to write methods, objects, validation etc correctly checkout  https://www.mindtwo.de/guidelines/coding/laravel.***

### Assets

#### File structure

Images and icons are placed in the shared folder.

```
src/shared/assets
  icons
  images
```

## Goals and Context

### Project Solves
In today's society, gamers can have a hard time fitting in and finding other mates to share their experience with. It can be due to social distancing, peer pressure, or mental illness. Our team has the solution to this problem. We wanted to create an application, targeted at gamers, to allow people to match with others based on personal gaming preferences with the hope that they can find new friends with similar interests. With our app, we provide gamers with a safe, easy to use, and fun environment for gamers of all kinds to meet and talk.

<!-- GETTING STARTED -->
## Getting Started

### Installation

Start by cloning the repository. 
Frontend is the react-folder, backend is the Laravel folder.

#### React

1. Install npm dependencies in the frontend-root (frontend/)

```
npm install
```
2. To start the react-server, run
```
npm start
```
3. In the files ```src/shared/services/requests``` and ```src/shared/services/preferences```, edit the baseApiUrl variable to be equal to a suitable backend-endpoint (either deployed or local). 

#### Laravel
1. Setup a Laravel environment. This can be done with either <a href="https://laravel.com/docs/8.x/homestead">Homestead (good for Windows users)</a>, <a href="https://laravel.com/docs/8.x/sail">Sail (works with Docker)</a>, <a href="https://laravel.com/docs/8.x/valet">Valet (Mac-specific)</a> or any other VM.
2. Install backend dependencies in the backend root (backend/) by running
```
composer install
```
3. Depending on which setup you chose in step 1, running the server differs. Check the docs.

## Page and Route Descriptions

| Page        | Items       |
| ----------- | ----------- |
| **Landing page** <br /> <br /> /  | <br /> <br /> Start page |
| **Login, signup etc.** <br /> <br /> /login <br /> /logout <br /> /register <br /> /verify <br /> /verified <br /> /already-verified <br /> /forgot-password | Self-explanatory routes and methods for authentication  |

## Database-structure
### Preferences
The application is built on a group of N-N relations to users. A user can select multiple preferences, and those are categorised as:
- games
- genres
- player-types
- languages (langs)
- miscellaneous (miscs) 

These all have potential for use in filtering suggested users in the match-controller, **however only player-types, langs and miscs are currently used in filtering.**

### Other user-saved data
Furthermore, there is support for more superficial data. 
Users have a 1-1 relation to profiles, which hold profile-data such as image, display name, body.
They also have a 1-N relation to **times**.
Each row in the times-table represents one interval, either weekend or weekday. It is supposed to show which times a user can play.

#### Roles
Currently we support N-N relationships between users and **roles**. This means a user can have a multitude of roles, and new roles can be created in the admin-panel. 

### Matchups and Interactions
Each time a user interacts (e.g. presses YUP or NOPE) with another user, a row in the **interactions** table is saved. This row describes which user (subject) interacted with another user (object), and whether the interaction was positive (1) or negative (0). Each time this occurs, a query is executed to determine if the other user liked you back. 
If that is the case, a row in the **matchups** table is created. This table has a N-N relationship with **users**, so technically matchups support an indeterminate number of users. However, in the case of this application, we will be satisfied with 2.

### Chat
The chat is dependent on **Pusher** for websocket-functionality, and currently has a few tables to get it working. 
- sessions
- chats
- messages

A session can be created between two users if they have a matchup presently. Only one session per matchup can be created, and that logic is detailed in SessionController.§§§§§                                                                                                                     

Each time a message is sent from the frontend, rows in the chats and messages table are created to represent the message - from whom it was sent, if it is read, which session it is connected to, and more. Basically, 1 message per chat, one session has many chats/messages. 

If you want to contribute to the chat, or to other **Broadcast**-based features, please read the <a href="https://laravel.com/docs/8.x/broadcasting">Broadcast-section of the 8.0 Laravel Documentation</a>, and make sure you are connected to our Pusher-account. If you're unsure, contact other contributors.

## Design
![Mockup](/assets/u10-prototype.png?raw=true)

## Contributors
- *Hannes Qvarnström* [Github](https://github.com/hannesqvarnstrom)
- *Enzo Bomark* [Github](https://github.com/EnzoBomark)
- *Karin Stenwall* [Github](https://github.com/stenwall)
- *Simon Lindelöf* [Github](https://github.com/reelode)
- *Jamil Bariche* [Github](https://github.com/jamil-source)
- *Oskar Boström* [Github](https://github.com/Oskar-Mikael)
- *Mehrdad Amini* [Github](https://github.com/MDAX1)

## License

Distributed under the GNU General Public License v3.0. 

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/chas-academy/u10-business-idea-grupp-6.svg?style=for-the-badge
[contributors-url]: https://github.com/chas-academy/u10-business-idea-grupp-6/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/chas-academy/u10-business-idea-grupp-6.svg?style=for-the-badge
[forks-url]: https://github.com/chas-academy/u10-business-idea-grupp-6/network/members
[issues-shield]: https://img.shields.io/github/issues/chas-academy/u10-business-idea-grupp-6.svg?style=for-the-badge
[issues-url]: https://github.com/chas-academy/u10-business-idea-grupp-6/issues

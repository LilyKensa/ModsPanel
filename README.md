# Huey's Minecraft Mods Panel

By [@LilyKensa](https://github.com/LilyKensa/),
  <small>aka.</small> Huey☆ 
  <small>aka.</small> `_hueeey_` in Minecraft

## Features

The Mods Panel ~~​ has ​~~ *should have* these functions:

- Basic functions 
  - Listing
    - Name, description, dependencies, incompatibilities
  - Enabling / Disabling
- Compatability Check
- Mark as API
  - Remove if no mod required it
- Grouping

## Installation

### Node.js

You can download it from [the official website](https://nodejs.org/en)

### Download & Run Script

> [!WARNING]  
> I assume your operating system is Windows  
> So the below is Windows PowerShell commands

First, you need to be in your `.minecraft` folder:

```ps
cd ~/AppData/Roaming/.minecraft/
```

Create the `ModsPanel` folder:

```ps
mkdir ModsPanel; cd ./ModsPanel/ 
```

> [!NOTE]  
> The script reads the `../mods/` folder, so you can't move the `ModsPanel` folder to anywhere else

Clone this repository:

```ps
git clone https://github.com/LilyKensa/ModsPanel.git .
```

Install all required node modules

```ps
npm install
```

> [!NOTE]  
> This action will install:  
> - `Express.js` for the backend server to run
> - `JSZip` to read the `.jar` files

Start the index script

```ps
node ./index.js
```

The server should be starting at port `8070`, here the [link](http://localhost:8070/)

~~​ If you encounter any issue, don't contact me because I probably won't be able to solve it for you ​~~

Just kidding, you can always find me on discord `@._hueeey_.`

## For Devs

All files in this repository is compiled in the same folder:

- `.pug` → `.html`
- `.scss` → `.css`
- `.ts` → `.js`

I just too lazy to have `src` and `dist` folder separated

---

If you wanna contribute, pull requests are welcome

~~​ But that doesn't mean I will adopt your approach ​~~
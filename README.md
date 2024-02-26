# Huey's Minecraft Mods Panel

By @LilyKensa,
  aka. Huey☆ 
  aka. \_hueeey\_ in Minecraft

## Features

The Mods Panel has these functions:

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

Clone this repository:

```ps
git clone https://github.com/LilyKensa/ModsPanel.git .
```

Start the index script

```ps
node index
```

~~​ If you encounter any issue, don't contact me because I probably won't be able to solve it for you ​~~

Just kidding, you can always find me on discord @.\_hueeey\_.

## For Devs

All files in this repository is compiled in the same folder:

- `.pug` → `.html`
- `.scss` → `.css`
- `.ts` → `.js`

I just too lazy to have `src` and `dist` folder separated

---

If you wanna contribute, pull requests are welcome.

~~​ But that doesn't mean I will adopt your approach ​~~
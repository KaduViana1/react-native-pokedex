export const getTypeIcon = type => {
  switch (type) {
    case 'bug':
      return require(`../assets/types/bug.png`);
    case 'dark':
      return require(`../assets/types/dark.png`);
    case 'dragon':
      return require(`../assets/types/dragon.png`);
    case 'electric':
      return require(`../assets/types/electric.png`);
    case 'fairy':
      return require(`../assets/types/fairy.png`);
    case 'fighting':
      return require(`../assets/types/fighting.png`);
    case 'fire':
      return require(`../assets/types/fire.png`);
    case 'flying':
      return require(`../assets/types/flying.png`);
    case 'ghost':
      return require(`../assets/types/ghost.png`);
    case 'grass':
      return require(`../assets/types/grass.png`);
    case 'ground':
      return require(`../assets/types/ground.png`);
    case 'ice':
      return require(`../assets/types/ice.png`);
    case 'normal':
      return require(`../assets/types/normal.png`);
    case 'poison':
      return require(`../assets/types/poison.png`);
    case 'psychic':
      return require(`../assets/types/psychic.png`);
    case 'rock':
      return require(`../assets/types/rock.png`);
    case 'steel':
      return require(`../assets/types/steel.png`);
    case 'water':
      return require(`../assets/types/water.png`);
    default:
      return require(`../assets/types/normal.png`);
  }
};

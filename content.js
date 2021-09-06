const getAppName = (appItem) => {
  const nameElements = appItem.getElementsByClassName('app-button-name');
  const nameElement = nameElements && nameElements.length && nameElements[0];

  if(!nameElement) throw new Error('Could not find app name element in the DOM');

  return nameElement.innerText || '<Empty App Name>';
}

const compareAppNames = (a, b) => {
  const appNameA = getAppName(a);
  const appNameB = getAppName(b);
  if(appNameA < appNameB) return -1;
  if(appNameA > appNameB) return 1;
  return 0;
};

const sortAppTiles = (container) => {
  const appListElements = container.getElementsByClassName('app-buttons-list');
  const appListElement = appListElements && appListElements.length && appListElements[0];

  if(!appListElement) throw new Error('Could not find app list element in DOM');

  const appItems = [...appListElement.getElementsByTagName('li')];

  appItems.sort(compareAppNames);
  appItems.forEach(e => appListElement.appendChild(e));
}

// Debounce implementation courtesy of Ondrej Polesny
//  https://www.freecodecamp.org/news/javascript-debounce-example/
//
// Originally, I wanted to monitor the web requests made to obtain each of
//  the app tiles, and only perform the sort once all of the requests had
//  been completed... but doing so was going to require additional permissions
//  as well as splitting the code between content and background scripts.
// Instead, I've opted to just monitor the HTML directly and only run
//  the sort when no additional changes have been made to the relevant
//  part of the DOM. (The downside to this approach is that it's possible
//  for the sort to occur prematurely, if one or more requests take longer
//  to complete than the debounce interval. If it becomes a frequent issue,
//  I may revisit this decision. 😁)
const debounce = (f, timeout) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { f.apply(this, args); }, timeout);
  };
}

const start = () => {
  const container = document.getElementById('container');

  if(!container) throw new Error('Could not find main container element in the DOM');

  const observer = new MutationObserver(debounce(() => {
    observer.disconnect();
    sortAppTiles(container);
  }, 1000));
  
  observer.observe(container, {
    childList: true,
    subtree: true,
  });
}

start();
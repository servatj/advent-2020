const appRoot = require('app-root-path');
const fs = require("fs");

const filename = appRoot + '/data/bags.txt';
const data = fs.readFileSync(filename, 'utf-8');
const bags = data.trim().split('\n');


const bagsParsed = bags.map((line) => {
  const [, root, contents] = line.match(/(.*)\sbags contain\s(.*)\.$/);
  const parsed = contents === 'no other bags' ? [] : contents.split(',').map(desc => {
    const [, count, bagType] = desc.match(/(\d+)\s(.*)\sbags?/);
    return {
      count, bagType
    };
  });
  
  return {
    root,
    contents: parsed,
  }
})


const nodeState = {
  bagType: '',
  isRoot: '',
  parents: [],
  leaves: []
}


const setAsRoot = (state) => {
  state.isRoot = true;
  return state;
}

const addParent = (parentNode, state) => {
  if (state.parents.find((p) => p.bagType === parentNode.bagType)) {
    state.parents.push(parentNode);
  }
  return state;
}

const addLeaf = (leafNode, state) => {
  if (!state.leaves.find((l) => l.bagType === leafNode.bagType)) {
    state.leaves.push(leafNode);
  }
  addParent(leafNode, state);
  return state;
}

const findRoots = (roots, state, skipSelf = false ) => {


  if (!skipSelf && state.isRoot) {
    console.log('found')
    roots.add(state.bagType);
  }
  state.parents.forEach(p => findRoots(roots, p));
}

const nodes = [];
const findNode = (bagType) => nodes.find((n) => { 
 return n.bagType === bagType 
});

bagsParsed.forEach(rule => {
  if (!findNode(rule.root)) {
    nodes.push({ ... nodeState, bagType: rule.root, isRoot: true });
  } else { 
    setAsRoot(findNode(rule.root));
  }

  rule.contents.forEach((c) => {
    if (!findNode(c.bagType)) {
      nodes.push({ ...nodeState, bagType: c.bagType });
    }
  });
});

bagsParsed.forEach(rule => {
  rule.contents.forEach(c => {
    const current = findNode(rule.root) || nodeState
    addLeaf(findNode(c.bagType), current);
  });
});

const shinyGold = findNode('shiny gold');
const containingRoots = new Set();
findRoots(containingRoots, shinyGold, true)
//console.log(containingRoots)
console.info(Array.from(containingRoots).length);

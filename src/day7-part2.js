const rules = require('./rules');

/*
- First deconstruct. Iterate over and find all names and what they can contain.
- Create TreeNodes. Maintain a searchable list (by style) of them
  - A tree node has:
    - a style,
    - whether this is *also* a root point.
      - bags can be both acceptable roots and also contents to other bags
    - the ability to have "contents" - leaves
    - parents
  - references to other tree nodes must always be by ref
  - adding a parent/leaf must also insert into the other nodes respective list of leaves/parents.
  - create optimistically for known "contents" (don't add as leaves though yet)
    - when creating, check if one exists already.
      - add a setRoot func
- Now rewalk over the list of rules.
  - Find all references to contents, add relevant tree links
- Searching for the answer will involve locating the "shiny gold".
  - Possible from inital list of refs
  - Then navigate out using all parents of "shiny gold"
    - adding to a Set the styles that we find as "roots"
  - Once we have exhausted all paths, count the Set members
*/

class TreeNode {
  constructor(style, isRoot = false) {
    this.style = style;
    this.isRoot = isRoot;
    this.parents = [];
    this.leaves = [];
  }

  setAsRoot() {
    this.isRoot = true;
  }

  addParent(parentNode) {
    if (!this.parents.find((p) => p.style === parentNode.style)) {
      this.parents.push(parentNode);
    }
  }

  addLeaf(leafNode, count) {
    if (!this.leaves.find((l) => l.type.style === leafNode.style)) {
      this.leaves.push({ type: leafNode, count });
    }
    leafNode.addParent(this);
  }

  findRoots(roots, skipSelf = false) {
    if (!skipSelf && this.isRoot) {
      roots.add(this.style);
    }
    this.parents.forEach(p => p.findRoots(roots));
  }

  countContents(skipSelf = false) {
    // console.info(`[${this.style}] - ${this.leaves.map(l => `${l.count} x '${l.type.style}'`)}`);
    return this.leaves.reduce((acc, leaf) => {
      const leafContents = (leaf.count * leaf.type.countContents());
      console.info(`[${this.style}] - [${leaf.type.style}] - ${leafContents}`);
      return acc + leafContents;
    }, skipSelf ? 0 : 1);
  }
}

const nodes = [];
const findNode = (style) => nodes.find((n) => n.style === style);
rules.forEach(rule => {
  if (!findNode(rule.root)) {
    nodes.push(new TreeNode(rule.root, true));
  } else {
    findNode(rule.root).setAsRoot();
  }

  rule.contents.forEach((c) => {
    if (!findNode(c.style)) {
      nodes.push(new TreeNode(c.style));
    }
  });
});

rules.forEach(rule => {
  rule.contents.forEach(c => {
    findNode(rule.root).addLeaf(findNode(c.style), c.count);
  });
});

const shinyGold = findNode('shiny gold');
console.info(shinyGold.countContents(true));

// / TrieNode represents a node in the Trie
class TrieNode {
    constructor() {
      this.children = new Map();
      this.isEndOfWord = false;
    }
  }
  
  // Trie data structure
  class Trie {
    constructor() {
      this.root = new TrieNode();
    }
  
    // Insert a word into the Trie
    insert(word) {
      let currentNode = this.root;
  
      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        if (!currentNode.children.has(char)) {
          currentNode.children.set(char, new TrieNode());
        }
        currentNode = currentNode.children.get(char);
      }
  
      currentNode.isEndOfWord = true;
    }
  
    // Get autocomplete suggestions for a given prefix
    getAutocompleteSuggestions(prefix) {
      let currentNode = this.root;
  
      // Traverse to the last character of the prefix in the Trie
      for (let i = 0; i < prefix.length; i++) {
        const char = prefix[i];
        if (!currentNode.children.has(char)) {
          return []; // Prefix does not exist in the Trie
        }
        currentNode = currentNode.children.get(char);
      }
  
      // Collect all words starting from the current node
      const suggestions = [];
      this.collectWords(currentNode, prefix, suggestions);
      return suggestions;
    }
  
    // Collect words starting from a given node recursively
    collectWords(node, prefix, suggestions) {
      if (node.isEndOfWord) {
        suggestions.push(prefix);
      }
  
      for (const [char, child] of node.children.entries()) {
        this.collectWords(child, prefix + char, suggestions);
      }
    }
  }

// Fetch the array of words from 'cardArray.json'
fetch('cardArray.json')
  .then((response) => response.json())
  .then((words) => {
    // Build the Trie
    const trie = new Trie();
    for (const word of words) {
      trie.insert(word);
    }

    // Attach event listener to the textarea
    const textarea = document.getElementById('textarea');
    textarea.addEventListener('input', handleInput);

    // Handle input event
    function handleInput() {
      const input = textarea.value.trim();
      const suggestions = trie.getAutocompleteSuggestions(input);
      displayAutocompleteSuggestions(suggestions);
    }

    // Display autocomplete suggestions
    function displayAutocompleteSuggestions(suggestions) {
      const autocompleteDiv = document.getElementById('autocomplete');
      autocompleteDiv.innerHTML = '';

      for (const suggestion of suggestions) {
        const suggestionElement = document.createElement('div');
        suggestionElement.textContent = suggestion;
        suggestionElement.className = "suggestions"
        autocompleteDiv.appendChild(suggestionElement);
      }
    }
  })
  .catch((error) => console.error(error));
  
  
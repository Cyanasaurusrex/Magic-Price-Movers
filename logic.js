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
fetch("../cardArray.json")
  .then((response) => response.json())
  .then((words) => {
    // Build the Trie
    const trie = new Trie();
    for (const word of words) {
      trie.insert(word);
    }

    // Attach event listener to the textarea
    const textarea = document.getElementById("textarea");
    textarea.addEventListener("input", handleInput);

    // Handle input event
    function handleInput() {
      const result = capitalizeWords(textarea.value.trim())
      const suggestions = trie.getAutocompleteSuggestions(result);
      displayAutocompleteSuggestions(suggestions);
    }

    function capitalizeWords(input) {
      const words = input.split(' ');
      // Capitalize the first letter of each word
      const capitalizedWords = words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
  });

  // Join the modified array back into a string
  const capitalizedString = capitalizedWords.join(' ');

  return capitalizedString;
    }

    // Display autocomplete suggestions
    function displayAutocompleteSuggestions(suggestions) {
      const autocompleteDiv = document.getElementById("autocomplete");
      autocompleteDiv.innerHTML = "";

      // Display up to 10 suggestions or all available suggestions if they are less than 10
      const maxSuggestions = Math.min(suggestions.length, 10);
      for (let i = 0; i < maxSuggestions; i++) {
        const suggestionElement = document.createElement("div");
        suggestionElement.className = "suggestions"
        suggestionElement.textContent = suggestions[i];
        autocompleteDiv.appendChild(suggestionElement);
        suggestionElement.addEventListener("click", (event) => {
          fetch("imgArray.json")
          .then((words))
          const selectedSuggestion = event.target.textContent;
          displaySelectedSuggestion(selectedSuggestion);
        })
      }
    }

    // Function to display the selected suggestion in the 'cardName' element
    function displaySelectedSuggestion(selectedSuggestion) {
      const cardNameElement = document.querySelector('.cardName');
      cardNameElement.textContent = selectedSuggestion;
    }
   

  })
  .catch((error) => console.error(error));

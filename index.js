const button = document.getElementById('button')
button.addEventListener('click', function(event) {
    event.preventDefault()
    getCards()
})




async function getCards() {
    const response = await fetch('https://api.scryfall.com/catalog/land-types')
    const data = await response.json()
    console.log(data)
    
}


// TrieNode represents a node in the Trie
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
  
  // Example usage
  const words = [
    'a', 'aa', 'aah', 'aardvark', 'ab', 'aba', 'abaca', 'abaci', 'aback', 'abacus',
    'abaft', 'abandon', 'abandoned', 'abandonment', 'abase', 'abasement', 'abash', 'abashed', 'abashedly', 'abate',
    'abatement', 'abattoir', 'abbacy', 'abbe', 'abbess', 'abbey', 'abbot', 'abbreviate', 'abbreviation', 'abdicate',
    'abdication', 'abdomen', 'abdominal', 'abduct', 'abduction', 'abductor', 'abeam', 'abed', 'aberrant', 'aberration',
    'abet', 'abettor', 'abeyance', 'abhor', 'abhorrence', 'abhorrent', 'abide', 'abiding', 'ability', 'abject',
    'abjection', 'abjectly', 'abjuration', 'abjure', 'ablaze', 'able', 'ablution', 'ably', 'abnegate', 'abnegation',
    'abnormal', 'abnormality', 'abnormally', 'aboard', 'abode', 'abolish', 'abolition', 'abolitionist', 'abominable', 'abominably',
    'abominate', 'abomination', 'aboriginal', 'aborigine', 'abort', 'abortion', 'abortionist', 'abortive', 'abound', 'about',
    'above', 'aboveboard', 'abrasion', 'abrasive', 'abreast', 'abridge', 'abridgment', 'abroad', 'abrogate', 'abrogation',
    'abrupt', 'abruptly', 'abscess', 'abscond', 'absence', 'absent', 'absentee', 'absenteeism', 'absently', 'absinth',
    'absolute', 'absolutely', 'absolution', 'absolutism', 'absolutist', 'absolve', 'absorb', 'absorbent', 'absorbing', 'absorption',
    'abstain', 'abstainer', 'abstemious', 'abstention', 'abstinence', 'abstract', 'abstraction', 'abstruse', 'absurd', 'absurdity',
    'absurdly', 'abundance', 'abundant', 'abundantly', 'abuse', 'abuser', 'abusive', 'abut', 'abutment', 'abysmal',
    'abysmally', 'abyss', 'acacia', 'academia', 'academic', 'academically', 'academy', 'accede', 'accelerate', 'acceleration',
    'accelerator', 'accent', 'accented', 'accentuate', 'accept', 'acceptability', 'acceptable', 'acceptably', 'acceptance', 'acceptation',
    'accepted', 'access', 'accessible', 'accession', 'accessory', 'accidence', 'accident', 'accidental', 'accidentally', 'acclaim',
    'acclamation', 'acclimate', 'acclimation', 'acclimatization', 'acclimatize', 'acclivity', 'accolade', 'accommodate', 'accommodating', 'accommodation',
    'accommodations', 'accompanied', 'accompaniment', 'accompanist', 'accompany', 'accomplice', 'accomplish', 'accomplished', 'accomplishment', 'accord',
    'accordance', 'accordingly', 'accordion', 'accost', 'account', 'accountability', 'accountable', 'accountant', 'accounting', 'accouter',
    'accredit', 'accreditation', 'accretion', 'accrue', 'accrued', 'acculturate', 'acculturation', 'accumulate', 'accumulation', 'accumulator',
    'accuracy', 'accurate', 'accurately', 'accursed', 'accusation', 'accuse', 'accused', 'accuser', 'accusingly', 'accustom',
    'accustomed', 'ace', 'acerbate', 'acerbic', 'acetate', 'acetic', 'acetone', 'acetylene', 'ache', 'achieve',
    'achievement', 'achiever', 'aching', 'achingly', 'achoo', 'acid', 'acidic', 'acidity', 'acidly', 'acknowledge',
    'acknowledged', 'acknowledgment', 'acme', 'acne', 'acolyte', 'aconite', 'acorn', 'acoustic', 'acoustical', 'acoustics',
    'acquaint', 'acquaintance', 'acquainted', 'acquiesce', 'acquiescence', 'acquire', 'acquisition', 'acquisitive', 'acquit', 'acquittal',
    'acre', 'acreage', 'acrid', 'acrimonious', 'acrimony', 'acrobat', 'acrobatics', 'acronym', 'across', 'acrostic',
    'act', 'acting', 'actinic', 'actinium', 'action', 'actionable', 'activate', 'activation', 'activator', 'active',
    'actively', 'activism', 'activist', 'activity', 'actor', 'actress', 'actual', 'actuality', 'actually', 'actuarial',
    'actuary', 'actuate', 'actuation', 'acuity', 'acumen', 'acute', 'acutely', 'ad', 'adage', 'adamant',
    'adamantly', 'adapt', 'adaptability', 'adaptable', 'adaptation', 'adapter', 'adaptor', 'add', 'addend', 'addenda',
    'addendum', 'adder', 'addict', 'addiction', 'addictive', 'adding', 'addition', 'additional', 'additionally', 'additive',
    'addle', 'address', 'addressee', 'adduce', 'adenoidal', 'adenoids', 'adept', 'adeptly', 'adequacy', 'adequate',
    'adequately', 'adhere', 'adherence', 'adherent', 'adhesion', 'adhesive', 'adieu', 'adipose', 'adjacent', 'adjectival',
    'adjective', 'adjoin', 'adjourn', 'adjournment', 'adjudge', 'adjudicate', 'adjudication', 'adjudicator', 'adjunct', 'adjure',
    'adjust', 'adjustable', 'adjuster', 'adjustment', 'adjutant', 'adman', 'administer', 'administration', 'administrative', 'administrator',
    'admirable', 'admirably', 'admiral', 'admiration'];
  
  const trie = new Trie();
  
  // Build the Trie
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
      autocompleteDiv.appendChild(suggestionElement);
    }
  }
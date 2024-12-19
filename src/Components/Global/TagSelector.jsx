import React, { useState } from 'react';
import './TagSelector.css'; // Custom styles (see below for CSS)

const TagSelector = ({ tags }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentInput, setCurrentInput] = useState('');

  // Handle adding tags when the user presses 'Enter'
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && currentInput.trim() !== '') {
      const newTag = currentInput.trim();
      if (!selectedTags.includes(newTag)) {
        setSelectedTags([...selectedTags, newTag]);
      }
      setCurrentInput('');
    }
  };

  // Handle removing a tag
  const removeTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  // Handle input change
  const handleInputChange = (event) => {
    setCurrentInput(event.target.value);
  };

  return (
    <div className="tag-selector">
      <h3>Select Tags</h3>

      {/* Tags input field */}
      <div className="input-container">
        <div className="tag-list">
          {selectedTags.map((tag) => (
            <div key={tag} className="tag">
              <span>{tag}</span>
              <button className="remove-tag" onClick={() => removeTag(tag)}>
                &#x2715;
              </button>
            </div>
          ))}
        </div>

        {/* Input box for new tags */}
        <input
          type="text"
          value={currentInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type and press enter to add tags"
        />
      </div>

      {/* Available tags */}
      <div className="available-tags">
        <h4>Available Tags</h4>
        {tags.map((tag) => (
          <button
            key={tag}
            className={`available-tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
            onClick={() => {
              if (!selectedTags.includes(tag)) {
                setSelectedTags([...selectedTags, tag]);
              }
            }}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagSelector;

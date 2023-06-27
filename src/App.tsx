import React, { useState, useEffect } from 'react';
import './App.css';

const App: React.FC = () => {
  const [colorPalette, setColorPalette] = useState<string[]>([]);
  const [designStyle, setDesignStyle] = useState<string>('');
  const [savedThemes, setSavedThemes] = useState<{ name: string; colors: string[]; style: string }[]>([]);
  const [themeName, setThemeName] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredThemes, setFilteredThemes] = useState<{ name: string; colors: string[]; style: string }[]>([]);

  useEffect(() => {
    const savedThemesFromStorage = localStorage.getItem('savedThemes');
    if (savedThemesFromStorage) {
      setSavedThemes(JSON.parse(savedThemesFromStorage));
    }
  }, []);

  useEffect(() => {
    const filtered = savedThemes.filter(theme => theme.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredThemes(filtered);
  }, [searchTerm, savedThemes]);

  const generateColorPalette = () => {
    const colors: string[] = [];
    for (let i = 0; i < 5; i++) {
      colors.push(generateRandomColor());
    }
    setColorPalette(colors);
  };

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const generateDesignStyle = () => {
    const designStyles = [
      'Vintage',
      'Futuristic',
      'Minimalistic',
      'Abstract',
      'Modern',
      'Elegant',
      'Hand-drawn',
      'Geometric',
      'Grunge',
      'Typography-based',
      'Watercolor',
      // Add more design styles here
    ];
    const randomStyle =
      designStyles[Math.floor(Math.random() * designStyles.length)];
    setDesignStyle(randomStyle);
  };

  const saveTheme = () => {
    const newTheme = { name: themeName, colors: colorPalette, style: designStyle };
    const updatedThemes = [...savedThemes, newTheme];
    setSavedThemes(updatedThemes);
    localStorage.setItem('savedThemes', JSON.stringify(updatedThemes));
    setThemeName('');
    console.log('Theme saved!');
  };

  const deleteTheme = (themeIndex: number) => {
    const updatedThemes = savedThemes.filter((_, index) => index !== themeIndex);
    setSavedThemes(updatedThemes);
    localStorage.setItem('savedThemes', JSON.stringify(updatedThemes));
    console.log(`Theme at index ${themeIndex} deleted!`);
  };

  return (
    <div className="App">
      <h1>Random Color Palette Generator</h1>
      <div className="color-palette">
        {colorPalette.map((color, index) => (
          <div
            key={index}
            className="color"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <div className="generate-buttons">
        <button onClick={generateColorPalette}>Generate Color</button>
        <button onClick={generateDesignStyle}>Generate Design</button>
      </div>

      {designStyle && (
        <p>
          Random Design: <strong>{designStyle}</strong>
        </p>
      )}
      <div className="save-theme">
        <input
          type="text"
          placeholder="Theme Name"
          value={themeName}
          onChange={(e) => setThemeName(e.target.value)}
        />
        <button onClick={saveTheme}>Save Theme</button>
      </div>
      <div className="search-themes">
        <h2>Search Themes</h2>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="saved-themes">
        <h2>Saved Themes</h2>
        {filteredThemes.map((theme, index) => (
          <div className="theme-card" key={index}>
            <h3>{theme.name}</h3>
            <div className="color-palette">
              {theme.colors.map((color, index) => (
                <div
                  key={index}
                  className="color"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <p>Design: {theme.style}</p>
            <button onClick={() => deleteTheme(index)}>Delete Theme</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

import logo from './logo.svg';
import { useEffect, useState } from "react";
import './App.css';
import image1b from './Assets/image1b.png';
import image1a from './Assets/image1a.png';

function App() {

  const [names, setnames] = useState(JSON.parse(localStorage.getItem('cricketerNames')) || []);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [visibleImages, setVisibleImages] = useState({ image1: false, image2: false });
  const [currentIndex, setCurrentIndex] = useState(null)


  const saveInput = (e) => {
    setInput(e.target.value);
  }
  const add_new_element = () => {
    if (editIndex >= 0) {
      const updatedList = [...names];
      updatedList[editIndex] = input;
      setnames(updatedList);
      localStorage.setItem('cricketerNames', JSON.stringify(updatedList));
      setEditIndex(-1);
      setInput('');
    }
    else {
      const updatedlist = [...names, input];
      setnames(updatedlist);
      localStorage.setItem('cricketerNames', JSON.stringify(updatedlist));
      setEditIndex(-1)
      setInput('');
    }


  };
 

  useEffect(() => {

    const storedArray = JSON.parse(localStorage.getItem('cricketerNames'));
    if (storedArray) {
      setnames(storedArray);
    }
  }, []);

  const deleteByIndex = (name) => {
    const updatedList = names.filter((n) => n !== name);
    setnames(updatedList);
    localStorage.setItem('cricketerNames', JSON.stringify(updatedList));
  };


  const editByIndex = (index) => {
    setEditIndex(index);
    setInput(names[index]);
  };

  const handleMouseEnter = (imageId) => {
    setVisibleImages({ ...visibleImages, [imageId]: true });
  };

  const handleMouseLeave = (imageId) => {
    setVisibleImages({ ...visibleImages, [imageId]: false });
  };






  const listItems = names.map((name, index) =>
    <li key={index} style={{ fontSize: '20px', color: 'black' }} onMouseEnter={() => { handleMouseEnter('image1'); setCurrentIndex(index) }} onMouseLeave={() => { handleMouseLeave('image1'); setCurrentIndex(null) }}
    >
      <span>{name}</span>
      {visibleImages.image1 && currentIndex === index && (

        <span>
          <img src={image1a} alt='edit' onClick={() => editByIndex(index)} style={{ cursor: 'pointer', marginRight: '20px' }} />
          <img src={image1b} alt='del' onClick={() => deleteByIndex(name)} style={{ cursor: 'pointer', marginRight: '20px' }} />
        </span>
      )}
    </li>
  );




  return (
    <div id="container" >
      <header> <h1>CRICKERS LIST</h1>
        <input type="text" value={input} onChange={saveInput} />
        <button onClick={add_new_element}>{editIndex === -1 ? "add" : "save"}</button>
      </header>
      <body>
        <ol type='1.'>{listItems}</ol>
      </body>
    </div>
  );

}

export default App;

// - rohanvron ©

import React, { useState, useEffect } from "react";
import defaultImg from "./assets/defaultpic.png";
import "./cardMaker.css";
import { FaUser, FaBirthdayCake, FaPhone, FaEnvelope, FaGraduationCap, FaStream, FaInfoCircle } from 'react-icons/fa';
import domtoimage from 'dom-to-image';

function CardMaker() {
// State to store All the information for profile card
  const [name, setName] = useState("");
  const [dob, setDob] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState("");
  const [degree, setDegree] = useState("");
  const [stream, setStream] = useState("");
  const [isCustom, setIsCustom] = useState(false); 
  const [about, setAbout] = useState("");

// State to store both profile and background image
  const [img, setImg] = useState(defaultImg);
  const [bgImg, setBgImg] = useState("");

  // State to store styling of the Card (size, color, etc)
  const [fontSize, setFontSize] = useState(16);
  const [fontColor, setFontColor] = useState("black"); 
  const [iconsColor, setIconsColor] = useState("gray"); 
  const [iconsSize, setIconsSize] = useState(15); 
  const [borderRadius, setBorderRadius] = useState(8);
  const [borderColor, setBorderColor] = useState("black"); 
  const [borderSize, setBorderSize] = useState(1);

// had to add extra code for able to the border radius in real time
  useEffect(() => {
    document.documentElement.style.setProperty('--border-color', borderColor);
    document.documentElement.style.setProperty('--border-radius', `${borderRadius}px`);
    document.documentElement.style.setProperty('--border-size', `${borderSize}px`);
  }, [borderColor, borderRadius, borderSize]); // Update on state changes  


// setter function for all of the above statefull variables
  function nameChange(event) {
    setName(event.target.value);
  }

  /* had to change dob style to dd-mm-yy */
  function dobChange(event) {
    let date = new Date(event.target.value);
    let formattedDate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    setDob(formattedDate);
  }

  function phoneChange(event) {
    setPhone(event.target.value);
  }

  function emailChange(event) {
    setEmail(event.target.value);
  }

  const degreeChange = (event) => {
    const selectedValue = event.target.value;
    setDegree(selectedValue);
    setIsCustom(selectedValue === "Others");
  };

  const streamChange = (event) => {
    const selectedValue = event.target.value;
    setStream(selectedValue);
    setIsCustom(selectedValue === "Custom");
  };

  function aboutChange(event) {
    setAbout(event.target.value);
  }

  /* to display profile img onto the card, if not there should be a defaultpic */
  function handleImageUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImg(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setImg(defaultImg);
    }
  }

 /* for background image of the card */
  function handleBgImageUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBgImg(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      setBgImg("");
    }
  }

  // Function to handle export to PNG image

  function handleExport(type) {
    const card = document.querySelector(".formCardWrapper");
    const scale = 2; // this controls the quality of the image
  
    domtoimage.toBlob(card, {
      width: card.clientWidth * scale,
      height: card.clientHeight * scale,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: 'top left'
      }
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "formCard.png";
      link.click();
  
      window.URL.revokeObjectURL(url);
    })
    .catch(error => {
      console.error('Error exporting image:', error);
    });
  }

// all the html
  
  return(
    // "form contains all the div elements, "formContainer" and "formCardWrapper"
    <> 
<div className="form">

    <div className="formContainer">
        <input value={name} onChange={nameChange} type="name" placeholder="Full Name"></input><br/><br/>

        <label for="date">Date Of Birth: </label>
        <input value={dob} onChange={dobChange} type="date" placeholder="Date Of Birth"></input><br/><br/>

        <input value={phone} onChange={(phoneChange)} placeholder="Phone Number" type="text"></input><br/><br/>

        <input value={email} onChange={emailChange} type="email" placeholder="Email"></input><br/><br/>

        <select value={degree} onChange={degreeChange}>
            <option value="">Select Your Degree</option>
            <option value="Graduated">Graduated.</option>
            <option value="Masters">Masters.</option>
            <option value="Others">Others</option>
        </select><br/><br/>
                {isCustom && ( 
                    <input
                        type="text"
                        value={degree}
                        onChange={(event) => setDegree(event.target.value)}
                    />
                )}

        <select value={stream} onChange={streamChange}>
            <option value="">Select Your Stream</option>
            <option value="Computer Science">Computer Science (CS)</option>
            <option value="Computer Applications">Computer Applications (CA)</option>
            <option value="Information Technology">Information Technology (IT)</option>
            <option value="B.tech">B.tech (CSE)</option>
            <option value="Custom">Custom</option>
        </select><br/><br/>
                {isCustom && ( 
                    <input
                        type="text"
                        value={stream}
                        onChange={(event) => setStream(event.target.value)}
                    />
                )}

      <textarea value={about} onChange={aboutChange} placeholder="About"  rows="2" cols="25"></textarea><br/>

    <p>Add a Profile Picture</p>
      <img src={img} alt="Profile" id="profile" style={{ 
                  width: '75px', height: '75px', 
                  objectFit: 'cover',
                  aspectRatio: '1 / 1',
                  objectPosition: 'center top'
                  }} />
      <input type="file" accept="image/*" onChange={handleImageUpload} />

      <p>Add a Background Image</p>
      <input type="file" accept="image/*" onChange={handleBgImageUpload} />

      <br /><br/>
      <div className="controls">
            <div>
              <label htmlFor="fontSize">Fonts:</label>
              <input type="number" id="fontSize" value={fontSize} onChange={(e) => setFontSize(e.target.value)} min={8} max={32} />
              <input type="color" id="fontColor" value={fontColor} onChange={(e) => setFontColor(e.target.value)} />
            </div>
            <div>
              <label htmlFor="iconsSize">Icons:</label>
              <input type="number" id="iconsSize" value={iconsSize} onChange={(e) => setIconsSize(e.target.value)} min={10} max={32} />
              <input type="color" id="iconsColor" value={iconsColor} onChange={(e) => setIconsColor(e.target.value)} />
            </div>
            <div><br/>
              <label htmlFor="borderSize">Border:</label>
              <input type="number" id="borderSize" value={borderSize} onChange={(e) => setBorderSize(e.target.value)} min={1} max={32} />
              <input type="number" id="borderRadius" value={borderRadius} onChange={(e) => setBorderRadius(e.target.value)} min={0} max={100} />
              <input type="color" id="borderColor" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} />
            </div>
          </div><br/>

        <button onClick={() => handleExport("jpg")}>Export Card</button>
        
    </div>

<div class="formCardWrapper">
    <div className="formCard" style={{ backgroundImage: `url(${bgImg})`}}>
            <div className="img">
                <img src={img} alt="Profile" id="profile" 
                style={{ 
                  width: '200px', height: '200px', 
                  objectFit: 'cover',
                  aspectRatio: '1 / 1',
                  objectPosition: 'center top'
                  }}></img>
            </div>
          <p id="name" style={{ fontSize: `${fontSize}px`, color: fontColor }}>
            <FaUser color={iconsColor} size={iconsSize}/>&nbsp; {name}
          </p>
          <p id="dob" style={{ fontSize: `${fontSize}px`, color: fontColor }}>
            <FaBirthdayCake color={iconsColor} size={iconsSize} />&nbsp; {dob}
          </p>
          <p id="phone" style={{ fontSize: `${fontSize}px`, color: fontColor }}>
            <FaPhone color={iconsColor} size={iconsSize} />&nbsp; {phone}
          </p>
          <p id="email" style={{ fontSize: `${fontSize}px`, color: fontColor }}>
            <FaEnvelope color={iconsColor} size={iconsSize} />&nbsp; {email}
          </p>
          <p id="degree" style={{ fontSize: `${fontSize}px`, color: fontColor }}>
            <FaGraduationCap color={iconsColor} size={iconsSize} />&nbsp; {degree}
          </p>
          <p id="stream" style={{ fontSize: `${fontSize}px`, color: fontColor }}>
            <FaStream color={iconsColor} size={iconsSize} />&nbsp; {stream}
          </p>
          <p id="about" style={{ fontSize: `${fontSize}px`, color: fontColor }}>
            <FaInfoCircle color={iconsColor} size={iconsSize} />&nbsp; {about}
          </p>
    </div>
  </div>
</div>
    </>
)

}

export default CardMaker
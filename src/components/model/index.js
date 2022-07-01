import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, useProgress } from '@react-three/drei';
import Avatar from './components/Avatar'; 
import Bboy from './components/Bboy'; 
import Flair from './components/Flair';
import House from './components/House';
import Jump from './components/Jump'; 
import Silly from './components/Silly'; 
import Swing from './components/Swing';
import Robot from './components/Robot'; 
import Rumba from './components/Rumba'; 
import Twerk from './components/Twerk';
import Twist from './components/Twist'; 
import "./index.css";

const Dropdown = ({ label, value, options, onChange }) => {
   return (
     <label>
       {label}
       <select value={value} onChange={onChange}>
         {options.map((option, key) => (
           <option value={option} key={key}>{option}</option>
         ))}
       </select>
     </label>
   );
 };

const Loader = () => {
   const { progress } = useProgress();
   return (
      <Html 
         center
         style={{
            color: '#FFFFFF',
         }}
      >
         {Math.round(progress * 100) / 100}% Loaded
      </Html>
   );
};

export default function App() {
   const position = [0.025, -0.9, 0];

   const models = {
      None: <Avatar position={position}/>,
      Bboy: <Bboy position={position}/>,
      Flair: <Flair position={position}/>,
      House: <House position={position}/>,
      Jump: <Jump position={position}/>,
      Robot: <Robot position={position}/>,
      Rumba: <Rumba position={position}/>,
      Silly: <Silly position={position}/>,
      Swing: <Swing position={position}/>,
      Twerk: <Twerk position={position}/>,
      Twist: <Twist position={position}/>,
    };

   const options = Object.keys(models).map((key) => key);

   const [value, setValue] = useState('None');

   const handleChange = (event) => {
      setValue(event.target.value);
   };

   return (
      <div>
         <Dropdown
            label="Pick a move! "
            options={options}
            value={value}
            onChange={handleChange}
         />

         <Canvas
            camera={{ position: [2, 0, 12.25], fov: 15 }}
            style={{
               backgroundColor: '#111a21',
               width: '70vw',
               height: '60vh',
            }}
         >
            <ambientLight intensity={1.25} />
            <ambientLight intensity={0.1} />
            <directionalLight intensity={0.4} />
            <Suspense fallback={<Loader />}>
               {models[value]}
            </Suspense>
            <OrbitControls />
         </Canvas>
      </div>
   );
}
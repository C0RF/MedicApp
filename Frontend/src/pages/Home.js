import React, { useState } from "react";
import "./Home.css";
import BoxInfo from "./../components/BoxInfo";


const dataset = [
  {
    className: "Home",
    title: "MedicApp",
    description:
      "Plataforma para diagnóstico y recomendaciones médicas con interfaz de voz",
    img: "https://ajulissa.github.io/medicapp-Frontend/images/home.png",
    link: "/"
  },
  {
    className: "Diagnosis",
    title: "Diagnóstico",
    description:
      "Obtén una lista de posibles enfermedades ingresando los síntomas que presentas mediante texto o voz",
    img: "https://ajulissa.github.io/medicapp-Frontend/images/diagnostico.png",
    link: "/diagnosis"
  },
  {
    className: "Diseases",
    title: "Enfermedades",
    description:
      "Encuentra información sobre diversas enfermedades ingresando su nombre por texto o voz",
    img: "https://ajulissa.github.io/medicapp-Frontend/images/enfermedades.png",
    link: "/diseases"
  },
  {
    className: "FirstAid",
    title: "Primeros Auxilios",
    description: " Obtén recomendaciones en primeros auxilios",
    img: "https://ajulissa.github.io/medicapp-Frontend/images/primauxilios.png",
    link: "/firstAid"
  },
  {
    className: "NearestHospitals",
    title: "Hospitales Cercanos",
    description: "Encuentra rápidamente los hospitales cercanos a tu ubicación actual",
    img: "https://ajulissa.github.io/medicapp-Frontend/images/hospcercanos.png",
    link: "/nearestHospitals"
  },
];

const Home = (props) => {
  const [idxSelected, setIdxSelected] = useState(0);
  const [currentClass, setCurrentClass] = useState(dataset[0].className);
  const [currentTitle, setCurrentTitle] = useState(dataset[0].title);
  const [currentDescription, setCurrentDescription] = useState(dataset[0].description);
  const [currentImage, setCurrentImage] = useState(dataset[0].img);
  const [currentLink, setCurrentLink] = useState(dataset[0].link);

  const setInfo = (idx) => {
    setCurrentTitle(dataset[idx].title);
    setCurrentClass(dataset[idx].className);
    setCurrentDescription(dataset[idx].description);
    setCurrentImage(dataset[idx].img);
    setCurrentLink(dataset[idx].link)
    setIdxSelected(idx)
  };

  const Slider = (props) => {
    const { items } = props;
    return items.map((item, idx) => (
      <div
        key={idx}
        className={idxSelected !== idx ? "" : "active"}
        onClick={() => setInfo(idx)}
      >
        <img alt="" src={item.img} />
      </div>
    ));
  };

  return (
    <div className="homepage">
      <div className="principal">
        <BoxInfo
          classname={currentClass}
          title={currentTitle}
          description={currentDescription}
          image={currentImage}
          link={currentLink}
        />
      </div>

      <div className="derecha">
        <Slider items={dataset} />
      </div>
    </div>
  );
};

export default Home;

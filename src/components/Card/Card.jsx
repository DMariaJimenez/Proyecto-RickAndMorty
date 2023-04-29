import style from "./Card.module.css"

export default function Card({id, name, status, species, gender, origin, image, onClose}) {
   return (
      <div className = {style.container}>
         <button className={style.closeButton} onClick={() => onClose(id)}>X</button>
         <h2 className= {style.datos}>{name}</h2>
         <h2 className= {style.datos}>{status}</h2>
         <h2 className= {style.datos}>{species}</h2>
         <h2 className= {style.datos}>{gender}</h2>
         <h2 className= {style.datos}>{origin}</h2>
         <img className={style.image} src={image} alt='' />
      </div>
   );
}
                                 